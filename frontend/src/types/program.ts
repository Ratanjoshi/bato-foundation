export interface Program {
  id: number;
  slug: string;
  title: string;
  category: string;
  status: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
