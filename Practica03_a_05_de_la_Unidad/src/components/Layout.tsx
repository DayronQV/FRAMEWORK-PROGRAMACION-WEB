import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  // Estado compartido por Sidebar y Navbar desde su componente padre.
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    () => window.matchMedia("(max-width: 1023px)").matches,
  );

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)");
    const handleResize = () => setIsCollapsed(mobile.matches);
    mobile.addEventListener("change", handleResize);
    return () => mobile.removeEventListener("change", handleResize);
  }, []);

  const closeMobileSidebar = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <div className="flex h-dvh bg-slate-50" onKeyDown={(event) => {
      if (event.key === "Escape") closeMobileSidebar();
    }}>
      {!isCollapsed && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Cerrar menú lateral"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}
      <Sidebar isCollapsed={isCollapsed} onNavigate={closeMobileSidebar} />

      {/* Área de Contenido Principal */}
      <div className="min-w-0 flex-1 flex flex-col overflow-hidden">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
