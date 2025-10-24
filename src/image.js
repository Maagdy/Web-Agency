// image.js
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Use your actual Supabase URL and SERVICE ROLE KEY
const supabaseUrl = "https://ssaajxvaflgbejsurdeo.supabase.co";
// Use SERVICE ROLE KEY for admin operations (bypasses RLS)
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYWFqeHZhZmxnYmVqc3VyZGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzk3MjAwOCwiZXhwIjoyMDczNTQ4MDA4fQ.GoDfWxG1pibwdnsucE1K__NJ-r9lcplYVA_zhpnDVbE";

// Admin client (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Your images to upload
const localImages = {
  Product1: "./common/assets/images/Product1.jpg",
  Product2: "./common/assets/images/Product2.jpg",
  Product3: "./common/assets/images/Product3.jpg",
  Product4: "./common/assets/images/Product4.jpg",
  Product5: "./common/assets/images/Product5.jpg",
  Product6: "./common/assets/images/Product6.jpg",
  Product7: "./common/assets/images/Product7.jpg",
  Product8: "./common/assets/images/Product8.jpg",
  Product9: "./common/assets/images/Product9.jpg",
  Product10: "./common/assets/images/Product10.jpg",
};

async function ensureBucketExists(bucketName) {
  // Try to create the bucket
  const { error } = await supabase.storage.createBucket(bucketName, {
    public: true, // makes files accessible via public URL
  });

  if (error) {
    if (error.message.includes("already exists")) {
      console.log(`ℹ️ Bucket "${bucketName}" already exists.`);
    } else {
      console.error("❌ Error creating bucket:", error.message);
    }
  } else {
    console.log(`✅ Bucket "${bucketName}" created successfully.`);
  }
}

async function uploadImages() {
  const bucketName = "shop-images";
  await ensureBucketExists(bucketName);

  console.log(`\n🚀 Starting image upload to bucket "${bucketName}"...\n`);

  for (const [key, filePath] of Object.entries(localImages)) {
    try {
      if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `${key}${path.extname(filePath)}`;

      const ext = path.extname(filePath).toLowerCase();
      const contentType =
        ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

      console.log(`📤 Uploading ${fileName}...`);

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error(`❌ Error uploading ${fileName}:`, error);
      } else {
        console.log(`✅ Successfully uploaded ${fileName}`);

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        console.log(`🔗 Public URL: ${publicUrl}\n`);
      }
    } catch (fileError) {
      console.error(`❌ Error processing ${filePath}:`, fileError.message);
    }
  }

  console.log("🎉 Upload process completed!");
}

uploadImages();
