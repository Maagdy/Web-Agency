import type { Product } from "../../../hooks/hooks.types";

export const Description: React.FC<{ product: Product }> = ({ product }) => {
  if (!product.content) return null;
  const content = product.content;
  return (
    <div className="bg-gradient-to-r max-w-7xl mx-auto from-blue-900 to-cyan-400 py-10 px-14 text-white w-full">
      {content?.map((item, index) => (
        <div className="mb-6" key={index}>
          <h2 className="text-2xl font-bold mb-2" key={index}>
            {item.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-100 mb-2">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
};
