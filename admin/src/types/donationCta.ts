export interface DonationCta {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  primary_label: string;
  primary_href: string;
  secondary_label: string;
  secondary_href: string;
  image_url: string;
  image_alt: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  msg?: string;
  message?: string;
}

export interface LoginResponse {
  token: string;
}
