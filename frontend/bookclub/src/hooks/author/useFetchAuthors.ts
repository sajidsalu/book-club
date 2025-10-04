// import { Author } from "@/types/author.type";
// import { useFetch } from "../api/useFetch";
// import { API } from "@/constants/api";

// type UseFetchAuthorResult = {
//   authors: Author[] | null;
//   loading: boolean;
//   error: string;
// };

// export function useFetchAuthors(): UseFetchAuthorResult {
//   const { data, loading, error } = useFetch<Author[]>(API.authors);

//   return {
//     authors: data,
//     loading,
//     error,
//   };
// }

import { useQuery } from "@tanstack/react-query";
import api, { queryKeys } from "@/api/api";
import { API } from "@/constants/api";
import { Author } from "@/types/author.type";

export const useFetchAuthors = () => {
  return useQuery<Author[], Error>({
    queryKey: [queryKeys.listAuthors],
    queryFn: async () => {
      const res = await api.get<Author[]>(API.authors);
      return res.data;
    },
    staleTime: 1000 * 60,
    retry: 1,
  });
};
