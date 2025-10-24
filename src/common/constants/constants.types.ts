export interface AboutItemProps {
  id: number;
  title: string;
  content?: string;
  websiteDetails?: {
    client?: string;
    color?: string;
    platform?: string;
    year?: string;
  };
  image?: string;
  location?: "left" | "right";
  map?: string;
  button?: string;
}

export interface AboutItemButtonProps {
  id: number;
  title: string;
  icon: React.ElementType;
}

export interface FeaturesItemProps {
  id: number;
  title: string;
}

export interface ClientCardProps {
  id: number;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
