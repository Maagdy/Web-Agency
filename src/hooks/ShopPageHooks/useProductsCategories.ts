import { useEffect, useState } from "react";
import type { Product, ShopCategoryGroup } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useProductsCategories() {
  const [categories, setCategories] = useState<ShopCategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const categoryMap: Record<string, Product[]> = {};
      (data as Product[]).forEach((product) => {
        if (!categoryMap[product.category]) {
          categoryMap[product.category] = [];
        }
        categoryMap[product.category].push(product);
      });

      const grouped: ShopCategoryGroup[] = Object.entries(categoryMap).map(
        ([name, products]) => ({
          name,
          slug: slugify(name),
          products,
        })
      );

      setCategories(grouped);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
