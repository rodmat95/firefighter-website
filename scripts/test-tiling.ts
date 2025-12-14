import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Test script to verify Sharp tiling functionality
 * This will process a single panorama image and generate tiles
 */

async function testTiling() {
  const testSourceDir = "public/tour-src";
  const testOutputDir = "public/tour-test";

  // Check if source directory exists
  if (!fs.existsSync(testSourceDir)) {
    console.error(`❌ Source directory not found: ${testSourceDir}`);
    console.log("Please ensure you have panorama images in public/tour-src");
    return;
  }

  // Get first image file for testing
  const files = fs.readdirSync(testSourceDir);
  const imageFiles = files.filter(f => 
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.error("❌ No image files found in source directory");
    return;
  }

  const testImage = imageFiles[0];
  const srcPath = path.join(testSourceDir, testImage);
  const basename = path.basename(testImage, path.extname(testImage));
  const tileDir = path.join(testOutputDir, basename);

  console.log(`\n🧪 Testing Sharp Tiling`);
  console.log(`📁 Source: ${srcPath}`);
  console.log(`📁 Output: ${tileDir}\n`);

  // Create output directory
  if (!fs.existsSync(tileDir)) {
    fs.mkdirSync(tileDir, { recursive: true });
  }

  try {
    console.log("⏳ Processing image...");
    
    const startTime = Date.now();
    
    // Process with Sharp tiling
    await sharp(srcPath)
      .resize(4096, 2048, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .tile({
        size: 512,
        layout: 'google',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(tileDir, 'output.dz'));
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ Tiling completed in ${duration}s`);
    console.log(`📂 Tiles generated in: ${tileDir}`);
    
    // List generated structure
    console.log(`\n📋 Generated structure:`);
    const listDir = (dir: string, indent = 0) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        const prefix = '  '.repeat(indent) + (stats.isDirectory() ? '📁' : '📄');
        console.log(`${prefix} ${item}`);
        if (stats.isDirectory() && indent < 2) {
          listDir(fullPath, indent + 1);
        }
      });
    };
    
    listDir(tileDir);
    
    console.log(`\n✨ Test completed successfully!`);
    console.log(`\nNext steps:`);
    console.log(`1. Review the generated tiles in: ${tileDir}`);
    console.log(`2. If satisfied, run: pnpm tsx scripts/upload-to-r2.ts`);
    
  } catch (error) {
    console.error("❌ Error during tiling:", error);
  }
}

testTiling();
