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
  MdInfo,
  MdRecordVoiceOver,
  MdTimeline, // ✅ Added icon for Timeline
} from "react-icons/md";
import { RiSeoLine } from "react-icons/ri";
import { GiKnightBanner, GiProgression } from "react-icons/gi";
import { GrServices, GrTechnology } from "react-icons/gr";
import { AiFillPropertySafety } from "react-icons/ai";
import { SiHomepage } from "react-icons/si";
import { FaBlog, FaBriefcase } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { HiNewspaper } from "react-icons/hi";
import { Sparkles, Home, Users, HeartHandshake } from "lucide-react";
import { GiCircuitry } from "react-icons/gi";

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
    name: "program pages",
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
  {
    key: 10,
    name: "BATO Home",
    icon: <Home />,
    menu: [
      {
        key: 101,
        name: "About Preview",
        path: "/admin/bato-home/about-preview",
        icon: <Sparkles />,
      },
      {
        key: 102,
        name: "Partners",
        path: "/admin/bato-home/partners",
        icon: <Users />,
      },
      {
        key: 103,
        name: "What We Do",
        path: "/admin/what-we-do/list",
        icon: <GiCircuitry />,
      },
    ],
  },
  // ✅ ABOUT MENU (Timeline added)
  {
    key: 11,
    name: "About",
    icon: <MdInfo />,
    menu: [
      {
        key: 111,
        name: "Formation",
        path: "/admin/about/formation",
        icon: <Sparkles />,
      },
      {
        key: 112,
        name: "Leadership",
        path: "/admin/about/leadership",
        icon: <MdPeopleAlt />,
      },
      {
        key: 113,
        name: "Director Message",
        path: "/admin/about/director-message",
        icon: <MdRecordVoiceOver />,
      },
      {
        key: 114,
        name: "Timeline", // ✅ NEW
        path: "/admin/about/timeline/list",
        icon: <MdTimeline />,
      },
    ],
  },
  {
    key: 12,
    name: "Contact",
    icon: <MdOutlineContactPhone />,
    path: "/admin/contact",
  },
  {
    key: 13,
    name: "Subscriber",
    icon: <HiNewspaper />,
    path: "/admin/subscriber",
  },
  {
    key: 14,
    name: "Email Template",
    path: "/admin/email-template/list",
    icon: <MdOutlineMailOutline />,
  },
  {
    key: 15,
    name: "Settings",
    icon: <MdOutlineSettings />,
    menu: [
      {
        key: 151,
        name: "Users",
        path: "/admin/auth/list",
        icon: <MdOutlinePerson />,
      },
      {
        key: 152,
        name: "Roles",
        path: "/admin/roles/list",
        icon: <MdOutlineFactCheck />,
      },
      {
        key: 153,
        name: "Company Settings",
        path: "/admin/settings/list",
        icon: <MdDisplaySettings />,
      },
      {
        key: 154,
        name: "Email SMTP",
        path: "/admin/smtp",
        icon: <MdOutlineMailOutline />,
      },
      {
        key: 155,
        name: "SEO",
        icon: <RiSeoLine />,
        path: "/admin/seo/list",
      },
      {
        key: 156,
        name: "Pages",
        path: "/admin/pages/list",
        icon: <SiHomepage />,
      },
    ],
  },
];
