import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/Utils/ScrollToTop";
import { Loading } from "./components/common/loading";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { initUser } from "./redux/slices/auth/authSlice";
import { useAppSelector } from "./redux/hooks";
import { loadCart } from "./redux/slices/ProductSlices/cartSlices/cartSlice";
import FloatingCartButton from "./components/UI/FloatingCartButton";

const Layout = lazy(() => import("./pages/Layout"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

const BlogModule = {
  Layout: lazy(() => import("./pages/BlogPage/BlogLayout")),
  Page: lazy(() => import("./pages/BlogPage/BlogPage")),
  Categories: lazy(
    () => import("./pages/BlogPage/BlogCategories/BlogCategoriesPage")
  ),
  CategoryDetails: lazy(
    () => import("./pages/BlogPage/CategoryDetails/CategoryDetailsPage")
  ),
  PostDetails: lazy(
    () => import("./pages/BlogPage/PostDetails/PostDetailsPage")
  ),
};

const PortfolioModule = {
  Layout: lazy(() => import("./pages/Portfolio/PortfolioLayout")),
  Page: lazy(() => import("./pages/Portfolio/PortfolioPage")),
  Categories: lazy(
    () =>
      import("./pages/Portfolio/PortfolioCategories/PortfolioCategoriesPage")
  ),
  CategoryDetails: lazy(
    () => import("./pages/Portfolio/CategoryDetails/CategoryDetailsPage")
  ),
  ProjectDetails: lazy(
    () => import("./pages/Portfolio/ProjectDetails/ProjectDetailsPage")
  ),
};

const AuthModule = {
  Auth: lazy(() => import("./pages/AuthPage/AuthPage")),
  Account: lazy(() => import("./pages/AuthPage/AccountPage")),
};

const MainPages = {
  Home: lazy(() => import("./pages/HomePage/HomePage")),
  About: lazy(() => import("./pages/AboutPage/AboutPage")),
  Services: lazy(() => import("./pages/ServicesPage/ServicesPage")),
};

const ShopModule = {
  Layout: lazy(() => import("./pages/ShopPage/ShopLayout")),
  Shop: lazy(() => import("./pages/ShopPage/ShopPage")),
  ShopCategories: lazy(
    () => import("./pages/ShopPage/ShopCategories/ShopCategoriesPage")
  ),
  CategoryDetails: lazy(
    () => import("./pages/ShopPage/CategoryDetails/CategoryDetailsPage")
  ),
  ProductDetails: lazy(
    () => import("./pages/ShopPage/ProductDetails/ProductDetailsPage")
  ),
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPages.Home /> },
      { path: "/about-us", element: <MainPages.About /> },
      { path: "/services", element: <MainPages.Services /> },

      {
        path: "/blog",
        element: <BlogModule.Layout />,
        children: [
          { index: true, element: <BlogModule.Page /> },
          { path: "categories", element: <BlogModule.Categories /> },
          {
            path: "categories/:categoryName",
            element: <BlogModule.CategoryDetails />,
          },
          {
            path: "categories/:categoryName/:slug",
            element: <BlogModule.PostDetails />,
          },
        ],
      },

      {
        path: "/portfolio",
        element: <PortfolioModule.Layout />,
        children: [
          { index: true, element: <PortfolioModule.Page /> },
          {
            path: "/portfolio/categories",
            element: <PortfolioModule.Categories />,
          },
          {
            path: "/portfolio/categories/:categoryName",
            element: <PortfolioModule.CategoryDetails />,
          },
          {
            path: "/portfolio/categories/:categoryName/:projectName",
            element: <PortfolioModule.ProjectDetails />,
          },
        ],
      },
      {
        path: "/shop",
        element: <ShopModule.Layout />,
        children: [
          { index: true, element: <ShopModule.Shop /> },
          {
            path: "/shop/categories",
            element: <ShopModule.ShopCategories />,
          },
          {
            path: "/shop/categories/:categoryName",
            element: <ShopModule.CategoryDetails />,
          },
          {
            path: "/shop/categories/:categoryName/:productName",
            element: <ShopModule.ProductDetails />,
          },
        ],
      },

      { path: "/auth", element: <AuthModule.Auth /> },
      { path: "/my-account", element: <AuthModule.Account /> },

      { path: "/shop", element: <div>Our Shop</div> },
      { path: "/contact", element: <div>Contact Us</div> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(initUser());
    if (user?.id) {
      dispatch(loadCart(user.id));
    }
  }, [dispatch, user]);
  return (
    <Suspense
      fallback={<Loading fullScreen size="lg" text="Loading page..." />}
    >
      <RouterProvider router={router} />
      <FloatingCartButton />
    </Suspense>
  );
}
export default App;
