import { createClient } from "@supabase/supabase-js";

const products = [
  {
    id: 1,
    sku: "AGY-001",
    title: "Modern Business Website Template",
    brand: "Webify Studio",
    category: "Web Design",
    price: 499,
    rating: 4.8,
    status: 12,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product3.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product6.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product9.jpg",
    ],
    tags: ["responsive", "business", "modern", "HTML5", "SEO-friendly"],
    long_description:
      "A sleek and responsive business website template designed for agencies and startups. Includes modern animations, blog integration, and easy customization with modular components.",
    information: {
      weight: "2.3 MB",
      dimensions: "1920x1080 px",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 2,
    sku: "AGY-002",
    title: "E-commerce UI Kit",
    brand: "CreativeFlow",
    category: "UI-UX Design",
    price: 299,
    rating: 4.6,
    status: 20,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product2.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product2.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product4.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product8.jpg",
    ],
    tags: ["figma", "ui kit", "ecommerce", "modern", "clean"],
    long_description:
      "A complete Figma UI kit for modern online stores. Includes reusable components, dark/light mode, and over 80 prebuilt screens for fast prototyping.",
    information: {
      weight: "35 MB",
      dimensions: "Vector (Scalable)",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 3,
    sku: "AGY-003",
    title: "Startup Launch Pack",
    brand: "NextGen Labs",
    category: "Branding",
    price: 699,
    rating: 4.9,
    status: 8,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product3.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product5.jpg",
    ],
    tags: ["branding", "identity", "marketing", "logo", "launch"],
    long_description:
      "A full branding kit to help startups launch fast. Includes logo design system, typography guide, color palette, and social media templates.",
    information: {
      weight: "28 MB",
      dimensions: "Digital Assets",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 4,
    sku: "AGY-004",
    title: "Premium Web Agency Package",
    brand: "Webify Studio",
    category: "Complete Solutions",
    price: 1499,
    rating: 5.0,
    status: 5,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product4.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product7.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product10.jpg",
    ],
    tags: ["premium", "all-in-one", "agency", "website", "branding"],
    long_description:
      "Our premium agency package includes a fully custom website, branding kit, social media strategy, and 1-year support. Designed for established businesses aiming to grow online.",
    information: {
      weight: "N/A",
      dimensions: "Full digital service",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 5,
    sku: "AGY-005",
    title: "Financial Consulting Pack",
    brand: "GrowthIQ",
    category: "Consulting",
    price: 899,
    rating: 4.7,
    status: 10,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product5.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product6.jpg",
    ],
    tags: ["finance", "strategy", "consulting", "growth"],
    long_description:
      "A complete consulting toolkit for finance professionals. Includes presentation templates, client proposal formats, and ROI analysis dashboards.",
    information: {
      weight: "42 MB",
      dimensions: "Vector & PDF",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 6,
    sku: "AGY-006",
    title: "Creative Portfolio Theme",
    brand: "PixelNova",
    category: "Web Design",
    price: 259,
    rating: 4.5,
    status: 15,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product6.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product9.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product2.jpg",
    ],
    tags: ["portfolio", "creative", "animation", "responsive"],
    long_description:
      "A beautifully animated portfolio theme for creatives, agencies, and photographers. Built with smooth scroll, parallax effects, and dynamic content sections.",
    information: {
      weight: "3.1 MB",
      dimensions: "1920x1080 px",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 7,
    sku: "AGY-007",
    title: "Premium Marketing Bundle",
    brand: "AdSphere",
    category: "Marketing",
    price: 799,
    rating: 4.9,
    status: 9,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product7.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product3.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product8.jpg",
    ],
    tags: ["ads", "seo", "social", "marketing", "growth"],
    long_description:
      "A powerful marketing bundle including SEO templates, ad creatives, social media strategy documents, and performance tracking dashboards.",
    information: {
      weight: "18 MB",
      dimensions: "Digital Docs",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 8,
    sku: "AGY-008",
    title: "Professional Freelancer Toolkit",
    brand: "SoloCraft",
    category: "Freelance Tools",
    price: 349,
    rating: 4.7,
    status: 25,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product8.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product5.jpg",
    ],
    tags: ["freelancer", "toolkit", "proposal", "branding"],
    long_description:
      "A ready-to-use toolkit for freelancers including contract templates, invoice systems, brand guide, and proposal samples.",
    information: {
      weight: "15 MB",
      dimensions: "PDF + DOCX",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 9,
    sku: "AGY-009",
    title: "Corporate Rebrand Pack",
    brand: "DesignCore",
    category: "Branding",
    price: 1099,
    rating: 4.8,
    status: 7,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product9.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product4.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product10.jpg",
    ],
    tags: ["rebrand", "identity", "logo", "corporate"],
    long_description:
      "A corporate rebranding package including visual identity redesign, brand guidelines, typography, and digital asset library.",
    information: {
      weight: "55 MB",
      dimensions: "Vector (Scalable)",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 10,
    sku: "AGY-010",
    title: "Agency Startup Kit",
    brand: "LaunchPad",
    category: "Complete Solutions",
    price: 1299,
    rating: 4.9,
    status: 6,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product10.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product8.jpg",
    ],
    tags: ["startup", "agency", "launch", "branding"],
    long_description:
      "A complete startup kit that provides everything a digital agency needs: website template, branding pack, contract templates, and a ready-to-edit pitch deck.",
    information: {
      weight: "50 MB",
      dimensions: "Full Service Bundle",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 11,
    sku: "AGY-011",
    title: "Finance Dashboard UI Kit",
    brand: "DataVision",
    category: "UI-UX Design",
    price: 399,
    rating: 4.6,
    status: 14,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product1.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product3.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product7.jpg",
    ],
    tags: ["dashboard", "finance", "figma", "analytics"],
    long_description:
      "A professional finance dashboard UI kit with data visualization components, charts, and customizable widgets. Perfect for fintech and analytics apps.",
    information: {
      weight: "40 MB",
      dimensions: "Vector (Scalable)",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
  {
    id: 12,
    sku: "AGY-012",
    title: "Elite Corporate Package",
    brand: "Webify Studio",
    category: "Complete Solutions",
    price: 1599,
    rating: 5.0,
    status: 4,
    img_src:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product2.jpg",
    sub_images: [
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product5.jpg",
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/shop-images/Product9.jpg",
    ],
    tags: ["corporate", "enterprise", "strategy", "branding"],
    long_description:
      "An elite-level digital transformation package combining full branding, enterprise website, strategic marketing plan, and post-launch support.",
    information: {
      weight: "N/A",
      dimensions: "Full digital service",
      productYear: "2025",
      productManual: "Included in the package",
      refundable: "Up to 14 days",
    },
  },
];

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

async function seedProducts() {
  console.log("🚀 Uploading all products individually (no skips)...");

  for (const p of products) {
    // Clean & normalize the product data
    const cleanProduct = {
      sku: p.sku,
      title: p.title,
      brand: p.brand,
      category: p.category,
      price: p.price,
      rating: p.rating ?? 0,
      status: p.status ?? 0,
      img_src: p.img_src || p.imgSrc || "", // handle both keys
      sub_images: p.sub_images || p.subImages || [],
      tags: p.tags || [],
      long_description: p.long_description || p.longDescription || "",
      information: p.information || {},
    };

    // Insert each product one by one
    const { error } = await supabase.from("products").insert(cleanProduct);

    if (error) {
      console.error(`❌ Failed to insert [${p.sku}]:`, error.message);
    } else {
      console.log(`✅ Inserted: ${p.sku}`);
    }
  }

  console.log("🎉 Seeding complete!");
}

seedProducts();
const staticComments = [
  {
    author: "Sarah",
    timestamp: new Date().toISOString(),
    content:
      "Loved this post! The examples really helped me understand better.",
    avatar_url:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar1.png",
    email: "sarah@example.com",
  },

  {
    author: "Michael",
    timestamp: new Date().toISOString(),
    content: "Very insightful. I’ll definitely apply this in my next project.",
    avatar_url:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar2.png",
    email: "michael@example.com",
  },
  {
    author: "Emma",
    timestamp: new Date().toISOString(),
    content:
      "Great read! Looking forward to more articles like this on your blog.",
    avatar_url:
      "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar3.png",
    email: "emma@example.com",
  },
];

// async function uploadBlogPosts() {
//   for (const post of blogPosts) {
//     const { data: insertedPost, error: postError } = await supabase
//       .from("blog_posts")
//       .insert({
//         img_src: post.imgSrc,
//         title: post.title,
//         category: post.category,
//         path: post.path,
//         description: post.description,
//         date: post.date,
//         content: post.content,
//         properties: post.properties,
//       })
//       .select("id")
//       .single();

//     if (postError) {
//       console.error("❌ Blog post insert failed:", postError);
//       continue;
//     }

//     const postId = insertedPost.id;

//     // Add Sarah, Michael, Emma comments for this post
//     const commentsToInsert = staticComments.map((c) => ({
//       post_id: postId,
//       author: c.author,
//       timestamp: c.timestamp,
//       content: c.content,
//       avatar_url: c.avatar_url,
//       email: c.email,
//     }));

//     const { error: commentsError } = await supabase
//       .from("blog_comments")
//       .insert(commentsToInsert);

//     if (commentsError) {
//       console.error("❌ Comments insert failed:", commentsError);
//     } else {
//       console.log(`✅ Inserted 3 comments for "${post.title}"`);
//     }
//   }
// }

// uploadBlogPosts();
