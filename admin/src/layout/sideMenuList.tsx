import {
  MdDisplaySettings,
  MdFeedback,
  MdOutlineContactPhone,
  MdOutlineFactCheck,
  MdOutlineMailOutline,
  MdOutlinePermMedia,
  MdOutlinePerson,
  MdOutlineSettings,
  MdPeopleAlt,
} from "react-icons/md";
import { RiSeoLine } from "react-icons/ri";
import { GiKnightBanner, GiProgression } from "react-icons/gi";

import { GrServices, GrTechnology } from "react-icons/gr";
import { AiFillPropertySafety } from "react-icons/ai";
import { SiHomepage } from "react-icons/si";
import { FaBlog, FaBriefcase } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { HiNewspaper } from "react-icons/hi";
import { Sparkles, Home, Users } from "lucide-react";

export type SideListMenuType = {
  key: number;
  name: string;
  icon: React.ReactNode;
  path?: string;
  menu?: SideListMenuType[];
};

export const SideMenuList: SideListMenuType[] = [
  {
    key: 1,
    name: "Banner",
    path: "/admin/banner/list",
    icon: <GiKnightBanner />,
  },
  {
    key: 2,
    name: "Service",
    path: "/admin/service/list",
    icon: <GrServices />,
  },
  {
    key: 3,
    name: "Portfolio",
    path: "/admin/portfolio/list",
    icon: <AiFillPropertySafety />,
  },
  {
    key: 4,
    name: "Media",
    path: "/admin/media-category/list",
    icon: <MdOutlinePermMedia />,
  },
  {
    key: 5,
    name: "Career Management",
    icon: <FaBriefcase />,
    menu: [
      {
        key: 51,
        name: "Career Category",
        path: "/admin/career-category/list",
        icon: <TbLogs />,
      },
      {
        key: 52,
        name: "Career",
        path: "/admin/career/list",
        icon: <FaBriefcase />,
      },
      {
        key: 53,
        name: "Applicant",
        path: "/admin/applicant/list",
        icon: <MdPeopleAlt />,
      },
    ],
  },
  {
    key: 6,
    name: "Blogs",
    icon: <FaBlog />,
    menu: [
      {
        key: 61,
        name: "Blog Category",
        path: "/admin/blog-category/list",
        icon: <TbLogs />,
      },
      {
        key: 62,
        name: "Blog",
        path: "/admin/blog/list",
        icon: <FaBlog />,
      },
    ],
  },
  {
    key: 7,
    name: "Testimonial",
    path: "/admin/testimonial/list",
    icon: <MdFeedback />,
  },
  {
    key: 8,
    name: "Technology",
    path: "/admin/technology/list",
    icon: <GrTechnology />,
  },
  {
    key: 9,
    name: "BATO Foundation",
    icon: <GiProgression />,
    menu: [
      {
        key: 91,
        name: "BATO Programs",
        path: "/admin/bato-program/list",
        icon: <GiProgression />,
      },
      {
        key: 92,
        name: "Besides Programs",
        path: "/admin/besides-program/list",
        icon: <Sparkles />,
      },
      {
        key: 93,
        name: "Ultimate Dream",
        path: "/admin/ultimate-dream",
        icon: <Sparkles />,
      },
    ],
  },
  // ✅ BATO Home section
  {
    key: 10,
    name: "BATO Home",
    icon: <Home />,
    menu: [
      {
        key: 10.1,
        name: "About Preview",
        path: "/admin/bato-home/about-preview",
        icon: <Sparkles />,
      },
      {
        key: 10.2,
        name: "Partners",
        path: "/admin/bato-home/partners",
        icon: <Users />,
      },
      // 👇 Add future BATO Home items here later (Hero, Mission, Stats, etc.)
    ],
  },
  {
    key: 11,
    name: "Contact",
    icon: <MdOutlineContactPhone />,
    path: "/admin/contact",
  },
  {
    key: 12,
    name: "Subscriber",
    icon: <HiNewspaper />,
    path: "/admin/subscriber",
  },
  {
    key: 13,
    name: "Email Template",
    path: "/admin/email-template/list",
    icon: <MdOutlineMailOutline />,
  },
  {
    key: 14,
    name: "Settings",
    icon: <MdOutlineSettings />,
    menu: [
      {
        key: 141,
        name: "Users",
        path: "/admin/auth/list",
        icon: <MdOutlinePerson />,
      },
      {
        key: 142,
        name: "Roles",
        path: "/admin/roles/list",
        icon: <MdOutlineFactCheck />,
      },
      {
        key: 143,
        name: "Company Settings",
        path: "/admin/settings/list",
        icon: <MdDisplaySettings />,
      },
      {
        key: 144,
        name: "Email SMTP",
        path: "/admin/smtp",
        icon: <MdOutlineMailOutline />,
      },
      {
        key: 145,
        name: "SEO",
        icon: <RiSeoLine />,
        path: "/admin/seo/list",
      },
      {
        key: 146,
        name: "Pages",
        path: "/admin/pages/list",
        icon: <SiHomepage />,
      },
    ],
  },
];
