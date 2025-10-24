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
const PRODUCT_IDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const FIRST_NAMES = [
  "Sarah",
  "Mike",
  "Emma",
  "James",
  "Olivia",
  "David",
  "Sophia",
  "Daniel",
  "Isabella",
  "William",
  "Ava",
  "Alexander",
  "Mia",
  "Benjamin",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Henry",
  "Harper",
  "Jack",
];

const LAST_NAMES = [
  "Johnson",
  "Smith",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
];

const COMMENT_TEMPLATES = [
  "This product exceeded my expectations! {detail}",
  "Really happy with this purchase. {detail}",
  "Great quality and {detail}",
  "Excellent product! {detail}",
  "Very satisfied with the {detail}",
  "Good value for money. {detail}",
  "Works perfectly! {detail}",
  "Highly recommend! {detail}",
  "Amazing product, {detail}",
  "Fantastic! {detail}",
];

const DETAILS = [
  "Fast delivery and great packaging.",
  "Exactly as described in the listing.",
  "The quality is outstanding.",
  "Would definitely buy again.",
  "Perfect for my needs.",
  "Great customer service too!",
  "Better than similar products I've tried.",
  "Very durable and well-made.",
  "My family loves it!",
  "Best purchase I've made this year.",
];

const FEMALE_NAMES = [
  "Sarah",
  "Emma",
  "Olivia",
  "Sophia",
  "Isabella",
  "Ava",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
];

const MALE_AVATAR_URLS = [
  "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar2.png",
  "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar3.png",
];

const FEMALE_AVATAR_URL =
  "https://ssaajxvaflgbejsurdeo.supabase.co/storage/v1/object/public/portfolio/commentAvatar1.png";

// Utility functions
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmail(firstName, lastName) {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "email.com"];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomChoice(
    domains
  )}`;
}

function generateAvatarUrl(firstName) {
  if (FEMALE_NAMES.includes(firstName)) {
    return FEMALE_AVATAR_URL;
  } else {
    return randomChoice(MALE_AVATAR_URLS);
  }
}

function generateComment(productId) {
  const firstName = randomChoice(FIRST_NAMES);
  const lastName = randomChoice(LAST_NAMES);
  const author = `${firstName} ${lastName}`;

  // Generate main comment
  const template = randomChoice(COMMENT_TEMPLATES);
  const detail = randomChoice(DETAILS);
  const content = template.replace("{detail}", detail);

  // Random date within the last 60 days
  const daysAgo = randomInt(1, 60);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);

  return {
    product_id: productId,
    parent_comment_id: null,
    author: author,
    email: generateEmail(firstName, lastName),
    avatar_url: generateAvatarUrl(firstName),
    content: content,
    rating: randomInt(8, 10) / 2, // 4.0 - 5.0 stars
    created_at: createdAt.toISOString(),
    user_id: null, // Set to null or provide actual user UUIDs if available
  };
}

// Main upload function
async function uploadComments(productsConfig) {
  console.log("Starting comment upload...\n");

  let totalUploaded = 0;

  for (const config of productsConfig) {
    const { productId, commentCount } = config;

    console.log(`Processing Product ID: ${productId}`);
    console.log(`Generating ${commentCount} comments...`);

    // Generate comments
    const comments = [];
    for (let i = 0; i < commentCount; i++) {
      comments.push(generateComment(productId));
    }

    // Insert comments
    const { data: insertedComments, error } = await supabase
      .from("product_comments")
      .insert(comments)
      .select("id");

    if (error) {
      console.error(
        `Error inserting comments for product ${productId}:`,
        error
      );
      continue;
    }

    console.log(`✓ Inserted ${insertedComments.length} comments`);
    totalUploaded += insertedComments.length;
    console.log("");
  }

  console.log(`\n✓ Upload complete! Total comments uploaded: ${totalUploaded}`);
}

// Configuration for each product
// Customize this array based on your needs
const productsConfig = PRODUCT_IDS.map((id) => ({
  productId: id,
  commentCount: randomInt(5, 15), // Random number of comments per product
}));

// Run the upload
uploadComments(productsConfig)
  .then(() => {
    console.log("Script finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });

// Run the seed function
