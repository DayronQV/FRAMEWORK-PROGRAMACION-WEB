import { Link } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onNavigate: () => void;
}

const menuItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  },
  {
    to: "/catalogo",
    label: "Catálogo",
    icon: "M4 3h6a2 2 0 0 1 2 2v16a3 3 0 0 0-3-3H3V3h1Z M20 3h-6a2 2 0 0 0-2 2v16a3 3 0 0 1 3-3h6V3h-1Z",
  },
  {
    to: "/mi-red",
    label: "Mi Red",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
];

const Sidebar = ({ isCollapsed, onNavigate }: SidebarProps) => {
  return (
    <aside
      id="sidebar"
      className={`${
        isCollapsed
          ? "-translate-x-full lg:w-20"
          : "translate-x-0 lg:w-64"
      } fixed inset-y-0 left-0 z-40 flex w-64 max-w-full shrink-0 flex-col overflow-y-auto bg-blue-400 text-white transition-[transform,width] duration-200 lg:static lg:translate-x-0 motion-reduce:transition-none`}
    >
      <div className="flex min-h-20 shrink-0 items-center justify-center gap-2 border-b border-slate-700 px-2">
        {isCollapsed ? (
          <svg
            role="img"
            aria-label="MultiCatálogo"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-7 w-7"
          >
            <path
              d="M4 7h16v14H4z M8 7V5a4 4 0 0 1 8 0v2"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <>
            <span className="text-xl font-bold lg:text-2xl">MultiCatálogo</span>
            <button
              type="button"
              onClick={onNavigate}
              aria-label="Contraer menú lateral"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-blue-500 focus-visible:outline-2 lg:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="m6 6 12 12M6 18 18 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <nav aria-label="Menú principal" className="flex-1 space-y-2 p-4">
        {menuItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-label={label}
            title={isCollapsed ? label : undefined}
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } rounded p-3 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-indigo-400`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 shrink-0"
            >
              <path d={icon} />
            </svg>
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
