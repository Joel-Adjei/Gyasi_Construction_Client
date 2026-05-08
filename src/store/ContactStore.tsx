import { create } from "zustand";

import type { SiteSettings } from "@/lib/type";

const initialState: SiteSettings = {
  companyName: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  cloudinaryCloudName: "",
  cloudinaryUploadPreset: "",
};

interface ContactStore {
  data: SiteSettings;
  setData: (data: SiteSettings) => void;
}

const useContactStore = create<ContactStore>()((set) => ({
  data: initialState,
  setData: (data: SiteSettings) => set({ data }),
}));

export default useContactStore;
