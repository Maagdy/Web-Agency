import { Loading } from "../../../components/common/loading";
import { slugify } from "../../../components/Utils";
import { useProductsCategories } from "../../../hooks/ShopPageHooks/useProductsCategories";
import { ShopCategoryCard } from "../components/ShopCategoryCard";

function ShopCategoriesPage() {
  const { categories, error, loading } = useProductsCategories();
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
        <div className="grid sm:grid-cols-2 gap-12 mb-20 grid-cols-1 w-full p-10 ">
          {categories.map((category, index) => (
            <ShopCategoryCard
              key={index}
              imgSrc={categories[index].products[0]?.img_src || ""}
              title={category.name}
              path={slugify(category.name)}
              productCount={category.products.length}
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

export default ShopCategoriesPage;
