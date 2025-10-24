import LinkIcon from "@mui/icons-material/Link";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import type { ProjectCardProps } from "../../../components/types/types";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../components/Utils/formatData";
import { Button, Text } from "../../../components/common";
import { useState } from "react";

export const PostCard: React.FC<ProjectCardProps> = ({
  id,
  imgSrc,
  title,
  date,
  description,
  category,
  path,
  related = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const previewedDescription = description?.slice(0, 150) || "";
  const isLong = description && description.length > 150;
  console.log("Card path", path);

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (related && path) {
          navigate(path);

          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={`group cursor-default flex flex-col ${
        related ? "" : "sm:flex-row"
      } items-start gap-6 bg-white shadow-lg rounded-md p-4 sm:items-start sm:content-start`}
    >
      {/* Image wrapper */}
      <div
        className={`relative w-full ${
          related ? "" : "sm:w-1/2"
        } overflow-hidden rounded-lg cursor-pointer`}
      >
        <img
          src={imgSrc}
          alt={`Project ${id}`}
          loading="lazy"
          className={`w-full  ${
            related ? "h-full" : "lg:h-96 h-56 sm:h-72 md:h-80"
          } object-cover transition-transform duration-400 hover:scale-110`}
        />
        <div className="absolute inset-0 bg-blue-700/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
          <LinkIcon className="text-black bg-white rounded-full p-2 !w-10 !h-10 sm:!w-12 sm:!h-12 transform rotate-45 transition-transform duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <section
        className={`flex flex-col w-full ${
          related ? "" : "sm:w-1/2"
        } mt-4 sm:mt-0 self-start`}
      >
        {title && (
          <h2
            className={`text-[var(--mainColor)] text-left font-bold leading-snug
      ${
        related
          ? "text-base sm:text-lg break-words line-clamp-2"
          : "text-xl sm:text-3xl "
      }`}
          >
            {title}
          </h2>
        )}

        {date && (
          <span className="text-xs sm:text-sm italic relative mt-3 flex items-center">
            <span className="absolute w-[3px] h-[20px] bg-cyan-400 rounded"></span>
            <span className="ml-3 text-[var(--mainColor)]">
              {formatDate(date)}
            </span>
          </span>
        )}

        {description && (
          <Text className="mt-3 sm:mt-4 pr-2 sm:pr-4 text-wrap text-gray-600 text-sm sm:text-base transition-all duration-500 ease-in-out">
            {isExpanded || !isLong ? description : `${previewedDescription}...`}

            {isLong && (
              <span
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-[var(--mainColor)] font-semibold cursor-pointer hover:underline"
              >
                {isExpanded ? " Show Less" : " Read More"}
              </span>
            )}
          </Text>
        )}

        <Button
          onClick={() => navigate(path)}
          variant="secondary"
          iconRight={
            <EastOutlinedIcon className="!text-[14px] !mt-1 sm:!text-[16px] md:!text-[18px]" />
          }
          className={`${
            related ? "hidden" : ""
          } font-normal w-fit !px-4 sm:!px-6 !py-2 mt-3 sm:mt-4 text-sm sm:text-base !text-[var(--mainColor)] !border-[var(--mainColor)] hover:!bg-[var(--mainColor)] hover:!text-white`}
        >
          Read More
        </Button>

        {related && category && (
          <span className="flex overflow-hidden items-center gap-2 text-sm text-cyan-700 mt-2 cursor-pointer">
            <FolderCopyOutlinedIcon fontSize="small" />
            {category}
          </span>
        )}
      </section>
    </div>
  );
};
