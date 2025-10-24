import { useEffect, useState } from "react";
import type { Project } from "../hooks.types";
import { supabase } from "../../supabaseClient";

export function useProject(path: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) return;

    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("path", path)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [path]);

  return { project, loading, error };
}
