import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSearch,
  Files,
  Filter,
  Home,
  LogOut,
  Maximize,
  Minimize,
  Moon,
  Search,
  Sun,
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
  onFilterClick,
  searchPlaceholder = "Buscar archivo",
}) {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleDarkMode = () => {
    // Nota: esto solo alterna el estado visual del botón por ahora.
    // Para que el modo oscuro afecte de verdad el resto de la app,
    // falta habilitar `darkMode: "class"` en tailwind.config y agregar
    // clases dark: en cada componente. Queda como siguiente paso.
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7f6]">
      {/* ENCABEZADO */}
      <header className="bg-[#0E9E6B]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-3 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logohome.png"
              alt="Logo Enruta"
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-base font-semibold text-white">
              Gestor documental
            </span>
          </div>

          {/* BUSCADOR */}
          {canSearch && (
            <form
              onSubmit={handleSubmit}
              className="order-3 w-full lg:order-none lg:max-w-sm lg:flex-1"
            >
              <div className="flex h-9 items-center gap-2 rounded-lg bg-white/20 px-3">
                <Search size={16} className="shrink-0 text-white/90" />
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={onSearchChange}
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/80"
                />
              </div>
            </form>
          )}

          {/* ACCIONES, USUARIO Y LOGOUT */}
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              title="Filtrar"
              aria-label="Filtrar"
              onClick={onFilterClick}
              className="rounded-lg p-2 text-white/90 transition hover:bg-white/15"
            >
              <Filter size={19} />
            </button>

            <button
              type="button"
              title={isDarkMode ? "Modo claro" : "Modo oscuro"}
              aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
              onClick={toggleDarkMode}
              className="rounded-lg p-2 text-white/90 transition hover:bg-white/15"
            >
              {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              title={isFullscreen ? "Salir de pantalla completa" : "Maximizar"}
              aria-label={isFullscreen ? "Salir de pantalla completa" : "Maximizar vista"}
              onClick={toggleFullscreen}
              className="rounded-lg p-2 text-white/90 transition hover:bg-white/15"
            >
              {isFullscreen ? <Minimize size={19} /> : <Maximize size={19} />}
            </button>

            <div className="mx-2 h-6 w-px bg-white/30" />

            <div className="flex flex-col items-end">
              <span className="max-w-52 truncate text-sm font-bold uppercase text-white">
                {user.nombre}
              </span>

              <span className="text-xs font-medium text-white/80">
                {user.rol}
              </span>
            </div>

            <button
              type="button"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              onClick={handleLogout}
              className="rounded-lg p-2 text-white/90 transition hover:bg-white/15"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl gap-1 px-4 py-2 lg:px-8">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;

            return (
              <button
                key={item.route}
                type="button"
                onClick={() => goTo(item.route)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#E1F7EC] text-[#0E7A52]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0E9E6B]">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-center px-4">
          <p className="text-sm font-medium text-white">
            Gestor Documental Enruta © 2026. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}