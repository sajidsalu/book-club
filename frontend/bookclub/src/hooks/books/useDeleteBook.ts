import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await api.delete(`${API.books}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listBooks] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.authorBooks] });
    },
    onError: (error) => {
      console.error("Failed to delete book:", error.message);
    },
  });
};
