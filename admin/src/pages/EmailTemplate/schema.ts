import { z } from "zod";

export const EmailTemplateSchema = z.object({
  templateName: z.string().min(1, "Template Name is Required"),
  templateKey: z.string().min(1, "Template Key is Required"),
  information: z.string().min(1, "Information is Required"),
  variables: z.union([
    z.string().min(1, "Port is Required"),
    z.array(z.string()).optional(),
  ]),
  from: z.string().min(1, "From is Required"),
  subject: z.string().min(1, "Subject is Required"),
  alternateText: z.string().min(1, "Alternative Text is Required"),
  body: z.string().min(1, "Body is Required"),
});
