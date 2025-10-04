import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";
import { Book, BookFormData } from "@/types/book.type";

type UpdateBookPayload = BookFormData & { id: number };

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, UpdateBookPayload>({
    mutationFn: async ({ id, ...data }) => {
      const res = await api.put<Book>(`${API.books}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate book list query so updated book is refetched
      queryClient.invalidateQueries({ queryKey: [queryKeys.listBooks] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.authorBooks] });
    },
    onError: (error) => {
      console.error("Failed to update book:", error.message);
    },
  });
};
