import { useQuery } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { Book } from "@/types/book.type";
import { API } from "@/constants/api";

export const useFetchBooks = () => {
  return useQuery<Book[], Error>({
    queryKey: [queryKeys.listBooks],
    queryFn: async () => {
      const res = await api.get<Book[]>(API.books);
      return res.data;
    },
    staleTime: 1000 * 60,
    retry: 1,
  });
};
