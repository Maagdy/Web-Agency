import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { Link } from "react-router-dom";
import type { ProjectCardProps } from "../../../components/types/types";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  imgSrc,
  title,
  category,
  path,
  related = false,
}) => {
  return (
    <Link
      className="group flex flex-col items-center bg-white justify-center shadow-lg rounded-md"
      to={path}
    >
      <div
        className={`relative overflow-hidden w-full rounded-tr-lg rounded-tl-lg cursor-pointer ${
          related ? "p-4" : ""
        }`}
      >
        <img
          src={imgSrc}
          alt={`Project ${id}`}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-400 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/25 opacity-0 w-full transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
          <EastOutlinedIcon className="text-white !w-12 !h-12 transform transition-transform duration-500 pointer-events-none" />
        </div>
      </div>

      <section
        className={`flex flex-col w-full mt-2  ${
          related ? "items-start pl-4 mb-6" : "items-center mb-12"
        }`}
      >
        {title && (
          <h2
            className={`mt-5 cursor-pointer text-[var(--mainColor)] ${
              related
                ? "text-left text-2xl mb-2 font-semibold"
                : "text-center text-3xl font-bold mb-0"
            }`}
          >
            {title}
          </h2>
        )}

        {related && category && (
          <span className="flex items-center gap-2 text-sm text-cyan-700 mt-1 cursor-pointer">
            <FolderCopyOutlinedIcon fontSize="small" />
            {category}
          </span>
        )}
      </section>
    </Link>
  );
};
