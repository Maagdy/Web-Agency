import { useState } from "react";

import type { Product } from "../../../hooks/hooks.types";
import { Information } from "../components/Information";
import { Description } from "../components/Description";
import SizeGuide from "../components/SizeGuide";
import Faq from "../components/Faq";
import ShippingReturns from "../components/ShippingReturns";
import Reviews from "../components/Reviews";

export const ProductDetailsInfo: React.FC<{ product: Product }> = ({
  product,
}) => {
  const [currentInfoContent, setCurrentInfoContent] = useState("description");

  const InfoContent = [
    {
      value: "description",
      title: "Description",
      content: <Description product={product} />,
    },
    {
      value: "information",
      title: "Information",
      content: <Information product={product} />,
    },
    {
      value: "reviews",
      title: "Reviews",
      content: <Reviews productId={product.id} />,
    },
    {
      value: "size guide",
      title: "Size Guide",
      content: <SizeGuide />,
    },
    { value: "faq", title: "FAQ", content: <Faq /> },
    {
      value: "shipping & returns",
      title: "Shipping & Returns",
      content: <ShippingReturns />,
    },
  ];

  return (
    <div className="py-10">
      {/* Tab Buttons */}
      <section className="flex gap-2 w-full my-10 flex-wrap justify-center">
        {InfoContent.map((info) => (
          <button
            onClick={() => setCurrentInfoContent(info.value)}
            key={info.value}
            className={`py-4 px-6 bg-gray-100 text-lg text-[var(--mainColor)] font-bold rounded-sm cursor-pointer transition-all duration-300
              hover:bg-[var(--mainColor)] hover:text-white
              ${
                currentInfoContent === info.value
                  ? "!bg-[var(--mainColor)] text-white"
                  : ""
              }`}
          >
            {info.title}
          </button>
        ))}
      </section>

      {/* Tab Content */}
      <div>
        {InfoContent.find((info) => info.value === currentInfoContent)?.content}
      </div>
    </div>
  );
};
