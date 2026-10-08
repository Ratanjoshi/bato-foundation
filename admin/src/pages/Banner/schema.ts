import { z } from "zod";

export const BannerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  video_url: z.string().nullable().optional(),
  bannerItems: z.array(
    z.object({
      image: z.string().min(1, "Image is Required"),
      caption: z.string().optional(),
      title: z.string().min(1, "Title is Required"),
      subTitle: z.string().min(1, "Sub Title is Required"),
    }),
  ),
});
