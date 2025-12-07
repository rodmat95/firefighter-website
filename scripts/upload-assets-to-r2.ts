import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ Missing R2 environment variables. Please check .env.local");
  process.exit(1);
}

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const ASSETS_DIR = path.join(process.cwd(), "assets");
const STATIC_MEDIA_DIR = path.join(ASSETS_DIR, "static-media");
const SVG_COMPONENTS_DIR = path.join(ASSETS_DIR, "svg-components");

// Allowed extensions for static media
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

// Cache existing keys
const existingKeys = new Set<string>();

async function fetchExistingKeys() {
  console.log("🔍 Checking existing files in bucket...");
  let isTruncated = true;
  let continuationToken = undefined;

  while (isTruncated) {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    try {
      const response = await S3.send(command);
      response.Contents?.forEach((obj) => {
        if (obj.Key) existingKeys.add(obj.Key);
      });
      isTruncated = response.IsTruncated || false;
      continuationToken = response.NextContinuationToken;
    } catch (error) {
      console.error("❌ Error listing bucket objects:", error);
      process.exit(1);
    }
  }
  console.log(`✅ Found ${existingKeys.size} existing files.`);
}

async function uploadFile(filePath: string, key: string) {
  if (existingKeys.has(key)) {
    console.log(`⏭️  Skipping (already exists): ${key}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  try {
    await S3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable", // Recommended cache header
      })
    );
    console.log(`✅ Uploaded: ${key}`);
  } catch (error) {
    console.error(`❌ Error uploading ${key}:`, error);
  }
}

async function processDirectory(directory: string) {
  if (!fs.existsSync(directory)) {
      console.warn(`⚠️ Directory not found: ${directory}`);
      return;
  }

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      // Validate file extension
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        console.warn(`⚠️ Skipping disallowed file type: ${file} (${ext})`);
        continue;
      }

      // Calculate key relative to static-media directory
      // e.g., assets/static-media/images/logo.png -> images/logo.png
      const relativePath = path.relative(STATIC_MEDIA_DIR, fullPath);
      // Ensure forward slashes for S3 keys
      const key = relativePath.split(path.sep).join("/");
      
      await uploadFile(fullPath, key);
    }
  }
}

async function main() {
  console.log("🚀 Starting STRICT upload to Cloudflare R2...");
  console.log(`📂 Static Media Source: ${STATIC_MEDIA_DIR}`);
  console.log(`🚫 SVG Components Source (IGNORED): ${SVG_COMPONENTS_DIR}`);
  console.log(`🪣 Bucket: ${R2_BUCKET_NAME}`);

  // Ensure directories exist
  if (!fs.existsSync(STATIC_MEDIA_DIR)) {
    console.error(`❌ Static media directory not found: ${STATIC_MEDIA_DIR}`);
    console.log("Please create 'assets/static-media' and place your static assets there.");
    process.exit(1);
  }

  // Warn if user tries to upload from svg-components (just a check, the script won't read it)
  if (fs.existsSync(SVG_COMPONENTS_DIR)) {
      const svgFiles = fs.readdirSync(SVG_COMPONENTS_DIR).filter(f => f.endsWith('.svg'));
      if (svgFiles.length > 0) {
          console.log(`ℹ️  Note: ${svgFiles.length} SVG components found in 'assets/svg-components'. These will NOT be uploaded.`);
      }
  }

  await fetchExistingKeys();
  await processDirectory(STATIC_MEDIA_DIR);
  console.log("✨ Upload complete!");
}

main();
