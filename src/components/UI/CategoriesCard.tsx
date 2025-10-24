import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { useNavigate } from "react-router-dom";
import type { CategoriesCardProps } from "../types/types";

export const CategoriesCard: React.FC<CategoriesCardProps> = ({
  id,
  imgSrc,
  title,
  category,
  path,
  numOfProjects,
  isPost = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col items-center justify-center shadow-lg rounded-md"
      onClick={() => navigate(path)}
    >
      <div className="relative overflow-hidden w-full rounded-tr-lg rounded-tl-lg cursor-pointer ">
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

      <section className="flex flex-col w-full mt-2 mb-12 px-2 items-center">
        {title && (
          <h2 className="mt-5 cursor-pointer text-2xl md:text-3xl font-bold text-[var(--mainColor)] text-center">
            {title}
          </h2>
        )}

        {category && (
          <span className="flex items-center gap-2 text-sm text-cyan-700 mt-1 cursor-pointer">
            <FolderCopyOutlinedIcon fontSize="small" />
            {category}
            {numOfProjects !== undefined &&
              ` - ${numOfProjects} ${isPost ? "Posts" : "Projects"}`}
          </span>
        )}
      </section>
    </div>
  );
};
