export interface ProjectComment {
  id: number;
  project_id: number;
  author: string;
  timestamp: string;
  content: string;
  avatar_url?: string;
  created_at: string;
  parent_comment_id?: number | null;
  user_id: string;
}

export interface ProjectProperties {
  client: string;
  createdBy: string;
  completed: string;
  skills: string[];
  websiteUrl: string;
  keywords: string[];
}

export interface UseRelatedProjectsOptions {
  category: string;
  excludeId?: number;
  limit?: number;
}

export interface Project {
  id: number;
  img_src: string;
  title: string;
  category: string;
  path: string;
  properties: ProjectProperties;
  created_at: string;
}

export interface Category {
  name: string;
  projectCount: number;
}

export interface PortfolioCategoryGroup {
  name: string;
  slug: string;
  projects: Project[];
}

export interface BlogCategoryGroup {
  name: string;
  slug: string;
  posts: BlogPost[];
}

export interface BlogPost {
  slug: string;
  id: number;
  img_src: string;
  title: string;
  category: string;
  path: string;
  description: string;
  content: string;
  date: string | null;
  properties: {
    author: string;
    keywords: string[];
  };
  created_at: string;
  user_id: string | null;
}

export interface BlogCategory {
  category: string;
}

export interface PostComment {
  id: number;
  project_id: number;
  author: string;
  timestamp: string;
  content: string;
  avatar_url?: string;
  created_at: string;
  parent_comment_id?: number | null;
  user_id: string;
}

export interface ProductContent {
  title: string;
  text: string;
}

export interface ProductInformations {
  weight: string;
  dimensions: string;
  productManual: string;
  productYear: string | number;
  refundable: string;
}

export interface Product {
  id: number;
  sku: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  status: number;
  img_src: string;
  sub_images: string[];
  tags: string[];
  long_description: string;
  information: ProductInformations;
  content?: ProductContent[];
  created_at: string;
  updated_at: string;
}

export interface ShopCategoryGroup {
  name: string;
  slug: string;
  products: Product[];
}

export interface ProductComment {
  id: number;
  project_id: number;
  author: string;
  timestamp: string;
  content: string;
  avatar_url?: string;
  rating?: number;
  created_at: string;
  parent_comment_id?: number | null;
  user_id: string;
}

export interface UseRelatedProductsReturn {
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
}
