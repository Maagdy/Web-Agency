import { slugify } from "../../components/Utils";
import type { FooterItemsProps, NavItem } from "../../components/types/types";
import { blogPostsArr, portfolioProjectsArr } from "./cardsContent";

export const navItems: NavItem[] = [
  { path: "/", label: "HOME" },
  { path: "/about-us", label: "ABOUT" },
  { path: "/services", label: "SERVICES" },

  {
    path: "/blog",
    label: "BLOG",
    submenu: [
      {
        path: "/blog",
        label: "Blog",
      },
      {
        path: "/blog/categories",
        label: "Categories",
      },
      {
        path: "#",
        label: "Single Post",
        submenu: blogPostsArr.map((post) => ({
          path: `/blog/categories/${slugify(post.category ?? "")}/${slugify(
            post.title
          )}`,
          label:
            post.title.slice(0, 20) + (post.title.length > 30 ? "..." : ""),
        })),
      },
    ],
  },

  {
    path: "/portfolio",
    label: "PORTFOLIO",
    submenu: [
      {
        path: "/portfolio",
        label: "Portfolio",
      },
      {
        path: "/portfolio/categories",
        label: "Categories",
      },
      {
        path: "#",
        label: "Single App",
        submenu: portfolioProjectsArr.map((project) => ({
          path: `/portfolio/categories/${slugify(
            project.category ?? ""
          )}/${slugify(project.title)}`,
          label: project.title,
        })),
      },
    ],
  },

  {
    path: "/shop",
    label: "SHOP",
    submenu: [
      {
        path: "/shop",
        label: "All Products",
      },
      {
        path: "/cart",
        label: "Cart",
      },
      {
        path: "/shop/offers",
        label: "Offers",
      },
    ],
  },

  { path: "/contact", label: "CONTACT" },
];

export const footerItems: FooterItemsProps[] = [
  {
    id: 1,
    title: "Useful Links",
    links: [
      { label: "Purchase now", path: "/" },
      { label: "Support", path: "/" },
      { label: "Documentation", path: "/" },
      { label: "Portfolio", path: "/" },
      { label: "Web Design", path: "/" },
      { label: "Xtra Theme", path: "/" },
      { label: "App Download", path: "/" },
    ],
  },
  {
    id: 2,
    title: "Our Pages",
    links: [
      { label: "About Us", path: "/" },
      { label: "Our History", path: "/" },
      { label: "Services", path: "/" },
      { label: "News & Updates", path: "/" },
      { label: "Careers", path: "/" },
      { label: "Terms & Conditions", path: "/" },
      { label: "Contact Us", path: "/" },
    ],
  },
  {
    id: 3,
    title: "Contact US",
    links: [
      { label: "General enquiries", path: "/" },
      { label: "Request a callback", path: "/" },
      { label: "F.A.Q", path: "/" },
      { label: "GET in touch", path: "/" },
      { label: "Popular Events", path: "/" },
      { label: "Rest API", path: "/" },
    ],
  },
];
