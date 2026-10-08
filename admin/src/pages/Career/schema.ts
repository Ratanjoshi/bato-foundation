import { z } from "zod";

export const CareerSchema = z.object({
  title: z.string().min(1, "Name is Required"),
  no_of_opening: z.number().min(1, "Opening must be more than 0"),
  description: z.string().min(1, "Description is Required"),
  specification: z.string().min(1, "Specification is Required"),
  location: z.string().min(1, "Location is Required"),
  type: z.string().min(1, "Type is Required"),
  categoryId: z.union([z.number(), z.string()]),
  is_published: z.boolean(),
  meta_description: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  meta_keywords: z
    .array(z.string())
    .nullable()
    .optional()
    .transform((val) => (Array.isArray(val) && val.length === 0 ? null : val)),
});

export type CareerFormType = z.infer<typeof CareerSchema>;
