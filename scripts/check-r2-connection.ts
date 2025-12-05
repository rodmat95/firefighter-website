import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

console.log("🔍 Checking R2 Configuration...");
console.log(`Account ID: ${R2_ACCOUNT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(`Access Key: ${R2_ACCESS_KEY_ID ? "✅ Set" : "❌ Missing"}`);
console.log(`Secret Key: ${R2_SECRET_ACCESS_KEY ? "✅ Set" : "❌ Missing"}`);

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error("❌ Missing environment variables. Check .env.local");
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

async function checkConnection() {
  try {
    console.log("\n📡 Attempting to list buckets...");
    const data = await S3.send(new ListBucketsCommand({}));
    console.log("✅ Connection Successful!");
    console.log("Your Buckets:");
    data.Buckets?.forEach((bucket) => {
      console.log(` - ${bucket.Name}`);
    });
  } catch (error: any) {
    console.error("❌ Connection Failed:");
    if (error.Code === "AccessDenied") {
        console.error("⛔ Access Denied. Your API Token likely does not have 'Read' permissions.");
    } else if (error.Code === "InvalidAccessKeyId") {
        console.error("⛔ Invalid Access Key ID. Check your credentials.");
    } else {
        console.error(error);
    }
  }
}

checkConnection();
