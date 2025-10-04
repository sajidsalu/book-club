import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:4000",
});

export default api;

export const queryKeys = {
  listBooks: "list-books",
  listAuthors: "list-authors",
  authorDetails: "author-details",
  authorBooks: "author-books",
};
