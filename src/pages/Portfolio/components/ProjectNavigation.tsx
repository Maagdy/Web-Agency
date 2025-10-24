import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from "@mui/icons-material/GridView";
import { slugify } from "../../../components/Utils";
import { useProjects } from "../../../hooks/PortfolioPageHooks/useProjects";
import type { Project } from "../../../hooks/hooks.types";
import { Button } from "../../../components/common";

interface ProjectNavigationProps {
  project: Project;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ project }) => {
  const navigate = useNavigate();
  const { projectPath } = useParams();
  const { projects } = useProjects();

  const navigationArray = projects
    .filter((p) => p.category === project.category)
    .map((p) => p.path);

  const currentIndex = navigationArray.indexOf(projectPath ?? project.path);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === navigationArray.length - 1;

  const showPrev = navigationArray.length > 1 && !isFirst;
  const showNext = navigationArray.length > 1 && !isLast;

  return (
    <div className="max-w-7xl relative mx-auto flex items-center py-6 px-4 sm:px-0 mb-4">
      {/* Previous Button */}
      <div className="flex-1">
        {showPrev && (
          <section
            className="flex items-center group cursor-pointer"
            onClick={() =>
              navigate(
                `/portfolio/categories/${slugify(project.category ?? "")}/${
                  navigationArray[currentIndex - 1]
                }`
              )
            }
          >
            <Button
              variant="secondary"
              className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-md border border-[var(--mainColor)]/30 group-hover:!bg-[var(--mainColor)] cursor-pointer"
            >
              <ArrowBackIos className="text-[var(--mainColor)] group-hover:text-white ml-2 sm:ml-3 text-lg sm:text-xl" />
            </Button>
            <section className="flex flex-col text-[var(--mainColor)] ml-2 sm:ml-4">
              <p className="text-sm sm:text-base">Previous</p>
              <p className="hidden sm:block font-bold text-base sm:text-xl pr-4 sm:pr-8">
                {navigationArray[currentIndex - 1]}
              </p>
            </section>
          </section>
        )}
      </div>

      {/* Gallery Button */}
      <div
        className="absolute left-1/2 -translate-x-1/2 
             flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
             rounded-md cursor-pointer group"
        onClick={() => navigate("/portfolio")}
      >
        <GridViewIcon className="text-[var(--mainColor)] text-lg sm:text-xl" />
        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded-sm text-white bg-cyan-500 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Gallery
        </span>
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {showNext && (
          <section
            className="flex group items-center cursor-pointer"
            onClick={() =>
              navigate(
                `/portfolio/categories/${slugify(project.category ?? "")}/${
                  navigationArray[currentIndex + 1]
                }`
              )
            }
          >
            <section className="flex flex-col text-[var(--mainColor)] mr-2 sm:mr-4 text-right">
              <p className="text-sm sm:text-base">Next</p>
              <p className="hidden sm:block font-bold text-base sm:text-xl pl-4 sm:pl-8">
                {navigationArray[currentIndex + 1]}
              </p>
            </section>
            <Button
              variant="secondary"
              className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-md border border-[var(--mainColor)]/30 group-hover:!bg-[var(--mainColor)] cursor-pointer"
            >
              <ArrowForwardIos className="text-[var(--mainColor)] group-hover:text-white text-lg sm:text-xl" />
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
