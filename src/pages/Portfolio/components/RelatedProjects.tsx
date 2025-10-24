import { slugify } from "../../../components/Utils";
import { ProjectCard } from "./ProjectCard";
import { useRelatedProjects } from "../../../hooks/PortfolioPageHooks/useRelatedProjects";
import { Loading } from "../../../components/common/loading";

export default function RelatedProjects({
  category,
  projectId,
}: {
  category: string;
  projectId: number;
}) {
  const { projects, loading, error } = useRelatedProjects({
    category,
    excludeId: projectId,
  });

  if (error) {
    return (
      <div className="text-red-500 text-center w-full">
        Error loading related projects: {error}
      </div>
    );
  }
  return (
    <>
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-cyan-400 py-10 px-6 sm:px-12 flex flex-col">
        {/* Title */}
        <section className="flex">
          <h1 className="relative text-2xl sm:text-3xl text-white font-semibold">
            Related Projects ...
            <span className="h-10 sm:h-12 w-1.5 bg-white absolute -left-6 sm:-left-12 top-0"></span>
          </h1>
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
          {loading ? (
            <div className="col-span-3 flex justify-center">
              <Loading className="!bg-transparent" text="Loading Project..." />
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                imgSrc={project.img_src}
                path={`/portfolio/categories/${slugify(
                  project.category ?? ""
                )}/${project.path}`}
                title={project.title}
                category={project.category}
                related
              />
            ))
          )}
        </section>
      </div>
    </>
  );
}
