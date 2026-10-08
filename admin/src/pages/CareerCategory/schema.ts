import { z } from "zod";

export const CareerCategorySchema = z.object({
  name: z.string().min(1, "Name is Required"),
});

export type CareerCategoryFormType = z.infer<typeof CareerCategorySchema>;
