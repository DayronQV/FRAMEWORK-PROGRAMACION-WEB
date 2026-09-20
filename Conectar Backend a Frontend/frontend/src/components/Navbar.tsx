import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ isCollapsed, toggleSidebar }: NavbarProps) => {
  const { totalItems } = useCart();
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="relative z-20 min-h-16 shrink-0 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-5 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-controls="sidebar"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Toggle: expandir menú lateral" : "Toggle: contraer menú lateral"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="hidden xl:block text-slate-600 font-medium text-lg">
          Panel de Administración
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Link
          to="/carrito"
          aria-label={`Carrito: ${totalItems} productos`}
          className="relative flex h-11 w-11 items-center justify-center hover:bg-slate-100 rounded-full transition"
        >
          <span className="text-xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <span title={userEmail ?? undefined} className="hidden md:block max-w-40 truncate text-sm text-slate-500">{userEmail}</span>

          {/* details permite abrir el menú con teclado, mouse o pantalla táctil. */}
          <details className="relative">
            {/* Círculo del usuario / Avatar */}
            <summary aria-label="Menú de usuario" className="h-11 w-11 cursor-pointer list-none rounded-full bg-slate-200 overflow-hidden border border-slate-300 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-indigo-600 [&::-webkit-details-marker]:hidden">
              {/* 
        NOTA PARA LA API: 
        Aquí reemplazarás el 'src' quemado por la variable de tu estado, 
        por ejemplo: src={userAvatar || defaultImage} 
      */}
              <img
                src="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </summary>

            {/* Menú desplegable */}
            <div className="absolute right-0 top-full mt-2 w-48 max-w-[calc(100vw-104px)] bg-white border border-slate-200 rounded-lg shadow-lg z-50">
              <p className="break-all border-b border-slate-100 px-3 py-2 text-xs text-slate-500">{userEmail}</p>
              <button
                onClick={handleLogout}
                className="min-h-11 w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-md transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
