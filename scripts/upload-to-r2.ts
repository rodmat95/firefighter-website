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

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOAD_DIR = PUBLIC_DIR; // Upload everything in public

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
      })
    );
    console.log(`✅ Uploaded: ${key}`);
  } catch (error) {
    console.error(`❌ Error uploading ${key}:`, error);
  }
}

async function processDirectory(directory: string) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      // Calculate key relative to public directory
      // e.g., public/tour/01.png -> tour/01.png
      const relativePath = path.relative(PUBLIC_DIR, fullPath);
      // Ensure forward slashes for S3 keys
      const key = relativePath.split(path.sep).join("/");
      
      await uploadFile(fullPath, key);
    }
  }
}

async function main() {
  console.log("🚀 Starting upload to Cloudflare R2...");
  console.log(`📂 Source: ${UPLOAD_DIR}`);
  console.log(`🪣 Bucket: ${R2_BUCKET_NAME}`);

  if (!fs.existsSync(UPLOAD_DIR)) {
    console.error("❌ Upload directory not found!");
    process.exit(1);
  }

  await fetchExistingKeys();
  await processDirectory(UPLOAD_DIR);
  console.log("✨ Upload complete!");
}

main();
