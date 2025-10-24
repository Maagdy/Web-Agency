import { useEffect, useState, useCallback } from "react";
import type { ProjectComment } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useProjectComments(
  projectId: number,
  realtime: boolean = true
) {
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback so the function reference is stable
  const fetchComments = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("project_comments")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) {
        setError(error.message);
        console.error("Error fetching comments:", error);
      } else {
        setComments((data as ProjectComment[]) || []);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch comments");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    fetchComments();

    if (!realtime) return;

    const channel = supabase
      .channel(`comments-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_comments",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          console.log("Realtime event:", payload.eventType, payload);

          if (payload.eventType === "INSERT") {
            const newComment = payload.new as ProjectComment;
            setComments((prev) => {
              const exists = prev.some((c) => c.id === newComment.id);
              if (exists) return prev;
              return [...prev, newComment];
            });
          }

          if (payload.eventType === "DELETE") {
            const deletedComment = payload.old as ProjectComment;
            setComments((prev) =>
              prev.filter((c) => c.id !== deletedComment.id)
            );
          }

          if (payload.eventType === "UPDATE") {
            const updatedComment = payload.new as ProjectComment;
            setComments((prev) =>
              prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
            );
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      console.log("Cleaning up realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [projectId, realtime, fetchComments]);

  // Return refetch function so components can trigger it manually
  return { comments, loading, error, refetch: fetchComments };
}
