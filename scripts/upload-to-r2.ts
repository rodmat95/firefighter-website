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

// Configuration Interface
interface SyncConfig {
  source: string;
  dest: string;
  r2Prefix: string;
  resize?: string; // ImageMagick geometry (e.g., "4096x2048>")
  quality?: number;
  format?: "jpg" | "webp" | "keep";
  preserve?: string[]; // Filenames to strictly preserve/copy
}

// DEFINING THE PIPELINES
const SYNC_CONFIGS: SyncConfig[] = [
  {
    source: "public/tour-src",
    dest: "public/tour",
    r2Prefix: "tour",
    resize: "4096x2048>",
    quality: 85,
    format: "jpg",
    preserve: ["floorplan.png"],
  },
  {
    source: "public/members",
    dest: "public/members-opt", // Optimized versions go here
    r2Prefix: "members",
    resize: undefined, // Respect original resolution
    quality: 80,
    format: "webp", // Convert to WebP for better compression + transparency support
  },
  {
    source: "public/protagonists",
    dest: "public/protagonists-opt",
    r2Prefix: "protagonists",
    resize: undefined, // Respect original resolution
    quality: 80,
    format: "webp",
  },
  {
    source: "public/about",
    dest: "public/about", // No separate optimization folder for now (in-place or just upload)
    r2Prefix: "about",
    // processing same dir implies just uploading, unless we implement in-place opt.
    // implementing specific logic to just upload if src == dest?
    // actually, simpler to just map it for upload and skip processing if we don't want to optimize.
    format: "keep",
  },
  {
    source: "public/hero-background",
    dest: "public/hero-background",
    r2Prefix: "hero-background",
    format: "keep",
  }
];

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
function processDirectory(config: SyncConfig) {
  const { source, dest, format, resize, quality = 85, preserve = [] } = config;

  if (!fs.existsSync(source)) {
    // console.log(`ℹ️ Source directory ${source} does not exist. Skipping.`);
    return;
  }

  // If source and dest are same, we assume we just want to upload, 
  // or we'd need a temp folder for in-place optimization. 
  // For now, if same, we skip processing to avoid loops/data loss unless we're sure.
  const isSameDir = path.resolve(source) === path.resolve(dest);

  if (!isSameDir) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(source);

    for (const item of items) {
        const srcPath = path.join(source, item);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            // Recursive? Yes, but need to map subdirs
            processDirectory({
                ...config,
                source: srcPath,
                dest: path.join(dest, item),
            });
            continue;
        }

        // It's a file
        const ext = path.extname(item).toLowerCase();
        const isImage = [".png", ".jpg", ".jpeg", ".webp"].includes(ext);

        // Decide output filename
        let destFilename = item;
        let targetFormat = format;

        if (format === "keep") {
            // keep extension
        } else if (format === "jpg" && isImage && ext !== ".jpg") {
             destFilename = item.replace(/\.[^/.]+$/, ".jpg");
        } else if (format === "webp" && isImage && ext !== ".webp") {
             destFilename = item.replace(/\.[^/.]+$/, ".webp");
        } 
        // Add other format conversions if needed

        const destPath = path.join(dest, destFilename);

        // Check if should process
        let shouldProcess = true;
        if (fs.existsSync(destPath)) {
            const destStat = fs.statSync(destPath);
            if (destStat.mtimeMs > stat.mtimeMs) {
                shouldProcess = false;
            }
        }

        if (shouldProcess) {
            // Check preservation list
            if (preserve.includes(item)) {
                console.log(`cP Copying (Preserved): ${srcPath} -> ${destPath}`);
                fs.copyFileSync(srcPath, destPath);
                continue;
            }

            if (isImage && !isSameDir) {
                 console.log(`🖼️ Processing: ${srcPath} -> ${destPath}`);
                 try {
                    let cmd = `magick "${srcPath}" -quality ${quality}`;
                    if (resize) {
                        cmd += ` -resize "${resize}"`;
                    }
                    cmd += ` "${destPath}"`;
                    execSync(cmd, { stdio: 'inherit' });
                 } catch (e) {
                     console.error(`❌ Failed to process ${srcPath}`, e);
                     // Fallback copy
                     fs.copyFileSync(srcPath, destPath);
                 }
            } else {
                // Just copy non-images or if same dir
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

  console.log(`🔍 Checking existing files in R2 (${folderPrefix || 'source'})...`);

  while (isTruncated) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: folderPrefix,
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
        // CacheControl: "public, max-age=31536000",
      })
    );

    console.log(`🚀 Uploaded: ${fileKey}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${fileKey}:`, error);
  }
}

