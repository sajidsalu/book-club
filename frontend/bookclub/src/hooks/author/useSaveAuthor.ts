import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";
import { Author } from "@/types/author.type";
import { AuthorFormData } from "@/pages/Authors/author.config";

export const useAddAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<Author, Error, AuthorFormData>({
    mutationFn: async (data: AuthorFormData) => {
      const res = await api.post<Author>(API.authors, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listAuthors] });
      // Or optionally, append directly:
      // queryClient.setQueryData<Author[]>([queryKeys.listAuthors], (old) => old ? [...old, newAuthor] : [newAuthor]);
    },
    onError: (error) => {
      console.error("Failed to add author:", error.message);
    },
  });
};
