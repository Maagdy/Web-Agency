import { Loading } from "../../../components/common/loading";
import { CategoriesCard } from "../../../components/UI/CategoriesCard";
import { slugify } from "../../../components/Utils";
import { useBlogCategories } from "../../../hooks/BlogPageHooks/useBlogCategories";

function BlogCategoriesPage() {
  const { categories, loading, error } = useBlogCategories();
  console.log(categories);

  return (
    <section className="w-full px-5">
      {loading ? (
        <div className="flex w-full justify-center items-center">
          <Loading
            className="force-main-color !bg-transparent"
            text="Loading Categories..."
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-12 mb-20 grid-cols-1 w-full">
          {categories.map((category, index) => (
            <CategoriesCard
              key={index}
              id={index}
              imgSrc={categories[index].posts[0]?.img_src || ""}
              title={category.name}
              category={category.name}
              path={slugify(category.name)}
              numOfProjects={category.posts.length}
              isPost={true}
            />
          ))}
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center w-full">
          Error loading categories: {error}
        </div>
      )}
    </section>
  );
}

export default BlogCategoriesPage;
