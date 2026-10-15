// admin/src/pages/WhatWeDo/types.ts
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

export interface WhatWeDoFormValues {
  title: string;
  desc: string;
  icon: string;
  points: string[]; // array of bullet strings
  isActive: boolean;
  image: File | null; // new upload
  existingImage: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
