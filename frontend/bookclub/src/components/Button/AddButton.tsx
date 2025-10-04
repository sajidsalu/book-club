import { FiPlus } from "react-icons/fi";

type AddButtonProps = {
  label: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const AddButton = ({
  label,
  icon,
  className,
  onClick,
}: AddButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`flex items-center space-x-2 px-4 py-2 border border-gray-400 text-gray-700 hover:bg-gray-50 rounded-md transition text-sm ${
      className ?? ""
    }`}
    onClick={onClick}
  >
    {icon ?? <FiPlus size={18} className="text-gray-600" />}
    <span>{label}</span>
  </button>
);

export default AddButton;
