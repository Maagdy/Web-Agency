import { useState, useMemo } from "react";
import { useProducts } from "../../../hooks/ShopPageHooks/useProducts";
import { slugify } from "../../../components/Utils";
import { Loading } from "../../../components/common/loading";
import { Button } from "../../../components/common";
import ProductCard from "./ProductCard";

const ShopContent = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const limit = 6; // products per page

  const { products: allProducts, loading, error } = useProducts();

  // ✅ Get unique categories from products
  const categories = useMemo(() => {
    const cats = allProducts.map((p) => p.category);
    return Array.from(new Set(cats)).sort();
  }, [allProducts]);

  // ✅ Filter and sort products on the client side
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [allProducts, selectedCategory, sortBy]);

  // ✅ Paginate the filtered results
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, page, limit]);

  const totalCount = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalCount / limit);

  // ✅ Reset to page 1 when filters change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div className="py-10 px-10 xl:px-30 bg-gray-50">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 p-0 mt-10 gap-4">
        <aside>
          <p className="text-3xl font-bold text-[var(--mainColor)] mb-2">
            Shop
          </p>
          <p className="bg-gradient-to-r from-blue-900 to-cyan-400 p-4 rounded-md text-white">
            Showing {paginatedProducts.length} of {totalCount} results
          </p>
        </aside>

        <section className="flex gap-4 w-full flex-col sm:flex-row sm:w-auto justify-between">
          <select
            className="px-2 rounded-md border text-[var(--mainColor)] border-[var(--mainColor)]"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-md border text-[var(--mainColor)] border-[var(--mainColor)]"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Default Sort</option>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 justify-items-center items-center">
          {paginatedProducts.map((prod, index) => (
            <ProductCard
              id={prod.id.toString()}
              key={prod.id || index}
              category={prod.category}
              imgSrc={prod.img_src}
              price={prod.price}
              title={prod.title}
              path={`categories/${slugify(prod.category)}/${slugify(
                prod.title
              )}`}
            />
          ))}
        </div>
      )}

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
};

export default ShopContent;
