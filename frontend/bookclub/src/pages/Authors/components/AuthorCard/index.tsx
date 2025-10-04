import { Author } from "@/types/author.type";

const AuthorCard = ({
  author,
  onEdit,
  onDelete,
  onClick,
}: {
  author: Author;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-auto min-h-[10rem]"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
        {author?.name?.charAt(0)}
      </div>

      {/* Content */}
      <div className="flex-1 ml-4 flex flex-col justify-between overflow-hidden">
        <div className="overflow-hidden">
          <p className="font-bold text-lg text-gray-800 truncate">
            {author.name}
          </p>
          <p className="text-gray-400 text-sm mt-1 line-clamp-3">
            {author.bio || "No bio available"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-2">
          <button
            className="flex-1 text-blue-600 hover:underline font-medium truncate"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="flex-1 text-red-600 hover:underline font-medium truncate"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
