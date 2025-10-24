import { Loading } from "../../../components/common/loading";
import { CategoriesCard } from "../../../components/UI/CategoriesCard";
import { slugify } from "../../../components/Utils";
import { useProjectsCategories } from "../../../hooks/PortfolioPageHooks/useProjectsCategories";

function PortfolioCategoriesPage() {
  const { categories, loading, error } = useProjectsCategories();

  return (
    <section className="grid sm:grid-cols-2 gap-12 mt-10 mb-20 p-8 px-20 grid-cols-1">
      {loading && (
        <div className="col-span-2 flex justify-center">
          <Loading
            className="force-main-color !bg-transparent"
            text="Loading Categories..."
          />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center w-full">
          Error loading categories: {error}
        </div>
      )}
      {categories.map((category) => {
        const firstProject = category.projects[0];

        return (
          <CategoriesCard
            key={category.name}
            id={firstProject.id}
            imgSrc={firstProject.img_src}
            title={category.name}
            category={category.name}
            path={slugify(category.name)}
            numOfProjects={category.projects.length}
          />
        );
      })}
    </section>
  );
}

export default PortfolioCategoriesPage;
