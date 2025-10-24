import { slugify } from "../../../components/Utils";
import { Loading } from "../../../components/common/loading";
import { useRelatedPosts } from "../../../hooks/BlogPageHooks/useRelatedPosts";
import { PostCard } from "./PostCard";

export default function RelatedPosts({
  category,
  excludeId,
}: {
  category: string;
  excludeId?: number;
}) {
  const { related, loading } = useRelatedPosts(category, excludeId);

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-cyan-400 py-10 px-6 sm:px-12 flex flex-col">
      {/* Title */}
      <section className="flex">
        <h1 className="relative text-2xl sm:text-3xl text-white font-semibold">
          Related Posts ...
          <span className="h-10 sm:h-12 w-1.5 bg-white absolute -left-6 sm:-left-12 top-0"></span>
        </h1>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
        {loading ? (
          <div className="col-span-3 flex justify-center">
            <Loading className="!bg-transparent" text="Loading Posts..." />
          </div>
        ) : related.length > 0 ? (
          related.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              imgSrc={post.img_src}
              path={`/blog/categories/${slugify(post.category ?? "")}/${
                post.slug
              }`}
              title={post.title}
              category={post.category}
              related
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-white">
            No related posts found.
          </p>
        )}
      </section>
    </div>
  );
}
