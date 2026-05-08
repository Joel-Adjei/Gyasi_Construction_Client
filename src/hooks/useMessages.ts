import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, normalizeId } from "@/lib/api";
import type { Message } from "@/lib/type";

const KEY = "messages";

const normalize = (m: unknown): Message => normalizeId(m as Message & { _id?: string });

export const useMessages = () =>
  useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await api.get<unknown[]>("/messages");
      return data.map(normalize);
    },
  });

export const useMarkMessageRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.patch<unknown>(`/messages/${id}/read`).then((r) => normalize(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/messages/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
};
