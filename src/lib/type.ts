export interface Service {
  id: string;
  title: string;
  desc: string;
  date?: string;
  featured?: boolean;
  images: string[];
}

export interface SiteSettings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
}
