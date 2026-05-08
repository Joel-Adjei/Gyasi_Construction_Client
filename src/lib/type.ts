export interface ServiceProcess {
  title: string;
  desc: string;
}

export interface Service {
  _id?: string;
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

export interface Message {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  _id?: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
