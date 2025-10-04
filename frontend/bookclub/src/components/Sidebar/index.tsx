import { FiMenu, FiHome, FiBook } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Authors", icon: <FiHome className="mr-3" />, path: "/authors" },
    { name: "Books", icon: <FiBook className="mr-3" />, path: "/books" },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <div className="md:hidden flex items-start p-2 bg-white shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md transform transition-transform duration-300 z-40
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64`}
      >
        <div className="p-4 font-bold text-xl border-b border-gray-200">
          Book Club
        </div>

        <nav className="mt-4 flex flex-col">
          {menuItems.map((item) => {
            // const isActive = location.pathname === item.path;
            const isActive =
              location.pathname === item.path ||
              (item.path === "/authors" &&
                location.pathname.startsWith("/authors"));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center px-4 py-2 rounded-md transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
