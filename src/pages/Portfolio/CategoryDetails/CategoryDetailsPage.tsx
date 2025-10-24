import { useParams } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { Loading } from "../../../components/common/loading";
import { useProjectsByCategory } from "../../../hooks/PortfolioPageHooks/useProjectsByCategory";
import { useProjectsCategories } from "../../../hooks/PortfolioPageHooks/useProjectsCategories";
import { Text } from "../../../components/common";

function PortfolioCategoryDetailsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { categories, loading: categoriesLoading } = useProjectsCategories();
  const {
    projects,
    loading: projectsLoading,
    error,
  } = useProjectsByCategory(categoryName || "");

  const loading = categoriesLoading || projectsLoading;

  // Find if the category slug exists in our list
  const category = categories.find((c) => c.slug === categoryName);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading
          className="force-main-color !bg-transparent"
          text="Loading Projects..."
        />
      </div>
    );
  }

  if (!categoryName || !category) {
    return (
      <Text variant="lead" className="text-center text-red-500 py-20">
        Failed to load category.
      </Text>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-2xl font-semibold">
          Failed to load projects.
        </p>
        <p className="text-gray-600 mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-12 mt-10 mb-20 p-8 px-20 grid-cols-1">
          {projects.map((project) => (
            <ProjectCard
              id={project.id}
              imgSrc={project.img_src}
              path={project.path}
              title={project.title}
              category={project.category}
              key={project.id}
            />
          ))}
        </div>
      ) : (
        <p className="p-6 text-gray-500 text-4xl text-center">
          No projects found in "{category.name}".
        </p>
      )}
    </div>
  );
}

export default PortfolioCategoryDetailsPage;
