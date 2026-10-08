import { z } from "zod";

export const QnaFormSchema = z.object({
  question: z.string().min(1, "Question is Required"),
  answer: z.string().min(1, "Answer is Required"),
  pathName: z.string().min(1, "Link is Required"),
  pathLink: z.string().min(1, "Link Url is Required"),
  header: z.string().min(1, "Header is Required"),
  order: z.union([z.number(), z.string()]),
});
