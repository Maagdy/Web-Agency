import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from "@mui/icons-material/GridView";
import { usePosts } from "../../../hooks/BlogPageHooks/usePosts";
import type { BlogPost } from "../../../hooks/hooks.types";
import { Button } from "../../../components/common";
import { slugify } from "../../../components/Utils";

interface PostNavigationProps {
  post: BlogPost;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ post }) => {
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const { posts } = usePosts(1, 100);

  // Collect all posts in the same category
  const navigationArray = posts
    .filter((p) => p.category === post.category)
    .map((p) => ({ slug: p.slug, title: p.title }));

  // Find current index
  const currentIndex = navigationArray.findIndex(
    (p) => p.slug === (postSlug ?? post.slug)
  );

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
                `/blog/categories/${slugify(post.category ?? "")}/${
                  navigationArray[currentIndex - 1].slug
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
                {navigationArray[currentIndex - 1].title}
              </p>
            </section>
          </section>
        )}
      </div>

      {/* All Posts Button */}
      <div
        className="absolute left-1/2 -translate-x-1/2 
           hidden md:flex items-center justify-center 
           w-10 h-10 sm:w-12 sm:h-12 rounded-md cursor-pointer group"
        onClick={() => navigate("/blog")}
      >
        <GridViewIcon className="text-[var(--mainColor)] text-lg sm:text-xl" />
        <span className="absolute bottom-full mb-1 left-1/2 text-nowrap -translate-x-1/2 rounded-sm text-white bg-cyan-500 text-xs sm:text-base font-bold px-2 sm:px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          All Posts
        </span>
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {showNext && (
          <section
            className="flex group items-center cursor-pointer"
            onClick={() =>
              navigate(
                `/blog/categories/${slugify(post.category ?? "")}/${
                  navigationArray[currentIndex + 1].slug
                }`
              )
            }
          >
            <section className="flex flex-col text-[var(--mainColor)] mr-2 sm:mr-4 text-right">
              <p className="text-sm sm:text-base">Next</p>
              <p className="hidden sm:block font-bold text-base sm:text-xl pl-4 sm:pl-8">
                {navigationArray[currentIndex + 1].title}
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

export default PostNavigation;
