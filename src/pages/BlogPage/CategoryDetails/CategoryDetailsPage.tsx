import { useParams } from "react-router-dom";
import { Loading } from "../../../components/common/loading";
import { usePostsByCategory } from "../../../hooks/BlogPageHooks/usePostsByCategory";
import { PostCard } from "../components/PostCard";
import { slugify } from "../../../components/Utils";

function BlogCategoryDetailsPage() {
  const { categoryName } = useParams();
  const { posts, loading } = usePostsByCategory(categoryName ?? null);

  if (!categoryName) {
    return <p className="p-6 text-gray-500">Invalid category.</p>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <Loading
            className="force-main-color !bg-transparent"
            text="Loading Category..."
          />
        </div>
      ) : posts.length > 0 ? (
        // <div className="grid sm:grid-cols-2 gap-12 mt-10 mb-20 p-8 px-20 grid-cols-1">
        <div className="flex flex-col gap-4">
          {posts &&
            posts.map((post) => (
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
      ) : (
        <p className="p-6 text-gray-500 text-6xl text-center">
          No projects found in this category or category does not exist.
        </p>
      )}
    </div>
  );
}

export default BlogCategoryDetailsPage;
