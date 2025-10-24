import { useEffect, useState } from "react";
import type { Product } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useProduct(title: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const slug = slugify(title);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) setError(error.message);
      else setProduct(data);

      setLoading(false);
    };

    fetchProduct();
  }, [title]);

  return { product, loading, error };
}
