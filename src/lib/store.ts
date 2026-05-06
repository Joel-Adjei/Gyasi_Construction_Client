import type { Service, SiteSettings } from "./type";

const SERVICES_KEY = "sc_services";
const SETTINGS_KEY = "sc_settings";

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "Commercial Construction",
    desc: "Office towers and retail centers built to spec, on time and within budget.",
    date: "2025-04-12",
    featured: true,
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600"],
  },
  {
    id: "2",
    title: "Industrial Builds",
    desc: "Heavy industrial facilities and warehouses engineered for maximum efficiency.",
    date: "2025-03-22",
    featured: false,
    images: ["https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600"],
  },
  {
    id: "3",
    title: "Infrastructure",
    desc: "Bridges, roads, and civil works engineered to last generations.",
    date: "2025-02-08",
    featured: true,
    images: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600"],
  },
  {
    id: "4",
    title: "Renovation & Retrofit",
    desc: "Modernizing structures with seismic upgrades and sustainable retrofits.",
    date: "2025-01-19",
    featured: false,
    images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600"],
  },
  {
    id: "5",
    title: "Project Management",
    desc: "End-to-end orchestration from blueprint approval to handover keys.",
    date: "2025-01-10",
    featured: false,
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"],
  },
  {
    id: "6",
    title: "Safety & Compliance",
    desc: "OSHA-certified protocols and zero-incident commitment on every site.",
    date: "2024-12-15",
    featured: false,
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600"],
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "SteelCore Construction",
  contactEmail: "info@steelcore.com",
  contactPhone: "+1 (555) 000-0000",
  contactAddress: "123 Steel Avenue, New York, NY 10001",
  cloudinaryCloudName: "",
  cloudinaryUploadPreset: "",
};

export function getServices(): Service[] {
  try {
    const raw = localStorage.getItem(SERVICES_KEY);
    return raw ? (JSON.parse(raw) as Service[]) : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

export function getSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<SiteSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`);
  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}
