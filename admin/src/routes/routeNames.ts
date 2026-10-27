export const USER_LIST_ROUTE = "/admin/auth/list";
export const USER_ADD_ROUTE = "/admin/auth/";

export const ROLE_LIST_ROUTE = "/admin/roles/list";
export const ROLE_ADD_ROUTE = "/admin/roles/";

export const DEPARTMENT_LIST_ROUTE = "/admin/department/list";
export const DEPARTMENT_ADD_ROUTE = "/admin/department/";

export const EMPLOYEE_LIST_ROUTE = "/admin/employee/list";
export const EMPLOYEE_ADD_ROUTE = "/admin/employee/";

export const MEDIA_CATEGORY_LIST_ROUTE = "/admin/media-category/list";
export const MEDIA_LIST_ROUTE = "/admin/media/";

export const SEO_LIST_ROUTE = "/admin/seo/list";
export const SETTINGS_ROUTE = "/admin/settings/list";
export const QNA_ROUTE = "/admin/faq";

export const EMAIL_TEMPLATE_LIST_ROUTE = "/admin/email-template/list";
export const EMAIL_TEMPLATE_ADD_ROUTE = "/admin/email-template/";

export const EMAIL_SMTP_ROUTE = "/admin/smtp";
export const ACTIVE_EMAIL_TEMPLATE_ROUTE = "/admin/active-email-template";

export const SERVICE_LIST_ROUTE = "/admin/service/list";
export const SERVICE_ADD_ROUTE = "/admin/service/";

export const PORTFOLIO_LIST_ROUTE = "/admin/portfolio/list";
export const PORTFOLIO_ADD_ROUTE = "/admin/portfolio/";

export const TECHNOLOGY_LIST_ROUTE = "/admin/technology/list";
export const TECHNOLOGY_ADD_ROUTE = "/admin/technology/";

export const TESTIMONIAL_ADD_ROUTE = "/admin/testimonial/";
export const TESTIMONIAL_LIST_ROUTE = "/admin/testimonial/list";

export const BANNER_LIST_ROUTE = "/admin/banner/list";
export const BANNER_ADD_ROUTE = "/admin/banner/";

export const PAGES_LIST_ROUTE = "/admin/pages/list";
export const PAGES_ADD_ROUTE = "/admin/pages/";

export const BLOG_CATEGORY_LIST_ROUTE = "/admin/blog-category/list";
export const BLOG_CATEGORY_ADD_ROUTE = "/admin/blog-category/";

export const BLOG_LIST_ROUTE = "/admin/blog/list";
export const BLOG_ADD_ROUTE = "/admin/blog/";

export const SUBSCRIBERS_LIST_ROUTE = "/admin/subscriber";
export const CONTACT_LIST_ROUTE = "/admin/contact";

export const CAREER_CATEGORY_LIST_ROUTE = "/admin/career-category/list";
export const CAREER_CATEGORY_ADD_ROUTE = "/admin/career-category/";

export const CAREER_LIST_ROUTE = "/admin/career/list";
export const CAREER_ADD_ROUTE = "/admin/career/";

export const APPLICANT_LIST_ROUTE = "/admin/applicant/list";
export const APPLICANT_ADD_ROUTE = "/admin/applicant";

export const BATO_PROGRAM_LIST_ROUTE = "/admin/bato-program/list";
export const BATO_PROGRAM_ADD_ROUTE = "/admin/bato-program/";

export const BESIDES_PROGRAM_LIST_ROUTE = "/admin/besides-program/list";
export const BESIDES_PROGRAM_ADD_ROUTE = "/admin/besides-program/";

export const ULTIMATE_DREAM_ROUTE = "/admin/ultimate-dream";
export const ABOUT_PREVIEW_ROUTE = "/admin/bato-home/about-preview";
export const PARTNERS_LIST_ROUTE = "/admin/bato-home/partners";

// ✅ Fixed: was missing /admin prefix
export const WHAT_WE_DO_LIST_ROUTE = "/admin/what-we-do/list";
export const WHAT_WE_DO_ADD_ROUTE = "/admin/what-we-do";
export const WHAT_WE_DO_EDIT_ROUTE = "/admin/what-we-do/:id";

// ✅ NEW: Donation CTA
export const DONATION_CTA_ROUTE = "/admin/donation-cta";

export const ABOUT_FORMATION_ROUTE = "/admin/about/formation";
export const ABOUT_DIRECTOR_MESSAGE_ROUTE = "/admin/about/director-message"; // ✅ NEW

export const LEADERSHIP_LIST_ROUTE = "/admin/about/leadership";
export const LEADERSHIP_ADD_ROUTE = "/admin/about/leadership/add";
export const LEADERSHIP_EDIT_ROUTE = (id: string | number) =>
  `/admin/about/leadership/${id}`;

// ✅ NEW: Timeline Routes (Inside About)
export const TIMELINE_LIST_ROUTE = "/admin/about/timeline/list";
export const TIMELINE_ADD_ROUTE = "/admin/about/timeline/";
export const TIMELINE_EDIT_ROUTE = (id: string | number) =>
  `/admin/about/timeline/${id}`;
