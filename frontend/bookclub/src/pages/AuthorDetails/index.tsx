import { useAuthorDetails } from "@/hooks/author/useGetAuthorDetails";
import { useGetBooksByAuthor } from "@/hooks/author/useGetBooksByAuthor";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthorDetails() {
  const navigate = useNavigate();

  const { id = "" } = useParams<{ id: string }>();

  const { data: author, isLoading, error } = useAuthorDetails(id);
  const { data: books } = useGetBooksByAuthor(id);

  console.log("books", books);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load author.</p>;
  }

  if (!author) {
    return <p className="text-center py-10">Author not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        &larr; Go Back
      </button>

      {/* Author Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{author.name}</h1>{" "}
        <p className="text-lg opacity-90">
          {author.bio || "No bio available."}
        </p>
      </div>
      {/* Books Section */}

      {!books || books?.length === 0 ? (
        <p className="text-gray-600">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-2xl font-semibold mb-6">
            Books by {author.name}
          </h2>
          {books?.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-3">
                {book.description || "No description available."}
              </p>
              {book.publishedYear && (
                <span className="inline-block text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  Published: {book.publishedYear}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
