import { z } from "zod";

export const PagesSchema = z.object({
  title: z.string().min(1, "Name is Required"),
  header_title: z.string().min(1, "Header Title is Required"),
  page_description: z.string().min(1, "Page Description is Required"),
  og_title: z.string().min(1, "OG Title is Required"),
  og_image: z.string().min(1, "OG Image is Required"),
  og_description: z.string().min(1, "OG Description is Required"),
  meta_title: z.string().min(1, "Meta Title is Required"),
  meta_description: z.string().min(1, "Meta Description is Required"),
  meta_keywords: z.array(z.string().optional()),
});

export type PagesFormType = z.infer<typeof PagesSchema>;
