import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";
import { Book, BookFormData } from "@/types/book.type";

export const useSaveBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, BookFormData>({
    mutationFn: async (data: BookFormData) => {
      const res = await api.post<Book>(API.books, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listBooks] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.authorBooks] });
    },
    onError: (error) => {
      console.error("Failed to add book:", error.message);
    },
  });
};
