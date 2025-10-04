import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { API } from "@/constants/api";
import { queryKeys } from "@/api/api";

export type Book = {
  id: number;
  title: string;
  description?: string;
  publishedYear?: number;
  authorId: number;
};

export const useGetBooksByAuthor = (authorId: number | string) => {
  return useQuery<Book[], Error>({
    queryKey: [queryKeys.authorBooks, authorId],
    queryFn: async () => {
      const res = await api.get<Book[]>(`${API.books}/list/${authorId}`);
      return res.data;
    },
    staleTime: 1000 * 60,
    enabled: !!authorId, // only run if authorId exists
  });
};
