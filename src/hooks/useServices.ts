import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, normalizeId } from "@/lib/api";
import type { Service } from "@/lib/type";

const KEY = "services";

const normalize = (s: unknown): Service => normalizeId(s as Service & { _id?: string });

export const useServices = () =>
  useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await api.get<unknown[]>("/services");
      return data.map(normalize);
    },
  });

export const useService = (id: string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await api.get<unknown>(`/services/${id}`);
      return normalize(data);
    },
    enabled: !!id,
  });

type ServicePayload = Omit<Service, "id" | "_id">;

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServicePayload) =>
      api.post<unknown>("/services", payload).then((r) => normalize(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: ServicePayload & { id: string }) =>
      api.put<unknown>(`/services/${id}`, payload).then((r) => normalize(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/services/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
};
