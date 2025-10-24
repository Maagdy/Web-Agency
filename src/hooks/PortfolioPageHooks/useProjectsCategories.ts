import { useEffect, useState } from "react";
import type { PortfolioCategoryGroup, Project } from "../hooks.types";
import { supabase } from "../../supabaseClient";
import { slugify } from "../../components/Utils";

export function useProjectsCategories() {
  const [categories, setCategories] = useState<PortfolioCategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const categoryMap: Record<string, Project[]> = {};
      (data as Project[]).forEach((project) => {
        if (!categoryMap[project.category]) {
          categoryMap[project.category] = [];
        }
        categoryMap[project.category].push(project);
      });

      const grouped: PortfolioCategoryGroup[] = Object.entries(categoryMap).map(
        ([name, projects]) => ({
          name,
          slug: slugify(name),
          projects,
        })
      );

      setCategories(grouped);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
