import React from "react";
import {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  person1,
  person2,
  person3,
  person4,
  person5,
  person6,
} from "../../common/assets/images";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type {
  MemberCardProps,
  PricingCardProps,
  ProjectCardProps,
  ServiceCardProps,
} from "../../components/types/types";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SearchIcon from "@mui/icons-material/Search";

export const serviceCardArr: ServiceCardProps[] = [
  { imgSrc: icon1, title: "App Design" },
  { imgSrc: icon2, title: "Web Design" },
  { imgSrc: icon3, title: "SEO & Social" },
];

export const staticServiceCardArr: ServiceCardProps[] = [
  {
    imgSrc: icon4,
    description: "best app development",
    title: "Ios & Android",
  },
  {
    imgSrc: icon5,
    description: "you have a pro team",
    title: "Pro & Standard",
  },
];

export const memberCardArr: MemberCardProps[] = [
  {
    name: "Mike King Man",
    role: "Founder & CEO",
    imgSrc: person1,
    socialLinks: [
      {
        platform: "facebook",
        icon: FacebookIcon,
        hoverClass: "hover:bg-[#1877F3]",
        url: "https://facebook.com",
      },
      {
        platform: "X",
        icon: XIcon,
        hoverClass: "hover:bg-[#000000]",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    name: "Nili King Man",
    role: "Co-Founder & CTO",
    imgSrc: person2,
    socialLinks: [
      {
        platform: "X",
        icon: XIcon,
        hoverClass: "hover:bg-[#000000]",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    name: "Sara Smith",
    role: "Lead Designer",
    imgSrc: person3,
    socialLinks: [
      {
        platform: "facebook",
        icon: FacebookIcon,
        hoverClass: "hover:bg-[#1877F3]",
        url: "https://facebook.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    name: "John Doe",
    role: "Marketing Head",
    imgSrc: person4,
    socialLinks: [
      {
        platform: "facebook",
        icon: FacebookIcon,
        hoverClass: "hover:bg-[#1877F3]",
        url: "https://facebook.com",
      },
      {
        platform: "X",
        icon: XIcon,
        hoverClass: "hover:bg-[#000000]",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    name: "Emma Wilson",
    role: "Senior Developer",
    imgSrc: person5,
    socialLinks: [
      {
        platform: "X",
        icon: XIcon,
        hoverClass: "hover:bg-[#000000]",
        url: "https://twitter.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
  {
    name: "David Lee",
    role: "Project Manager",
    imgSrc: person6,
    socialLinks: [
      {
        platform: "facebook",
        icon: FacebookIcon,
        hoverClass: "hover:bg-[#1877F3]",
        url: "https://facebook.com",
      },
      {
        platform: "linkedin",
        icon: LinkedInIcon,
        hoverClass: "hover:bg-[#0A66C2]",
        url: "https://linkedin.com",
      },
    ],
  },
];

export const pricingCardArr: PricingCardProps[] = [
  {
    planName: "Standard",
    price: "19.99",
    duration: "per month",
    popular: false,
  },
  {
    planName: "Premium",
    price: "29.99",
    duration: "per month",
    popular: true,
  },
  {
    planName: "Pro",
    price: "49.99",
    duration: "per Year",
    popular: false,
  },
];

export const portfolioProjectsArr: ProjectCardProps[] = [
  {
    id: 1,
    title: "Architecture Website",
    category: "Business & Corporate",
    path: "architecture-website",
  },
  {
    id: 2,
    title: "Lawyer Website",
    category: "Business & Corporate",
    path: "lawyer-website",
  },
  {
    id: 3,

    title: "Minimal Photography",
    category: "Creative & Portfolio",
    path: "minimal-photography",
  },
  {
    id: 4,

    title: "Financial Website",
    category: "Business & Corporate",
    path: "financial-website",
  },
  {
    id: 5,

    title: "Agency Website",
    category: "Creative & Portfolio",
    path: "agency-website",
  },
  {
    id: 6,

    title: "Beauty Salon",
    category: "Health & Lifestyle",
    path: "beauty-salon",
  },
  {
    id: 7,

    title: "Business Template",
    category: "Business & Corporate",
    path: "business-template",
  },
  {
    id: 8,

    title: "Interior Design",
    category: "Health & Lifestyle",
    path: "interior-design",
  },
];

export const blogPostsArr = [
  {
    id: 8,
    title: "Why TypeScript is Taking Over JavaScript Projects",
    category: "Tech",
    path: "why-typescript-is-taking-over-javascript-projects",
  },
  {
    id: 9,
    title: "The Psychology Behind Great Design",
    category: "Design",
    path: "the-psychology-behind-great-design",
  },
  {
    id: 10,
    title: "Building a Sustainable Business in 2024",
    category: "Business",
    path: "building-a-sustainable-business-in-2024",
  },
  {
    id: 11,
    title: "Content Marketing That Actually Converts",
    category: "Marketing",
    path: "content-marketing-that-actually-converts",
  },
  {
    id: 12,
    title: "Mastering React Performance Optimization",
    category: "Development",
    path: "mastering-react-performance-optimization",
  },
];

export const cardIconArray = [
  {
    icon: React.createElement(FavoriteBorderIcon, {
      fontSize: "small",
      className: "text-white",
    }),
    title: "Add To Wishlist",
  },
  {
    icon: React.createElement(ShuffleIcon, {
      fontSize: "small",
      className: "text-white",
    }),
    title: "Compare",
  },
  {
    icon: React.createElement(SearchIcon, {
      fontSize: "small",
      className: "text-white",
    }),
    title: "Quick View",
  },
];

export const products = [
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
