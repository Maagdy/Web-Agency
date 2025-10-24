import React from "react";
import type { MemberCardProps } from "../types/types";

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  imgSrc,
  socialLinks,
}) => {
  return (
    <div className="w-full max-w-xs bg-transparent group relative flex flex-col items-center">
      <div className="relative w-full">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          className="w-full h-72 object-cover filter grayscale transition-all duration-300 group-hover:filter-none"
        />

        <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 pl-2">
          {socialLinks.map((link, index) => (
            <div className="relative" key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/icon peer bg-[var(--mainColor)] text-white w-10 h-10 flex items-center justify-center rounded-md shadow transition-colors duration-300 ${link.hoverClass}`}
              >
                {link.icon && (
                  <span className="transition-transform duration-500 group-hover/icon:[transform:rotateY(360deg)] [transform-style:preserve-3d]">
                    <link.icon fontSize="medium" />
                  </span>
                )}
              </a>

              {link.platform && (
                <p
                  className={`absolute left-14 top-1/2 -translate-y-1/2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-bold text-white text-center opacity-0 peer-hover:opacity-100 transition-all duration-300`}
                >
                  {link.platform}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="mt-4 text-center">
        <p className="font-bold text-white text-lg">{name}</p>
        <p className="text-cyan-400 text-sm">{role}</p>
      </section>
    </div>
  );
};

export default MemberCard;
