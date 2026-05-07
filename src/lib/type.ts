export interface ServiceProcess {
  title: string;
  desc: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  longDesc?: string;
  category?: string;
  startingPrice?: string;
  duration?: string;
  projectsCompleted?: number;
  features?: string[];
  process?: ServiceProcess[];
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
