import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/common/loading";
import ProductCard from "../components/ProductCard";
import { slugify } from "../../../components/Utils";
import { Button } from "../../../components/common";
import { useProductsByCategory } from "../../../hooks/ShopPageHooks/useProductsByCategory";

function CategoryDetailsPage() {
  const { categoryName } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const limit = 6; // products per page

  const { products, totalCount, totalPages, loading, error } =
    useProductsByCategory(categoryName ?? "", page, limit, sortBy);

  if (!categoryName) {
    return <p className="p-6 text-gray-500">Invalid category.</p>;
  }

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  // Format category name for display
  const displayCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="py-10 px-10 xl:px-30 bg-gray-50 min-h-screen">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 p-0 mt-10 gap-4">
        <aside>
          <p className="text-3xl font-bold text-[var(--mainColor)] mb-2">
            {displayCategoryName}
          </p>
          <p className="bg-gradient-to-r from-blue-900 to-cyan-400 p-4 rounded-md text-white">
            Showing {products.length} of {totalCount} products
          </p>
        </aside>

        <section className="flex gap-4 w-full sm:w-auto justify-between">
          <select
            className="p-2 rounded-md border text-[var(--mainColor)] border-[var(--mainColor)]"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1); // Reset to first page on sort
            }}
          >
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </section>
      </section>

      {loading ? (
        <Loading
          className="force-main-color items-center !bg-transparent"
          text="Loading Products..."
        />
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : totalCount === 0 ? (
        <p className="p-6 text-gray-500 text-4xl text-center mt-20">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 justify-items-center items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              imgSrc={product.img_src}
              price={product.price}
              category={product.category}
              path={`/shop/categories/${slugify(
                product.category ?? ""
              )}/${slugify(product.title)}`}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && !loading && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
          <Button
            variant="primary"
            onClick={handlePrev}
            disabled={page === 1}
            className={` ${
              page === 1
                ? "pointer-events-none opacity-50"
                : "pointer-events-auto"
            }`}
          >
            Prev
          </Button>

          <span className="text-sm sm:text-base font-medium text-gray-700">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={page === totalPages}
            className={` ${
              page === totalPages
                ? "pointer-events-none opacity-50"
                : "pointer-events-auto"
            }`}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryDetailsPage;
