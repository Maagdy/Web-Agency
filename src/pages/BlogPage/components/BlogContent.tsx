import { useEffect, useState } from "react";
import { slugify } from "../../../components/Utils";
import { PostCard } from "./PostCard";
import { Button } from "../../../components/common";
import { usePosts } from "../../../hooks/BlogPageHooks/usePosts";
import { Loading } from "../../../components/common/loading";

function BlogContent() {
  const [page, setPage] = useState(1); // 👈 current page state
  const limit = 4; // posts per page

  const { posts, total, loading } = usePosts(page, limit);
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  // 👇 Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  console.log(posts);

  return (
    <div className="flex flex-col gap-6 w-full">
      <>
        {loading ? (
          <Loading
            className="force-main-color !bg-transparent"
            text="Loading Posts..."
          />
        ) : (
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                imgSrc={post.img_src}
                title={post.title}
                date={post.date}
                description={post.description}
                category={post.category}
                path={`/blog/categories/${slugify(post.category ?? "")}/${
                  post.slug
                }`}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && !loading && (
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3 sm:gap-4 mt-6">
            <Button
              variant="primary"
              onClick={handlePrev}
              disabled={page === 1}
              className={` ${
                page === 1
                  ? "pointer-events-none opacity-50"
                  : "pointer-events-auto"
              }`}
            >
              Prev
            </Button>

            <span className="text-sm sm:text-base font-medium text-gray-700">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={page === totalPages}
              className={` ${
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "pointer-events-auto"
              }`}
            >
              Next
            </Button>
          </div>
        )}
      </>
    </div>
  );
}

export default BlogContent;
