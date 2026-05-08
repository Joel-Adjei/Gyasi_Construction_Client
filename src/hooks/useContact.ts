import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const useContact = () =>
  useMutation({
    mutationFn: (payload: ContactPayload) =>
      api.post<{ success: boolean; message: string }>("/contact", payload).then((r) => r.data),
  });
