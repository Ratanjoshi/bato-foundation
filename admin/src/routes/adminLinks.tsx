import UserProfile from "@/pages/UserProfile";
import Access from "@/pages/Access";
import EditAccess from "@/pages/Access/EditAccess";
import Dashboard from "@/pages/Dashboard";
import Media from "@/pages/Media";
import MediaImages from "@/pages/Media/mediaImages";
import Roles from "@/pages/Roles";
import Users from "@/pages/Users";
import Department from "@/pages/Department";
import AddEditDepartment from "@/pages/Department/AddEditDepartment";
import Interview from "@/pages/Interview";
import AddEditInterview from "@/pages/Interview/AddEditInterview";
import ApproveRequest from "@/pages/ApproveRequest";
import Seo from "@/pages/Seo";
import Settings from "@/pages/Settings";
import QNA from "@/pages/qna";
import Sort from "@/pages/qna/sort";
import EmailTemplate from "@/pages/EmailTemplate";
import AddEditEmailTemplate from "@/pages/EmailTemplate/AddEditEmailTemplate";
import EmailSmtp from "@/pages/EmailSmtp";
import ActiveEmailTemplate from "@/pages/ActiveEmailTemplate";
import Service from "@/pages/Service";
import Technology from "@/pages/Technology";
import AddEditService from "@/pages/Service/AddEditService";
import AddEditPortfolio from "@/pages/Portfolio/AddEditPortfolio";
import Portfolio from "@/pages/Portfolio";
import AddEditTechnology from "@/pages/Technology/AddEditTechnology";
import Testimonial from "@/pages/Testimonial";
import AddEditTestimonial from "@/pages/Testimonial/AddEditTestimonial";
import Banner from "@/pages/Banner";
import AddEditBanner from "@/pages/Banner/AddEditBanner";
import Pages from "@/pages/Pages";
import AddEditPages from "@/pages/Pages/AddEditPages";
import BlogCategory from "@/pages/BlogCategory";
import AddEditBlogCategory from "@/pages/BlogCategory/AddEditBlog";
import Blog from "@/pages/Blog";
import AddEditBlog from "@/pages/Blog/AddEditBlog";
import Contact from "@/pages/Contact";
import Subscribers from "@/pages/Subscribers";
import CareerCategory from "@/pages/CareerCategory";
import AddEditCareerCategory from "@/pages/CareerCategory/AddEditCareerCategory";
import Career from "@/pages/Career";
import AddEditCareer from "@/pages/Career/AddEditCareer";
import Applicant from "@/pages/Applicant";
export const adminLinks = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth/list",
    element: <Users />,
  },
  {
    path: "/approve-request",
    element: <ApproveRequest />,
  },
  {
    path: "/roles/list",
    element: <Roles />,
  },
  {
    path: "/access",
    element: <Access />,
  },
  {
    path: "/access/:id",
    element: <EditAccess />,
  },
  {
    path: "/media-category/list",
    element: <Media />,
  },
  {
    path: "/media/:id",
    element: <MediaImages />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/department/list",
    element: <Department />,
  },
  {
    path: "/department",
    element: <AddEditDepartment />,
  },
  {
    path: "/department/:id",
    element: <AddEditDepartment />,
  },
  {
    path: "/employee/list",
    element: <Interview />,
  },
  {
    path: "/employee",
    element: <AddEditInterview />,
  },
  {
    path: "/employee/:id",
    element: <AddEditInterview />,
  },
  {
    path: "/seo/list",
    element: <Seo />,
  },
  {
    path: "/settings/list",
    element: <Settings />,
  },
  {
    path: "/faq/list",
    element: <QNA />,
  },
  {
    path: "/faq/sort",
    element: <Sort />,
  },
  {
    path: "/email-template/list",
    element: <EmailTemplate />,
  },
  {
    path: "/email-template/add",
    element: <AddEditEmailTemplate />,
  },
  {
    path: "/email-template/:id",
    element: <AddEditEmailTemplate />,
  },
  {
    path: "/smtp",
    element: <EmailSmtp />,
  },
  {
    path: "/active-email-template",
    element: <ActiveEmailTemplate />,
  },
  {
    path: "/service/list",
    element: <Service />,
  },
  {
    path: "/service",
    element: <AddEditService />,
  },
  {
    path: "/service/:id",
    element: <AddEditService />,
  },
  {
    path: "/portfolio/list",
    element: <Portfolio />,
  },
  {
    path: "/portfolio",
    element: <AddEditPortfolio />,
  },
  {
    path: "/portfolio/:id",
    element: <AddEditPortfolio />,
  },
  {
    path: "/technology/list",
    element: <Technology />,
  },
  {
    path: "/technology",
    element: <AddEditTechnology />,
  },
  {
    path: "/technology/:id",
    element: <AddEditTechnology />,
  },
  {
    path: "/testimonial/:id",
    element: <AddEditTestimonial />,
  },
  {
    path: "/testimonial",
    element: <AddEditTestimonial />,
  },
  {
    path: "/testimonial/list",
    element: <Testimonial />,
  },
  {
    path: "/banner/list",
    element: <Banner />,
  },
  {
    path: "/banner/",
    element: <AddEditBanner />,
  },
  {
    path: "/banner/:id",
    element: <AddEditBanner />,
  },
  {
    path: "/pages/list",
    element: <Pages />,
  },
  {
    path: "/pages/",
    element: <AddEditPages />,
  },
  {
    path: "/pages/:id",
    element: <AddEditPages />,
  },
  {
    path: "/blog-category/list",
    element: <BlogCategory />,
  },
  {
    path: "/blog-category/",
    element: <AddEditBlogCategory />,
  },
  {
    path: "/blog-category/:id",
    element: <AddEditBlogCategory />,
  },
  {
    path: "/blog/list",
    element: <Blog />,
  },
  {
    path: "/blog/",
    element: <AddEditBlog />,
  },
  {
    path: "/blog/:id",
    element: <AddEditBlog />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "Subscriber",
    element: <Subscribers />,
  },
  {
    path: "/career-category/list",
    element: <CareerCategory />,
  },
  {
    path: "/career-category/",
    element: <AddEditCareerCategory />,
  },
  {
    path: "/career-category/:id",
    element: <AddEditCareerCategory />,
  },
  {
    path: "/career/list",
    element: <Career />,
  },
  {
    path: "/career/",
    element: <AddEditCareer />,
  },
  {
    path: "/career/:id",
    element: <AddEditCareer />,
  },
  {
    path: "/applicant/list",
    element: <Applicant />,
  },
];
