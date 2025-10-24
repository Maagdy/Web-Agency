import { useEffect, useState } from "react";
import type { Product } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      // ✅ Fetch ALL products at once
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []); // Only fetch once on mount

  return {
    products,
    loading,
    error,
  };
}
