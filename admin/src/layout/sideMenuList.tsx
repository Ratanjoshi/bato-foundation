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
import { GiKnightBanner } from "react-icons/gi";

import { GrServices, GrTechnology } from "react-icons/gr";
import { AiFillPropertySafety } from "react-icons/ai";
import { SiHomepage } from "react-icons/si";
import { FaBlog, FaBriefcase } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { HiNewspaper } from "react-icons/hi";

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
        key: 15.1,
        name: "Career Category",
        path: "/admin/career-category/list",
        icon: <TbLogs />,
      },
      {
        key: 15.2,
        name: "Career",
        path: "/admin/career/list",
        icon: <FaBriefcase />,
      },
      {
        key: 15.3,
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
        key: 7.1,
        name: "Blog Category",
        path: "/admin/blog-category/list",
        icon: <TbLogs />,
      },
      {
        key: 7.2,
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
    name: "Contact",
    icon: <MdOutlineContactPhone />,
    path: "/admin/contact",
  },
  {
    key: 10,
    name: "Subscriber",
    icon: <HiNewspaper />,
    path: "/admin/subscriber",
  },
  {
    key: 11,
    name: "Email Template",
    path: "/admin/email-template/list",
    icon: <MdOutlineMailOutline />,
  },
  {
    key: 12,
    name: "Settings",
    icon: <MdOutlineSettings />,
    menu: [
      {
        key: 12.1,
        name: "Users",
        path: "/admin/auth/list",
        icon: <MdOutlinePerson />,
      },
      {
        key: 12.2,
        name: "Roles",
        path: "/admin/roles/list",
        icon: <MdOutlineFactCheck />,
      },
      {
        key: 12.3,
        name: "Company Settings",
        path: "/admin/settings/list",
        icon: <MdDisplaySettings />,
      },
      {
        key: 12.4,
        name: "Email SMTP",
        path: "/admin/smtp",
        icon: <MdOutlineMailOutline />,
      },
      {
        key: 12.5,
        name: "SEO",
        icon: <RiSeoLine />,
        path: "/admin/seo/list",
      },
      {
        key: 12.6,
        name: "Pages",
        path: "/admin/pages/list",
        icon: <SiHomepage />,
      },
    ],
  },
];
