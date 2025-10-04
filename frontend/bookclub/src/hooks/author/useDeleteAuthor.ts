import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await api.delete(`${API.authors}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listAuthors] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.listBooks] });
    },
    onError: (error) => {
      console.error("Failed to delete author:", error.message);
    },
  });
};