// --- HELPERS: Video ---
async function processVideos() {
  const videoSourceDir = "public/hero-background-src";
  const videoDestDir = "public/hero-background";
  // Attempt to use ffmpeg-installer, fallback to system ffmpeg
  let ffmpegPath = "ffmpeg"; 
  try {
      ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  } catch (e) {}

  if (!fs.existsSync(videoSourceDir)) {
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
      const webmPath = path.join(videoDestDir, `${basename}.webm`);
      const mp4Path = path.join(videoDestDir, `${basename}.mp4`);

      if (!fs.existsSync(webmPath)) {
          console.log(`🎥 Converting to WebM: ${srcPath}`);
          try {
              execSync(`"${ffmpegPath}" -i "${srcPath}" -c:v libvpx-vp9 -b:v 2M -row-mt 1 -an -y "${webmPath}"`, { stdio: 'inherit' });
          } catch (e) { console.error("WebM fail", e); }
      }
      
      if (!fs.existsSync(mp4Path)) {
          console.log(`🎥 Optimizing MP4: ${srcPath}`);
          try {
              execSync(`"${ffmpegPath}" -i "${srcPath}" -c:v libx264 -crf 23 -preset medium -an -movflags +faststart -y "${mp4Path}"`, { stdio: 'inherit' });
          } catch (e) { console.error("MP4 fail", e); }
      }
  }
}

// --- MAIN ---
async function main() {
  console.log("🔄 Starting Sync and Optimization Process...");

  // 1. Process all configurations
  for (const config of SYNC_CONFIGS) {
      processDirectory(config);
  }

  // 2. Process Videos
  await processVideos();

  // 3. Upload Phase
  console.log("✅ Optimization Complete. Preparing Configured Uploads...");

  const filesToUpload: { path: string, key: string }[] = [];
  
  // Collect files based on configs
  for (const config of SYNC_CONFIGS) {
      const { dest, r2Prefix } = config;
      
      if (!fs.existsSync(dest)) continue;

      const collectRecursively = (currentDir: string, rootDir: string, prefix: string) => {
          const items = fs.readdirSync(currentDir);
          for (const item of items) {
              const fullPath = path.join(currentDir, item);
              if (fs.statSync(fullPath).isDirectory()) {
                  collectRecursively(fullPath, rootDir, prefix);
              } else {
                  // Calculate relative path from the root dest dir
                  // e.g. dest="public/members-opt", prefix="members"
                  // file="public/members-opt/foo.png" -> rel="foo.png"
                  // key="members/foo.png"
                  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
                  const key = path.join(prefix, relPath).replace(/\\/g, "/");
                  filesToUpload.push({ path: fullPath, key });
              }
          }
      };

      collectRecursively(dest, dest, r2Prefix);
  }

  if (filesToUpload.length === 0) {
      console.log("⚠️ No files to upload.");
      return;
  }

  // Check what already exists in R2
  // We can fetch all or just check aggressively.
  // Given we have prefixes, we can fetch per prefix.
  const allPrefixes = [...new Set(SYNC_CONFIGS.map(c => c.r2Prefix))];
  const existingKeys = new Set<string>();
  
  for (const prefix of allPrefixes) {
      const keys = await getR2Files(prefix + "/"); // suffix with / to be safe? ListObjects uses prefix matching
      keys.forEach(k => existingKeys.add(k));
  }

  const uploadQueue = [];
  
  for (const file of filesToUpload) {
      if (existingKeys.has(file.key)) {
          // console.log(`⏭️  Skipping: ${file.key}`);
          continue;
      }
      uploadQueue.push(() => uploadFile(file.path, file.key));
  }

  console.log(`📋 Found ${uploadQueue.length} new files to upload.`);

  while (uploadQueue.length > 0) {
      const batch = uploadQueue.splice(0, MAX_CONCURRENT_UPLOADS);
      await Promise.all(batch.map(fn => fn()));
  }

  console.log("🎉 All Done!");
}

main();
