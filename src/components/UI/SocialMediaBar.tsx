import React from "react";

interface SocialMediaItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

interface Props {
  allSocialMediaIcons: SocialMediaItem[];
}

const SocialMediaBar: React.FC<Props> = ({ allSocialMediaIcons }) => {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-cyan-400 py-4 px-4">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {allSocialMediaIcons.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl transition-transform hover:scale-125 hover:bg-white hover:text-[var(--mainColor)] p-2 sm:p-3 rounded-lg duration-300"
          >
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-md bg-cyan-500 px-2 sm:px-3 py-1 text-[10px] sm:text-xs md:text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {item.name}
            </span>
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;
