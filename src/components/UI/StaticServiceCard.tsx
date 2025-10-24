import { ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import type { StaticServiceCardProps } from "../types/types";

const StaticServiceCard: React.FC<StaticServiceCardProps> = ({
  title,
  imgSrc,
  description,
}) => {
  return (
    <div className="relative bg-white flex w-full lg:w-[380px] h-auto md:h-[220px] lg:h-[260px] rounded-lg shadow-xl flex-col items-center lg:items-start mx-4 md:mx-2 px-4 py-6 md:px-6 md:py-8">
      <img
        src={imgSrc}
        alt="icon image"
        loading="lazy"
        className="w-14 h-14 md:w-16 md:h-16 mb-3"
      />

      <section className="flex flex-col text-center lg:text-start w-full">
        <p className="text-cyan-500 text-base md:text-lg lg:text-xl mb-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-center flex-col sm:flex-row lg:justify-between gap-2">
          <h1 className="text-2xl uppercase font-bold text-[var(--mainColor)]">
            {title}
          </h1>
          <IconButton
            color="primary"
            onClick={() => alert("Clicked!")}
            className="!text-[var(--mainColor)]"
          >
            <ArrowForward />
          </IconButton>
        </div>
      </section>
    </div>
  );
};

export default StaticServiceCard;
