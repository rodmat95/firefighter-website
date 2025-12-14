
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const REGION = "auto";
const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

if (!BUCKET_NAME || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error("❌ Missing environment variables (R2_BUCKET_NAME, credentials).");
    process.exit(1);
}

const s3 = new S3Client({
    region: REGION,
    endpoint: ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

async function deletePrefix(prefix: string) {
    if (!prefix) {
        console.error("❌ Please provide a prefix to delete (e.g., 'tour-tiles/').");
        process.exit(1);
    }
    
    if (!prefix.endsWith('/')) {
        console.warn(`⚠️ Warning: Prefix '${prefix}' does not end with '/'. It might match partial filenames.`);
    }

    console.log(`🗑️  Starting deletion of objects with prefix: "${prefix}" in bucket "${BUCKET_NAME}"`);

    let continuationToken: string | undefined = undefined;
    let totalDeleted = 0;

    do {
        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: prefix,
            ContinuationToken: continuationToken
        });

        const listRes = await s3.send(listCmd);
        
        if (!listRes.Contents || listRes.Contents.length === 0) {
            if (totalDeleted === 0) console.log("ℹ️  No objects found to delete.");
            break;
        }

        const objectsToDelete = listRes.Contents.map(obj => ({ Key: obj.Key }));
        
        if (objectsToDelete.length > 0) {
            const deleteCmd = new DeleteObjectsCommand({
                Bucket: BUCKET_NAME,
                Delete: { Objects: objectsToDelete }
            });

            await s3.send(deleteCmd);
            totalDeleted += objectsToDelete.length;
            console.log(`🔥 Deleted batch of ${objectsToDelete.length} files...`);
        }

        continuationToken = listRes.NextContinuationToken;

    } while (continuationToken);

    console.log(`✅ Cleanup complete. Total deleted: ${totalDeleted}`);
}

// Get prefix from command line arg
const targetPrefix = process.argv[2];
deletePrefix(targetPrefix);
