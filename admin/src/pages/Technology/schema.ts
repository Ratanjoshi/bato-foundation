import { z } from "zod";

export const TechnologyFormSchema = z.object({
  name: z.string().min(1, "Title is Required"),
  image: z.string().min(1, "Image is required"),
});
