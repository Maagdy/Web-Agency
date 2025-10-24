import { Outlet } from "react-router-dom";
import SideNavbar from "./components/SideNavbar";
import PageBackground from "../../components/UI/PageBackground";
import { useBlogCategories } from "../../hooks/BlogPageHooks/useBlogCategories";
import { useProjects } from "../../hooks/PortfolioPageHooks/useProjects";
import { usePosts } from "../../hooks/BlogPageHooks/usePosts";

function BlogLayout() {
  const { categories } = useBlogCategories();
  const { projects, error: projectsError } = useProjects();
  const { posts } = usePosts(1, 3);

  if (projectsError) {
    return (
      <div className="text-red-500 text-center w-full">
        Error loading projects: {projectsError}
      </div>
    );
  }

  return (
    <>
      <PageBackground />
      <div className="flex bg-gray-100 flex-col-reverse lg:flex-row-reverse lg:p-15 px-6 py-12 gap-6 ">
        <SideNavbar categories={categories} projects={projects} posts={posts} />
        <Outlet />
      </div>
    </>
  );
}
export default BlogLayout;
