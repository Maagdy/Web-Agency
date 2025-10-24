import { Person, Work, Assignment } from "@mui/icons-material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import {
  about1,
  about2,
  about3,
  clientIMG1,
  clientIMG2,
  clientIMG3,
  clientIMG4,
  clientIMG5,
  clientIMG6,
  clientIMG7,
  clientIMG8,
  drawerIMG1,
  drawerIMG2,
  drawerIMG3,
} from "../../common/assets/images";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";
import type {
  AboutItemButtonProps,
  AboutItemProps,
  ClientCardProps,
  FeaturesItemProps,
} from "./constants.types";

export const aboutItems: AboutItemProps[] = [
  {
    id: 1,
    title: "Who We Are?",
    content:
      "We are a passionate team of creatives, developers, and strategists driven by innovation. Our mission is to help businesses grow by blending technology with design to create impactful digital experiences.",
    image: about1,
    location: "left",
    button: "Meet Our Team",
  },
  {
    id: 2,
    title: "What We Do?",
    content:
      "From web design and development to branding and digital marketing, we craft tailored solutions that align with your business goals. We focus on delivering results-driven strategies that help you stand out online.",
    image: about2,
    location: "right",
    button: "Our Services",
  },
  {
    id: 3,
    title: "What We've Done",
    content:
      "Our portfolio showcases successful collaborations with startups, enterprises, and global brands. Each project reflects our commitment to creativity, functionality, and measurable impact.",
    image: about3,
    location: "left",
    button: "Our Works",
  },
  {
    id: 4,
    title: "Where Are We?",
    content:
      "We’re proudly based in a vibrant tech hub, but our reach is global. With clients across different regions, we thrive on building meaningful partnerships regardless of distance.",
    image: about1,
    location: "right",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627974202195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6e5b9c5b8a6!2sEnvato!5e0!3m2!1sen!2sin!4v1669651234567!5m2!1sen!2sin",
  },
];

export const aboutItemButtons: AboutItemButtonProps[] = [
  { id: 1, title: "Who We Are?", icon: Person },
  { id: 2, title: "What We Do?", icon: Work },
  { id: 3, title: "What We've Done", icon: Assignment },
  { id: 4, title: "Where Are We?", icon: LocationOnSharpIcon },
];

export const featuresItems: FeaturesItemProps[] = [
  { id: 1, title: "Responsive" },
  { id: 2, title: "Fast & Secure" },
  { id: 3, title: "Global Design" },
  { id: 4, title: "Drag & Drop" },
  { id: 5, title: "Full Dynamic" },
  { id: 6, title: "Free Support" },
];

export const developmentItems: FeaturesItemProps[] = [
  { id: 1, title: "iOS & Android" },
  { id: 2, title: "Windows Phone" },
  { id: 3, title: "Fast & Secure" },
  { id: 4, title: "Global Design" },
];

export const iconButtons: AboutItemButtonProps[] = [
  { id: 1, title: "Android", icon: AdbIcon },
  { id: 2, title: "iOS", icon: AppleIcon },
];

export const swiperContent: AboutItemProps[] = [
  {
    id: 1,
    title: "Advisory Website",
    websiteDetails: {
      client: "Some Company Ltd.",
      color: "Dark",
      platform: "WordPress",
      year: "2023",
    },
    image: drawerIMG1,
    location: "left",
  },
  {
    id: 2,
    title: "Industrial Website",
    websiteDetails: {
      client: "Some Company Ltd.",
      color: "Dark blue",
      platform: "React.js",
      year: "2021",
    },
    image: drawerIMG2,
    location: "right",
  },
  {
    id: 3,
    title: "Agency Website",
    websiteDetails: {
      client: "Some Company Ltd.",
      color: "Dark",
      platform: "Next.js",
      year: "2025",
    },
    image: drawerIMG3,
    location: "left",
  },
];

export const clients: ClientCardProps[] = [
  {
    id: 1,
    image: clientIMG1,
  },
  {
    id: 2,
    image: clientIMG2,
  },
  {
    id: 3,
    image: clientIMG3,
  },
  {
    id: 4,
    image: clientIMG4,
  },
  {
    id: 5,
    image: clientIMG5,
  },
  {
    id: 6,
    image: clientIMG6,
  },
  {
    id: 7,
    image: clientIMG7,
  },
  {
    id: 8,

    image: clientIMG8,
  },
];
