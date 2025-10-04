import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";
import { AuthorFormData } from "@/pages/Authors/author.config";
import { Author } from "@/types/author.type";

type UpdateAuthorPayload = AuthorFormData & { id: number };

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<Author, Error, UpdateAuthorPayload>({
    mutationFn: async ({ id, ...data }) => {
      const res = await api.put<Author>(`${API.authors}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listAuthors] });
    },
    onError: (error) => {
      console.error("Failed to update author:", error.message);
    },
  });
};
