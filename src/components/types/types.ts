import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ReactNode } from "react";
import type {
  BlogCategoryGroup,
  BlogPost,
  Project,
} from "../../hooks/hooks.types";

export interface BottomNavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

export interface CountUpItem {
  label: string;
  number: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

export interface SocialMediaIcon {
  name: string;
  icon: ReactNode;
  link: string;
  hoverColor: string;
}

export interface ServiceCardProps {
  imgSrc: string;
  title: string;
  description?: string;
}

export interface StaticServiceCardProps {
  title: string;
  imgSrc: string;
  description: string;
}

export interface PricingCardProps {
  planName: string;
  price: string;
  duration: string;
  popular?: boolean;
  className?: string;
}

export interface MemberCardProps {
  name: string;
  role: string;
  imgSrc: string;
  socialLinks: Array<{
    platform?: string;
    icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
    hoverClass?: string;
    url?: string;
  }>;
}

export interface FooterItemsProps {
  id: number;
  title: string;
  links: { label: string; path: string }[];
}

export interface SubMenuItem {
  path: string;
  label: string;
  submenu?: SubMenuItem[];
}

export interface NavItem {
  path: string;
  label: string;
  submenu?: SubMenuItem[];
}

export interface NavigationItemProps {
  item: NavItem;
  index: number;
  openSubmenu: number | null;
  setOpenSubmenu: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface ProjectCardProps {
  id: number;
  imgSrc?: string;
  title: string;
  date?: Date | string | null;
  related?: boolean;
  category?: string;
  path: string;
  description?: string;
  properties?: {
    client?: string;
    createdBy?: string;
    completed?: string;
    skills?: string[];
    websiteUrl?: string;
    keywords?: string[];
  };
  comments?: CommentCardProps[];
}

export interface CategoriesCardProps {
  id: number;
  numOfProjects?: number;
  imgSrc: string;
  title: string;
  category?: string;
  isPost?: boolean;
  path: string;
}

export interface CommentCardProps {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  avatarUrl: string;
  replies?: Comment[];
  rating?: number;
  replayFunction?: () => void;
}

export type Comment = {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  avatarUrl?: string;
  replies?: Comment[];
};

// Updated: Main interface for comment submission data
export interface CommentModalData {
  name: string;
  email: string;
  comment: string;
  rating?: number; // Changed from number | null to just number (optional)
  parentCommentId?: number | null;
}

export type SideNavbarProps = {
  categories: BlogCategoryGroup[] | null;
  projects: Project[] | null;
  posts: BlogPost[] | null;
  isLoadingCategories?: boolean;
  isLoadingProjects?: boolean;
  isLoadingPosts?: boolean;
};

export interface ProductCardProps {
  id: string;
  price: number;
  title: string;
  category: string;
  imgSrc: string;
  path: string;
  isRelated?: boolean;
}

// Updated: Fixed to use CommentModalData type
export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CommentModalData) => void; // Changed to use CommentModalData
  parentCommentId?: number | null;
  showRating?: boolean;
}

export interface ShopCategoryCardProps {
  imgSrc: string;
  title: string;
  productCount?: number;
  path: string;
}
