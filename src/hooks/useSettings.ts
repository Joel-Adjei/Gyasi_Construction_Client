import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SiteSettings } from "@/lib/type";

const KEY = "settings";

export const useSettings = () =>
  useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await api.get<SiteSettings>("/settings");
      return data;
    },
  });

export const useUpdateSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SiteSettings>) =>
      api.patch<SiteSettings>("/settings", payload).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData([KEY], data);
    },
  });
};
