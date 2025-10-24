import { useEffect, useState } from "react";
import type { Project } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useProjectsByCategory(slug: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProjects = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setProjects([]);
      } else {
        const grouped = (data as Project[]).reduce((map, project) => {
          if (!map[project.category]) map[project.category] = [];
          map[project.category].push(project);
          return map;
        }, {} as Record<string, Project[]>);

        // find the category matching the slug
        const match = Object.entries(grouped).find(
          ([name]) => slugify(name) === slug
        );

        setProjects(match ? match[1] : []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, [slug]);

  return { projects, loading, error };
}
