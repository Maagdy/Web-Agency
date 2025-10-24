import { useEffect, useState } from "react";
import type { BlogPost } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("❌ Failed to fetch post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    if (slug) fetchPost();
  }, [slug]);

  return { post, loading };
}
