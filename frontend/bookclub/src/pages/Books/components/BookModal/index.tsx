import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, BookFormData } from "@/types/book.type";
import { bookSchema } from "../../books.config";
import { Author } from "@/types/author.type";

type BookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookFormData) => void;
  authors?: Author[];
  book?: Book;
};

export default function BookModal({
  isOpen,
  onClose,
  onSubmit,
  book,
  authors,
}: BookModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || "",
      description: book?.description || "",
      authorId: Number(book?.author?.id) || 0,
    },
  });

  useEffect(() => {
    reset({
      title: book?.title || "",
      description: book?.description || "",
      authorId: Number(book?.author.id) || 0,
    });
  }, [book, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {book ? "Edit Book" : "Add Book"}
        </h2>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            onClose();
          })}
          className="flex flex-col space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter book title"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Enter a brief description about the book"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            {authors?.length === 0 ? (
              <>
                <p>no authors...</p>
                <p>please add an author to proceed.</p>
              </>
            ) : (
              <select
                {...register("authorId", { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option selected value={-1}>
                  Select Author
                </option>
                {authors?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            )}
            {errors.authorId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.authorId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              disabled={authors?.length === 0}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {book ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
