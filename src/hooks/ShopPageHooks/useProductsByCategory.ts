import { useEffect, useState } from "react";
import type { Product } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useProductsByCategory(
  slug: string,
  page: number = 1,
  limit: number = 6,
  sortBy: string = ""
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, get all products to find the actual category name
        const { data: allData, error: fetchError } = await supabase
          .from("products")
          .select("*");

        if (fetchError) throw fetchError;

        // Find the category matching the slug
        const grouped = (allData as Product[]).reduce((map, product) => {
          if (!map[product.category]) map[product.category] = [];
          map[product.category].push(product);
          return map;
        }, {} as Record<string, Product[]>);

        const match = Object.entries(grouped).find(
          ([name]) => slugify(name) === slug
        );

        if (!match) {
          setProducts([]);
          setTotalCount(0);
          setTotalPages(0);
          setLoading(false);
          return;
        }

        const categoryProducts = match[1];

        // Apply sorting
        if (sortBy === "price-low") {
          categoryProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
          categoryProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          categoryProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else {
          // Default: sort by created_at descending
          categoryProducts.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        }

        // Calculate pagination
        const total = categoryProducts.length;
        const pages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = categoryProducts.slice(startIndex, endIndex);

        setProducts(paginatedProducts);
        setTotalCount(total);
        setTotalPages(pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setProducts([]);
        setTotalCount(0);
        setTotalPages(0);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [slug, page, limit, sortBy]);

  return { products, totalCount, totalPages, loading, error };
}
