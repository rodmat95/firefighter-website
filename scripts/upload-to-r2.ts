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
        
        // EXCEPTION: floorplan.png should stay PNG (transparency)
        if (item.toLowerCase() === "floorplan.png") {
            // Treat as copy, not convert.
            // Actually, better to just SKIP this block and let the "else" handle it?
            // But the "else" is inside the loop structure based on extension.
            // Let's just create a special case at the top of the loop or modify the condition.
        }

        if (item.toLowerCase() === "floorplan.png") {
            // Special handling: Copy as PNG, do not convert
             const destPath = path.join(destDir, item);
             let shouldCopy = true;
             if (fs.existsSync(destPath)) {
                const destStat = fs.statSync(destPath);
                if (destStat.mtimeMs > stat.mtimeMs) shouldCopy = false;
             }
             if (shouldCopy) {
                 console.log(`cP Copying (Preserving PNG): ${srcPath} -> ${destPath}`);
                 fs.copyFileSync(srcPath, destPath);
             }
             continue; // Skip the rest of the loop for this item
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
// --- HELPER: Video Processing ---
async function processVideos() {
  const videoSourceDir = "public/hero-background-src";
  const videoDestDir = "public/hero-background";
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

  if (!fs.existsSync(videoSourceDir)) {
    console.log("ℹ️ No video source directory found. Skipping video processing.");
    return;
  }

  if (!fs.existsSync(videoDestDir)) {
    fs.mkdirSync(videoDestDir, { recursive: true });
  }

  const items = fs.readdirSync(videoSourceDir);
  const videoFiles = items.filter(f => f.toLowerCase().endsWith(".mp4") || f.toLowerCase().endsWith(".mov"));

  for (const file of videoFiles) {
    const srcPath = path.join(videoSourceDir, file);
    const basename = path.basename(file, path.extname(file));
    
    // Outputs
    const webmPath = path.join(videoDestDir, `${basename}.webm`);
    const mp4Path = path.join(videoDestDir, `${basename}.mp4`); // Optimized MP4

    // 1. WebM (VP9)
    // Target ~2M bitrate for high quality but reasonable size.
    // -an to remove audio (as requested).
    if (!fs.existsSync(webmPath)) {
      console.log(`🎥 Converting to WebM: ${srcPath} -> ${webmPath}`);
      try {
        // -c:v libvpx-vp9 -b:v 2M -row-mt 1 -an (No Audio)
        execSync(`"${ffmpegPath}" -i "${srcPath}" -c:v libvpx-vp9 -b:v 2M -row-mt 1 -an -y "${webmPath}"`, { stdio: 'inherit' });
      } catch (e) {
        console.error("❌ WebM conversion failed:", e);
      }
    } else {
      console.log(`⏭️  WebM already exists: ${webmPath}`);
    }

    // 2. Optimized MP4 (H.264)
    // -crf 23 is standard balanced quality.
    // -an to remove audio.
    if (!fs.existsSync(mp4Path)) {
       console.log(`🎥 Optimizing MP4: ${srcPath} -> ${mp4Path}`);
       try {
         // -c:v libx264 -crf 23 -preset medium -an -movflags +faststart
         execSync(`"${ffmpegPath}" -i "${srcPath}" -c:v libx264 -crf 23 -preset medium -an -movflags +faststart -y "${mp4Path}"`, { stdio: 'inherit' });
       } catch (e) {
         console.error("❌ MP4 optimization failed:", e);
       }
    } else {
        console.log(`⏭️  Optimized MP4 already exists: ${mp4Path}`);
    }
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

  // 1.5 Process Videos
  await processVideos();

  console.log("✅ Optimization/Sync Complete. Starting Upload...");

  // 2. Upload from tour (the optimized folder) + Hero Background
  // We want to upload everything in public/tour to the R2 bucket under the 'tour/' prefix.
  // We assume 'public/tour' maps to 'tour/' in R2.
  
  // Also collect public/hero-background
  const heroDir = "public/hero-background";

  const existingR2Files = await getR2Files(""); // Get ALL files to avoid dupes global or scoped? 
  // Wait, getR2Files("tour/") limits to tour/. 
  // Let's get "tour/" and "hero-background/" separately or just list all if bucket isn't huge.
  // Getting all might be safer. Or just check existence per file (slow).
  // Let's fetch "tour/" and "hero-background/" separately.
  
  const r2TourFiles = await getR2Files("tour/");
  const r2HeroFiles = await getR2Files("hero-background/");
  const existingR2Keys = new Set([...r2TourFiles, ...r2HeroFiles]);
  
  const filesToUpload: string[] = [];

  function collectFiles(dir: string) {
    if (!fs.existsSync(dir)) return;
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
    collectFiles(DEST_DIR_ROOT); // public/tour
  }
  
  if (fs.existsSync(heroDir)) {
      collectFiles(heroDir); // public/hero-background
  }

  const aboutDir = "public/about";
  if (fs.existsSync(aboutDir)) {
      collectFiles(aboutDir); // public/about
  }

  const protagonistsDir = "public/protagonists";
  if (fs.existsSync(protagonistsDir)) {
      collectFiles(protagonistsDir); // public/protagonists
  }

  if (filesToUpload.length === 0) {
    console.log("⚠️ No files to upload.");
    return;
  }

  const uploadQueue = [];
  
  for (const filePath of filesToUpload) {
    // Key construction: remove 'public/' prefix
    // If filePath is 'public\tour\RUTA\01.jpg', we want 'tour/RUTA/01.jpg'.
    const relativeToPublic = path.relative("public", filePath).replace(/\\/g, "/"); // Normalize slashes
    
    // Check if exists
    if (existingR2Keys.has(relativeToPublic)) {
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
