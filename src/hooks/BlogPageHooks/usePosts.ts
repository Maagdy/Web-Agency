import { useEffect, useState } from "react";
import type { BlogPost } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function usePosts(page: number, limit: number = 5) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("❌ Failed to fetch posts:", error);
      } else {
        setPosts(data || []);
        setTotal(count || 0);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [page, limit]);

  return { posts, total, loading };
}
