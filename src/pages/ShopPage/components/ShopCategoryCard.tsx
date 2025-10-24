import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ShopCategoryCardProps } from "../../../components/types/types";

export const ShopCategoryCard: React.FC<ShopCategoryCardProps> = ({
  imgSrc,
  title,
  productCount,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col shadow-lg rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      onClick={() => navigate(path)}
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <ArrowRight className="text-white w-8 h-8" />
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
          {title}
        </h3>
        {productCount !== undefined && (
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <ShoppingBag className="w-4 h-4" />
            <span>{productCount} Products</span>
          </div>
        )}
      </div>
    </div>
  );
};
