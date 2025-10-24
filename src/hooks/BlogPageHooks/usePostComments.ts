import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import type { PostComment } from "../hooks.types";

export function usePostComments(postId: string) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Centralized fetcher
  const fetchComments = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  }, [postId]);

  // ✅ Initial fetch
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // ✅ Live subscription — no patching, just refetch
  useEffect(() => {
    if (!postId) return;

    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_comments",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchComments(); // always sync with DB
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, fetchComments]);

  // ✅ Add comment (let realtime handle sync)
  const addComment = async (
    comment: Omit<PostComment, "id" | "created_at">
  ) => {
    const { error } = await supabase.from("blog_comments").insert([comment]);

    if (error) {
      setError(error.message);
      return null;
    }

    // fallback in case realtime lags
    await fetchComments();
  };

  return { comments, loading, error, addComment, refetch: fetchComments };
}
