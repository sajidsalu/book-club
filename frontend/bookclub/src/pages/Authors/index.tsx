import { AddButton } from "@/components/Button";
import AuthorCard from "./components/AuthorCard";
import { useFetchAuthors } from "@/hooks/author/useFetchAuthors";
import { useToggleModal } from "@/hooks";
import AuthorModal from "./components/AuthorModal";
import { useState } from "react";
import { Author } from "@/types/author.type";
import { useAddAuthor } from "@/hooks/author/useSaveAuthor";
import { AuthorFormData } from "./author.types";
import { useUpdateAuthor } from "@/hooks/author/useUpdateAuthor";
import { useDeleteAuthor } from "@/hooks/author/useDeleteAuthor";
import { showInfoToast, showSucessToast } from "@/utils/toastUtils";
import { useNavigate } from "react-router-dom";

export default function Authors() {
  const navigate = useNavigate();

  const { data: authors, isLoading: loading, error } = useFetchAuthors();
  const { isOpen, open: openModal, close: closeModal } = useToggleModal();
  const { mutateAsync: saveAuthor } = useAddAuthor();
  const { mutateAsync: updateAuthor } = useUpdateAuthor();
  const { mutateAsync: deleteAuthor } = useDeleteAuthor();

  const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(
    undefined
  );

  const handleNavigateToDetails = (id: number) => {
    navigate(`/authors/${id}/books`);
  };

  const handleClick = () => {
    setSelectedAuthor(undefined);
    openModal();
  };

  const handleEditClick = (author: Author) => {
    setSelectedAuthor(author);
    openModal();
  };

  const handleDeleteAuthor = (id: number) => {
    deleteAuthor(id);
    showSucessToast("Author has been removed successfully.");
    showInfoToast(
      "Note: Books associated with this author will be removed automatically"
    );
  };

  const saveAuthorDetails = async (data: AuthorFormData) => {
    if (selectedAuthor) {
      await updateAuthor({
        id: selectedAuthor.id,
        name: data?.name,
        bio: data?.bio,
      });
      showInfoToast("Changes are saved successfully.");
    } else {
      await saveAuthor({
        name: data?.name,
        bio: data?.bio,
      });
      showSucessToast("New author has been saved successfully.");
    }
    closeModal();
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error?.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-xl font-normal">
          Authors : showing <span className="font-bold">{authors?.length}</span>{" "}
          authors
        </h1>

        <AddButton label="Add Author" onClick={handleClick} />
      </div>

      {authors?.length === 0 ? (
        <p>No author found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors?.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              onEdit={() => handleEditClick(author)}
              onDelete={() => handleDeleteAuthor(author.id)}
              onClick={() => handleNavigateToDetails(author.id)}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <AuthorModal
          isOpen={isOpen}
          onClose={closeModal}
          author={selectedAuthor}
          onSubmit={saveAuthorDetails}
        />
      )}
    </div>
  );
}
