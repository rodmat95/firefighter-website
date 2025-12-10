import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import dotenv from "dotenv";
import { execSync } from "child_process";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const SOURCE_DIR_ROOT = "public/tour-src"; // Source of truth (Originals)
const DEST_DIR_ROOT = "public/tour";       // Destination for optimized files (Upload target)

// Upload configuration
const MAX_CONCURRENT_UPLOADS = 20;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME) {
  console.error("❌ Error: Missing R2 environment variables.");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// --- HELPER: Sync and Convert ---
function syncAndConvert(sourceDir: string, destDir: string) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const srcPath = path.join(sourceDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      syncAndConvert(srcPath, path.join(destDir, item));
    } else {
      // It's a file
      if (item.toLowerCase().endsWith(".png")) {
        // Convert to JPG
        const jpgName = item.replace(/\.png$/i, ".jpg");
        const destPath = path.join(destDir, jpgName);

        let shouldConvert = true;
        if (fs.existsSync(destPath)) {
          const destStat = fs.statSync(destPath);
          if (destStat.mtimeMs > stat.mtimeMs) {
            shouldConvert = false; // Dest is newer
          }
        }

        if (shouldConvert) {
          console.log(`🖼️ Converting: ${srcPath} -> ${destPath}`);
          try {
            // Use ImageMagick to convert
            // Note: We use the source file as input and dest path as output
            execSync(`magick "${srcPath}" -quality 85 -resize "4096x2048>" "${destPath}"`, { stdio: 'inherit' });
          } catch (e) {
            console.error(`❌ Failed to convert ${srcPath}:`, e);
          }
        }
      } else {
        // Copy other files (e.g. floorplan.jpg, json)
        const destPath = path.join(destDir, item);
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const destStat = fs.statSync(destPath);
          if (destStat.mtimeMs > stat.mtimeMs) {
            shouldCopy = false; // Dest is newer
          }
        }

        if (shouldCopy) {
          console.log(`cP Copying: ${srcPath} -> ${destPath}`);
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }
}

// --- HELPER: Upload Logic ---
async function getR2Files(folderPrefix: string): Promise<Set<string>> {
  const existingFiles = new Set<string>();
  let isTruncated = true;
  let continuationToken: string | undefined;

  console.log("🔍 Checking existing files in R2...");

  while (isTruncated) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: folderPrefix, // Limit to 'tour/' if needed, or root
        ContinuationToken: continuationToken,
      });

      const response = await s3.send(command);
      response.Contents?.forEach((file) => {
        if (file.Key) existingFiles.add(file.Key);
      });

      isTruncated = response.IsTruncated ?? false;
      continuationToken = response.NextContinuationToken;
    } catch (error) {
      console.error("❌ Error listing R2 files:", error);
      process.exit(1);
    }
  }

  console.log(`✅ Found ${existingFiles.size} existing files in R2.`);
  return existingFiles;
}

async function uploadFile(filePath: string, fileKey: string) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: contentType,
        // CacheControl: "public, max-age=31536000", // Optional: Add caching headers
      })
    );

    console.log(`🚀 Uploaded: ${fileKey}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${fileKey}:`, error);
  }
}

// --- MAIN EXECUTION ---
async function main() {
  console.log("🔄 Starting Sync and Optimization Process...");
  
  // 0. Auto-Migration: If tour-src missing but tour exists, assume first run and migrate.
  if (!fs.existsSync(SOURCE_DIR_ROOT) && fs.existsSync(DEST_DIR_ROOT)) {
      console.log(`📦 "Option 1" Setup: Moving original ${DEST_DIR_ROOT} to ${SOURCE_DIR_ROOT}...`);
      try {
          fs.renameSync(DEST_DIR_ROOT, SOURCE_DIR_ROOT);
          console.log("✅ Migration complete.");
      } catch (e) {
          console.error("❌ Migration failed. Check permissions or if files are in use.", e);
          process.exit(1);
      }
  }

  // 1. Sync from tour-src to tour
  if (fs.existsSync(SOURCE_DIR_ROOT)) {
      syncAndConvert(SOURCE_DIR_ROOT, DEST_DIR_ROOT);
  } else {
      console.error(`❌ Source directory ${SOURCE_DIR_ROOT} not found! Please create it and move your originals there.`);
      // Fallback: If neither exists
      process.exit(1);
  }

  console.log("✅ Optimization/Sync Complete. Starting Upload...");

  // 2. Upload from tour (the optimized folder)
  // We want to upload everything in public/tour to the R2 bucket under the 'tour/' prefix.
  // We assume 'public/tour' maps to 'tour/' in R2.

  const existingR2Files = await getR2Files("tour/"); // Check existing files with prefix 'tour/'
  
  const filesToUpload: string[] = [];

  function collectFiles(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
       const fullPath = path.join(dir, item);
       if (fs.statSync(fullPath).isDirectory()) {
         collectFiles(fullPath);
       } else {
         filesToUpload.push(fullPath);
       }
    }
  }

  if (fs.existsSync(DEST_DIR_ROOT)) {
    collectFiles(DEST_DIR_ROOT); // Start collecting from public/tour
  } else {
    console.log("⚠️ Destination directory empty or missing. Nothing to upload.");
    return;
  }

  const uploadQueue = [];
  
  for (const filePath of filesToUpload) {
    // Key construction: remove 'public/' prefix
    // If filePath is 'public\tour\RUTA\01.jpg', we want 'tour/RUTA/01.jpg'.
    const relativeToPublic = path.relative("public", filePath).replace(/\\/g, "/"); // Normalize slashes
    
    // Check if exists
    if (existingR2Files.has(relativeToPublic)) {
       console.log(`⏭️  Skipping (already exists): ${relativeToPublic}`);
       continue;
    }

    uploadQueue.push(() => uploadFile(filePath, relativeToPublic));
  }

  console.log(`📋 Found ${uploadQueue.length} new files to upload.`);

  // Process queue with concurrency
  while (uploadQueue.length > 0) {
    const batch = uploadQueue.splice(0, MAX_CONCURRENT_UPLOADS);
    await Promise.all(batch.map((fn) => fn()));
  }

  console.log("🎉 All Done!");
}

main();
