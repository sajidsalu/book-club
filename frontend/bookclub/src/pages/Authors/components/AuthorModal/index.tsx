import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Author } from "@/types/author.type";
import { AuthorFormData, authorSchema } from "../../author.config";

type AuthorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AuthorFormData) => void;
  author?: Author;
};

export default function AuthorModal({
  isOpen,
  onClose,
  onSubmit,
  author,
}: AuthorModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: author?.name || "",
      bio: author?.bio || "",
    },
  });

  useEffect(() => {
    reset({
      name: author?.name || "",
      bio: author?.bio || "",
    });
  }, [author, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {author ? "Edit Author" : "Add Author"}
        </h2>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            onClose();
          })}
          className="flex flex-col space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter name of the author"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Enter brief bio if available"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {author ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
