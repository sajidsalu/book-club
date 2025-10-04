import { AddButton } from "@/components/Button";
import { useFetchBooks } from "@/hooks/books/useFetchBooks";
import { BookCard } from "./components/BookCard";
import { useToggleModal } from "@/hooks";
import BookModal from "./components/BookModal";
import { useState } from "react";
import { Book, BookFormData } from "@/types/book.type";
import { useFetchAuthors } from "@/hooks/author/useFetchAuthors";
import { useSaveBook } from "@/hooks/books/useSaveBook";
import { useUpdateBook } from "@/hooks/books/useUpdateBook";
import { useDeleteBook } from "@/hooks/books/useDeleteBook";
import { showInfoToast, showSucessToast } from "@/utils/toastUtils";

export default function Books() {
  const { data: books, isLoading: loading, error } = useFetchBooks();
  const { isOpen, open: openModal, close: closeModal } = useToggleModal();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  const { data: authors } = useFetchAuthors();

  const { mutateAsync: saveBook } = useSaveBook();
  const { mutateAsync: updateBook } = useUpdateBook();

  const { mutateAsync: deleteBook } = useDeleteBook();

  const handleDeleteBook = async (book: Book) => {
    await deleteBook(book.id);
    showSucessToast("Book has been removed successfully.");
  };

  const handleClick = () => {
    setSelectedBook(undefined);
    openModal();
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    openModal();
  };

  const handleSaveBook = async (data: BookFormData) => {
    if (selectedBook) {
      await updateBook({
        authorId: data?.authorId,
        title: data?.title,
        publishedYear: 2025,
        id: selectedBook?.id,
      });
      showInfoToast("Changes are saved successfully.");
    } else {
      await saveBook({
        authorId: data?.authorId,
        title: data?.title,
        publishedYear: 2025,
      });
      showSucessToast("New book has been saved successfully.");
    }
    closeModal();
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error?.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8">
      {/* Header and Add Button Section */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-xl font-normal">
          Books : showing <span className="font-bold">{books?.length}</span>{" "}
          books
        </h1>

        <AddButton label="Add New Book" onClick={handleClick} />
      </div>

      {/* Book Grid */}
      {books?.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => handleEditClick(book)}
              onDelete={() => handleDeleteBook(book)}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <BookModal
          isOpen={isOpen}
          book={selectedBook}
          onClose={closeModal}
          authors={authors}
          onSubmit={handleSaveBook}
        />
      )}
    </div>
  );
}
