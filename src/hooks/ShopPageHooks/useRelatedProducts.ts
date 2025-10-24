import { useEffect, useState } from "react";
import type { Product, UseRelatedProductsReturn } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useRelatedProductsAdvanced(
  category: string,
  tags: string[],
  currentProductId: number,
  limit: number = 4
): UseRelatedProductsReturn {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category || !currentProductId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // First try to find products with matching tags
        let query = supabase
          .from("products")
          .select("*")
          .neq("id", currentProductId);

        // If tags exist, prioritize products with overlapping tags
        if (tags && tags.length > 0) {
          query = query.overlaps("tags", tags);
        } else {
          // Fall back to same category
          query = query.eq("category", category);
        }

        const { data, error: fetchError } = await query
          .limit(limit)
          .order("rating", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // If we got fewer results than limit and we used tags, fetch more from category
        if (data && data.length < limit && tags && tags.length > 0) {
          const remainingLimit = limit - data.length;
          const existingIds = data.map((p) => p.id);

          const { data: categoryData, error: categoryError } = await supabase
            .from("products")
            .select("*")
            .eq("category", category)
            .neq("id", currentProductId)
            .not("id", "in", `(${existingIds.join(",")})`)
            .limit(remainingLimit)
            .order("rating", { ascending: false });

          if (!categoryError && categoryData) {
            data.push(...categoryData);
          }
        }

        setRelatedProducts(data || []);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, tags, currentProductId, limit]);

  return { relatedProducts, loading, error };
}
