export interface WhatWeDoItem {
  id: number;
  icon: string;
  title: string;
  slug: string;
  desc: string;
  points: string[];
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type WhatWeDoFormValues = Omit<
  WhatWeDoItem,
  "id" | "slug" | "createdAt" | "updatedAt"
>;
