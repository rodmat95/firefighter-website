import { S3Client, GetBucketCorsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

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

async function checkCors() {
  console.log("🔍 Checking CORS for bucket:", BUCKET_NAME);

  try {
    const data = await s3.send(new GetBucketCorsCommand({ Bucket: BUCKET_NAME }));
    console.log("✅ Current CORS Configuration:", JSON.stringify(data.CORSRules, null, 2));
  } catch (err) {
    console.error("❌ Failed to get CORS (or no CORS set):", err);
  }
}

checkCors();
