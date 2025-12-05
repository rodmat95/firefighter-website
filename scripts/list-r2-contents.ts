import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ Missing R2 environment variables");
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

async function listBucketContents() {
  try {
    console.log(`📂 Listing contents of bucket: ${R2_BUCKET_NAME}\n`);
    
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      MaxKeys: 100,
    });
    
    const response = await S3.send(command);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log("⚠️  Bucket is empty!");
      return;
    }
    
    console.log(`Found ${response.Contents.length} objects:\n`);
    response.Contents.forEach((obj) => {
      console.log(`  📄 ${obj.Key} (${(obj.Size! / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    if (response.IsTruncated) {
      console.log("\n⚠️  More objects exist (showing first 100)");
    }
  } catch (error: any) {
    console.error("❌ Error listing bucket:", error.message);
  }
}

listBucketContents();
