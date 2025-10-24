import { useEffect, useState } from "react";
import type { BlogCategoryGroup, BlogPost } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*") // fetch all posts
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Failed to fetch categories:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const categoryMap: Record<string, BlogPost[]> = {};

      (data as BlogPost[]).forEach((post) => {
        if (!post.category) return; // skip empty categories
        if (!categoryMap[post.category]) {
          categoryMap[post.category] = [];
        }
        categoryMap[post.category].push(post);
      });

      const grouped: BlogCategoryGroup[] = Object.entries(categoryMap).map(
        ([name, posts]) => ({
          name,
          slug: slugify(name),
          posts,
        })
      );

      setCategories(grouped);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
