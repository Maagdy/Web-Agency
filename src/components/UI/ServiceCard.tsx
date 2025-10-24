import { ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface ServiceCardProps {
  title: string;
  imgSrc: string;
  description?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imgSrc,
  description = "The different areas of web design include web graphic design.",
  className = "",
}) => {
  return (
    <div
      className={`relative flex w-full md:w-[360px] lg:w-[380px] 
  h-auto md:h-[360px] lg:h-[380px] 
  bg-white rounded-xl shadow-xl drop-shadow-xl 
  flex-col justify-start items-start 
  mx-4 md:mx-2 
  p-6 
  transition-transform duration-300 ease-in-out 
  hover:translate-y-5 hover:z-10
  ${className}`}
    >
      <img
        src={imgSrc}
        alt="icon image"
        loading="lazy"
        className="md:w-18 md:h-18 my-4 mb-8"
      />

      <section className="flex flex-col text-center md:text-left w-full">
        <h1 className="lg:text-4xl text-3xl uppercase font-bold text-[var(--mainColor)] mb-4">
          {title}
        </h1>

        <p className="text-gray-500 text-sm lg:text-base mb-10 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="absolute bottom-4 left-1/2  -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0">
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

export default ServiceCard;
