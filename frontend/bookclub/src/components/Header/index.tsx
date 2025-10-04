import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-full">
        <button className="p-2 rounded-md">
          <FiMenu size={24} />
        </button>

        <nav className="flex space-x-4">
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/authors">Authors</NavLink>
        </nav>
      </div>
    </header>
  );
}
