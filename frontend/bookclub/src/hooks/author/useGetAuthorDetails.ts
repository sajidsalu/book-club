import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { API } from "@/constants/api";
import { queryKeys } from "@/api/api";
import { Author } from "@/types/author.type";

export const useAuthorDetails = (id: number | string) => {
  return useQuery<Author, Error>({
    queryKey: [queryKeys.authorDetails, id],
    queryFn: async () => {
      const res = await api.get<Author>(`${API.authors}/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
};
