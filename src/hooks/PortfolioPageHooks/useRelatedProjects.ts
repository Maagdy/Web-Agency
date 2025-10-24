import { useEffect, useState } from "react";
import type { Project, UseRelatedProjectsOptions } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useRelatedProjects({
  category,
  excludeId,
  limit = 3,
}: UseRelatedProjectsOptions) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    const fetchRelatedProjects = async () => {
      setLoading(true);

      let query = supabase
        .from("portfolio_projects")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchRelatedProjects();
  }, [category, excludeId, limit]);

  return { projects, loading, error };
}
