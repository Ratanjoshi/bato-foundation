import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, "Name is Required"),
  author: z.string().min(1, "Author is Required"),
  description: z.string().min(1, "Description is Required"),
  summary: z.string().min(1, "Summary is Required"),
  image: z.string().min(1, "Image is Required"),
  blogCategoryId: z.union([z.number(), z.string()]),
  meta_description: z.string().optional(),
  meta_keywords: z.array(z.string()).optional(),
});

export type BlogFormType = z.infer<typeof BlogSchema>;
