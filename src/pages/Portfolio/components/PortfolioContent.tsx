import { Loading } from "../../../components/common/loading";
import { ProjectCard } from "./ProjectCard";
import { slugify } from "../../../components/Utils";
import { useProjects } from "../../../hooks/PortfolioPageHooks/useProjects";

function PortfolioContent() {
  const { projects, loading } = useProjects();

  return (
    <div className="grid sm:grid-cols-2 gap-12 mt-10 mb-20 p-8 px-20 grid-cols-1">
      {loading ? (
        <div className="col-span-2 flex justify-center">
          <Loading
            className="force-main-color items-center !bg-transparent"
            text="Loading Posts..."
          />
        </div>
      ) : (
        projects.map((item) => (
          <ProjectCard
            key={item.id}
            id={item.id}
            imgSrc={item.img_src}
            category={item.category}
            title={item.title}
            path={`categories/${slugify(item.category ?? "")}/${item.path}`}
          />
        ))
      )}
    </div>
  );
}

export default PortfolioContent;
