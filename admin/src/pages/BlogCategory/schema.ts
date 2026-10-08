import { z } from "zod";

export const BlogCategorySchema = z.object({
  name: z.string().min(1, "Name is Required"),
});

export type BlogCategoryFormType = z.infer<typeof BlogCategorySchema>;
