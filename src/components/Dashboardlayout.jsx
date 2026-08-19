import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSearch,
  Files,
  Home,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";

import { currentUser } from "../mocks/currentUser";
import { PERMISSIONS } from "../config/permissions";

const menuItems = [
  {
    name: "Inicio",
    route: "/home",
    page: "home",
    icon: Home,
    permission: null,
  },
  {
    name: "Documentos",
    route: "/documentos",
    page: "documentos",
    icon: Files,
    permission: PERMISSIONS.VIEW_DOCUMENTS,
  },
  {
    name: "Búsqueda avanzada",
    route: "/busqueda",
    page: "busqueda",
    icon: FileSearch,
    permission: PERMISSIONS.SEARCH_DOCUMENTS,
  },
];

export default function DashboardLayout({
  children,
  activePage,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "Buscar archivo",
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Usuario temporal.
  // Después esta información llegará desde la API.
  const user = currentUser;

  const hasPermission = (permission) => {
    if (!permission) {
      return true;
    }

    return user.permisos?.includes(permission);
  };

  const visibleMenuItems = menuItems.filter((item) =>
    hasPermission(item.permission),
  );

  const canSearch = hasPermission(
    PERMISSIONS.SEARCH_DOCUMENTS,
  );

  const goTo = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    /*
      Después, cuando se conecte la API:
      - eliminar token
      - eliminar datos del usuario
      - cerrar sesión
    */

    navigate("/login", {
      replace: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSearch) {
      return;
    }

    if (onSearchSubmit) {
      onSearchSubmit(event);
      return;
    }

    navigate("/busqueda");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      {/* ENCABEZADO */}
      <header className="relative z-40 bg-[#16c90f]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Logo, inicio y menú */}
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <img
              src="/assets/logohome.png"
              alt="Logo Enruta"
              className="h-20 w-24 object-contain"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                title="Ir al inicio"
                aria-label="Ir al inicio"
                onClick={() => goTo("/home")}
                className="rounded-md p-2 text-black transition hover:bg-black/10"
              >
                <Home
                  size={28}
                  strokeWidth={2.5}
                />
              </button>

              <button
                type="button"
                title="Abrir menú"
                aria-label="Abrir menú"
                onClick={() =>
                  setMenuOpen(
                    (previousValue) =>
                      !previousValue,
                  )
                }
                className="rounded-full border-2 border-black p-2 text-black transition hover:bg-black/10"
              >
                {menuOpen ? (
                  <X
                    size={26}
                    strokeWidth={2.5}
                  />
                ) : (
                  <Menu
                    size={26}
                    strokeWidth={2.5}
                  />
                )}
              </button>
            </div>
          </div>

          {/* BUSCADOR */}
          {canSearch && (
            <form
              onSubmit={handleSubmit}
              className="order-3 w-full lg:order-none lg:max-w-xl"
            >
              <div className="flex h-11 items-center rounded-full border-2 border-gray-600 bg-white px-4">
                <Search
                  size={22}
                  className="shrink-0 text-gray-800"
                />

                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={onSearchChange}
                  className="h-full w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-gray-500"
                />
              </div>
            </form>
          )}

          {/* USUARIO Y LOGOUT */}
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <div className="flex flex-col items-end">
              <span className="max-w-52 truncate text-sm font-bold uppercase text-black">
                {user.nombre}
              </span>

              <span className="text-xs font-medium text-black/70">
                {user.rol}
              </span>
            </div>

            <button
              type="button"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              onClick={handleLogout}
              className="rounded-md border-2 border-black bg-white p-1.5 text-black transition hover:bg-gray-200"
            >
              <LogOut
                size={27}
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE */}
        {menuOpen && (
          <nav className="absolute left-4 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-2 text-black shadow-xl">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                activePage === item.page;

              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() =>
                    goTo(item.route)
                  }
                  className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-green-100 hover:bg-green-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />

                  {item.name}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* CONTENIDO */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="h-16 w-full bg-[#16c90f]">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4">
          <p className="text-sm font-semibold text-black">
            Gestor Documental Enruta - TI
          </p>
        </div>
      </footer>
    </div>
  );
}