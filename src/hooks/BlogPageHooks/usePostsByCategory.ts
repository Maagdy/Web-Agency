import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import type { BlogPost } from "../hooks.types";

export function usePostsByCategory(categoryName: string | null) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryName) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .ilike("category", categoryName); // 👈 matches ignoring case

      if (error) {
        console.error("❌ Failed to fetch posts by category:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setPosts(data as BlogPost[]);
      setLoading(false);
    };

    fetchPosts();
  }, [categoryName]);

  return { posts, loading, error };
}
