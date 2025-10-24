import { useEffect, useState } from "react";
import type { BlogPost } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useRelatedPosts(category: string, excludeId?: number) {
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("❌ Failed to fetch related posts:", error);
      } else {
        setRelated(data || []);
      }
      setLoading(false);
    }

    if (category) fetchRelated();
  }, [category, excludeId]);

  return { related, loading };
}
