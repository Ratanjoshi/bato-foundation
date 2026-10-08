import { z } from "zod";

export const OverviewSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  name: z.string().min(1, "Name is Required"),
  img_path: z.string().min(1, "Service image is required"),
  description: z.string().min(1, "Description is Required"),
  summary: z.string().min(1, "OG Description is Required"),
});

export const TechInfoSchema = z.object({
  techStack: z
    .array(
      z.object({
        title: z.string().min(1, "Title cannot be empty"),
        choosed: z
          .array(z.union([z.string(), z.number()]))
          .nonempty("technologies cannnot be empty"),
      }),
    )
    .nonempty("TechStack cannot be empty"),

  useCases: z
    .array(
      z.object({
        title: z.string().min(1, "Title cannot be empty"),
        description: z.string().min(1, "description cannot be empty"),
        img_path: z.string().min(1, "Icon cannot be empty"),
      }),
    )
    .nonempty("useCases cannot be empty"),
});

export const SeoSchema = z.object({
  seo_keywords: z.array(z.string()).optional(),
  seo_description: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
});

export const ServiceFormSchema = z.object({
  ...OverviewSchema.shape,
  ...TechInfoSchema.shape,
  ...SeoSchema.shape,
});

export type OverviewFormType = keyof typeof OverviewSchema.shape;

export type TechInfoFormType = keyof typeof TechInfoSchema.shape;

export type ServiceFormType = z.infer<typeof ServiceFormSchema>;
