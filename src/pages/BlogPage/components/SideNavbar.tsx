import { memo, useMemo } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { NavLink, useNavigate } from "react-router-dom";
import { banner } from "../../../common/assets/images";
import { Button, Text } from "../../../components/common";

import { formatDate } from "../../../components/Utils/formatData";
import { slugify } from "../../../components/Utils";
import { Loading } from "../../../components/common/loading";
import type { SideNavbarProps } from "../../../components/types/types";

function SideNavbar({
  categories,
  projects,
  posts,
  isLoadingCategories = false,
  isLoadingProjects = false,
  isLoadingPosts = false,
}: SideNavbarProps) {
  const latestProjects = useMemo(() => projects?.slice(0, 6) ?? [], [projects]);
  const latestPosts = useMemo(() => posts?.slice(0, 6) ?? [], [posts]);
  const navigate = useNavigate();

  return (
    <div
      className="sticky top-4 flex w-full lg:max-w-sm flex-col p-4 lg:p-8 text-white rounded-sm shadow-md h-fit"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Search Section */}
      <section className="flex mb-8 lg:mb-16 px-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 min-w-0"
        />
        <Button
          variant="secondary"
          size="sm"
          className="ml-2 !rounded-sm font-light !bg-cyan-400 !text-black hover:!bg-white flex-shrink-0"
        >
          Search
        </Button>
      </section>

      {/* Scrollable Content Container */}
      <div className="flex-1 min-h-0 space-y-6">
        {/* Categories */}
        <section className="flex-shrink-0">
          <Text className="relative font-bold text-white !text-xl lg:!text-2xl mb-3 border-b border-white/30 pb-1">
            Categories
            <span className="absolute w-[6px] h-[30px] -left-8 top-1.5 bg-white hidden lg:block"></span>
          </Text>
          {isLoadingCategories ? (
            <Loading text="Loading Categories..." className="!bg-transparent" />
          ) : categories?.length ? (
            <ul className="space-y-2 text-gray-200 list-disc list-inside">
              {categories.map((cat, index) => (
                <li key={index} className="break-words">
                  <NavLink
                    to={`/blog/categories/${cat.name}`}
                    className={({ isActive }) =>
                      `cursor-pointer hover:text-cyan-300 ${
                        isActive ? "text-cyan-400 font-semibold" : ""
                      }`
                    }
                  >
                    {cat.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-300 italic">No categories found</p>
          )}
        </section>

        {/* Projects */}
        <section className="flex-shrink-0">
          <Text className="relative font-bold text-white !text-xl lg:!text-2xl mb-4 border-b border-white/30 pb-1">
            Projects
            <span className="absolute w-[6px] h-[30px] -left-8 top-1.5 bg-white"></span>
          </Text>
          {isLoadingProjects ? (
            <Loading text="Loading Projects..." className="!bg-transparent" />
          ) : latestProjects.length ? (
            <div className="cursor-default grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-5 py-4">
              {latestProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() =>
                    navigate(
                      `/portfolio/categories/${slugify(project.category)}/${
                        project.path
                      }`
                    )
                  }
                  className="group relative overflow-hidden w-full aspect-square rounded-sm cursor-pointer"
                >
                  <img
                    src={project.img_src}
                    alt={`Project ${project.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-700/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
                    <LinkIcon className="text-black bg-white rounded-full p-1 lg:p-2 !w-6 !h-6 lg:!w-8 lg:!h-8 transform rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-300 italic">No projects found</p>
          )}
        </section>

        {/* Latest Posts */}
        <section className="flex-shrink-0">
          <Text className="relative font-bold text-white !text-xl lg:!text-2xl mb-4 border-b border-white/30 pb-1">
            Latest Posts
            <span className="absolute w-[6px] h-[30px] -left-8 top-1.5 bg-white"></span>
          </Text>
          {isLoadingPosts ? (
            <Loading text="Loading Posts..." className="!bg-transparent" />
          ) : latestPosts.length ? (
            <div className="cursor-default grid grid-cols-1 gap-4 lg:gap-5 py-4">
              <div className="cursor-default grid grid-cols-1 gap-4 lg:gap-5 py-4">
                {latestPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex group flex-wrap sm:flex-nowrap gap-6 justify-center items-start cursor-pointer"
                    onClick={() =>
                      navigate(`/blog/categories/${post.category}/${post.slug}`)
                    }
                  >
                    {/* Image hover logic stays scoped */}
                    <div className="group/image relative overflow-hidden w-40 aspect-square rounded-sm cursor-pointer">
                      <img
                        src={post.img_src}
                        alt={`Post ${post.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                      />
                      <div className="absolute inset-0 bg-blue-700/25 opacity-0 transition-opacity duration-500 group-hover/image:opacity-100 flex items-center justify-center pointer-events-none">
                        <LinkIcon className="text-black bg-white rounded-full p-1 lg:p-2 !w-6 !h-6 lg:!w-8 lg:!h-8 transform rotate-45 transition-transform duration-500" />
                      </div>
                    </div>

                    <Text
                      className="w-full flex flex-col gap-2 text-center sm:text-left justify-start text-white/70 transition-colors duration-300 group-hover:text-white"
                      variant="lead"
                    >
                      {post.title}
                      <span className="text-xs text-white/50 transition-colors duration-300 group-hover:text-white">
                        {formatDate(post.date!)}
                      </span>
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-300 italic">No posts found</p>
          )}
        </section>

        <section className="flex-shrink-0">
          <Text className="relative font-bold text-white !text-xl lg:!text-2xl mb-4 border-b border-white/30 pb-1">
            Subsrcribe to RSS Feeds
            <span className="absolute w-[6px] h-[30px] -left-8 top-1.5 bg-white"></span>
          </Text>
          <Text
            className="w-full flex flex-col gap-2 justify-start !text-white/70 "
            variant="lead"
          >
            Get all latest content delivered to your email a few times a month.
          </Text>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 min-w-0"
            />
            <Button
              variant="secondary"
              size="sm"
              className="ml-1 !rounded-sm font-light !bg-cyan-400 !text-black hover:!bg-white flex-shrink-0"
            >
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(SideNavbar);
