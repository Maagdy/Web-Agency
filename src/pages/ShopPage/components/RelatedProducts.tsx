import { Loading } from "../../../components/common/loading";
import { slugify } from "../../../components/Utils";
import type { Product } from "../../../hooks/hooks.types";
import { useRelatedProductsAdvanced } from "../../../hooks/ShopPageHooks/useRelatedProducts";
import ProductCard from "./ProductCard";

const RelatedProducts: React.FC<{ product: Product }> = ({ product }) => {
  const { relatedProducts, loading } = useRelatedProductsAdvanced(
    product?.category || "",
    product?.tags || [],
    product?.id || 0,
    4
  );

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-cyan-400 py-10 px-6 sm:px-12 flex flex-col">
      {/* Title */}
      <section className="flex">
        <h1 className="relative text-2xl sm:text-3xl text-white font-semibold">
          Related Products ...
          <span className="h-10 sm:h-12 w-1.5 bg-white absolute -left-6 sm:-left-12 top-0"></span>
        </h1>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <Loading className="!bg-transparent" text="Loading Posts..." />
          </div>
        ) : relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              imgSrc={product.img_src}
              path={`/shop/categories/${slugify(product.category)}/${slugify(
                product.title
              )}`}
              price={product.price}
              isRelated={true}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-white">
            No related posts found.
          </p>
        )}
      </section>
    </div>
  );
};

export default RelatedProducts;
