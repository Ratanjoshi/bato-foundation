import { z } from "zod";

export const PortfolioInfoSchema = z.object({
  serviceId: z.coerce.number(),
  title: z.string().min(1, "Title is required"),
  introduction: z.string().min(1, "Introduction is required"),
  portfolioLogo: z.string().min(1, "Portfolio logo is required"),
  product_description: z.string().min(1, "Product description is required"),
  core_tech_img: z.array(z.string()).optional(),
  projectUrl: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().url("Enter valid URL").nullable().optional(),
  ),
  portfolioImages: z.array(z.string().min(1)),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug is required and must be in proper format",
    ),
});

export const ProjectDetailSchema = z.object({
  projectRequirement: z.object({
    title: z.string().min(1, "Project requirement title is required"),
    requirements: z.array(z.string().min(1)),
  }),
  business_challenges: z.string().min(1, "Business challenges are required"),
  solutions: z.string().min(1, "Solutions are required"),
  desktop_view_url: z.string().min(1, "desktop is required"),
  mobile_view_url: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  tablet_view_url: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
});

export const SeoSchema = z.object({
  seo_keywords: z.array(z.string()).optional(),
  seo_description: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
});

export const PortfolioFormSchema = z.object({
  ...PortfolioInfoSchema.shape,
  ...ProjectDetailSchema.shape,
  ...SeoSchema.shape,
});

export type PortfolioInfoFormType = keyof typeof PortfolioInfoSchema.shape;

export type ProjectDetailFormType = keyof typeof ProjectDetailSchema.shape;

export type PortfolioFormType = z.infer<typeof PortfolioFormSchema>;
