import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  LogOut,
  Search,
  Users,
  Files,
  Menu,
  X,
  FileSearch,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Posteriormente estos datos vendrán desde la API.
  const [stats] = useState({
    totalUsuarios: 67,
    totalArchivos: 0,
    totalBusquedas: 0,
  });

  // Posteriormente vendrá de la sesión del usuario.
  const userName = "Nombre del usuario";

  const goTo = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const cleanSearch = search.trim();

    if (!cleanSearch) {
      navigate("/busqueda");
      return;
    }

    navigate(
      `/busqueda?query=${encodeURIComponent(cleanSearch)}`,
    );
  };

  const handleLogout = () => {
    // Después se eliminará aquí el token o la sesión.
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      {/* Encabezado */}
      <header className="relative bg-[#16c90f]">
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
                aria-label="Ir al inicio"
                title="Inicio"
                onClick={() => goTo("/home")}
                className="rounded-md p-2 text-black transition hover:bg-black/10"
              >
                <HomeIcon size={28} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                aria-label="Abrir menú"
                title="Menú"
                onClick={() =>
                  setMenuOpen((previousValue) => !previousValue)
                }
                className="rounded-full border-2 border-black p-2 text-black transition hover:bg-black/10"
              >
                {menuOpen ? (
                  <X size={26} strokeWidth={2.5} />
                ) : (
                  <Menu size={26} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          {/* Buscador */}
          <form
            className="order-3 w-full lg:order-none lg:max-w-xl"
            onSubmit={handleSearch}
          >
            <div className="flex h-11 items-center rounded-full border-2 border-gray-600 bg-white px-4">
              <Search
                size={22}
                className="shrink-0 text-gray-800"
              />

              <input
                type="search"
                placeholder="Buscar archivo"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="h-full w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-gray-500"
              />
            </div>
          </form>

          {/* Usuario y cerrar sesión */}
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span className="max-w-52 truncate text-sm font-bold uppercase text-black">
              {userName}
            </span>

            <button
              type="button"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              onClick={handleLogout}
              className="rounded-md border-2 border-black bg-white p-1.5 text-black transition hover:bg-gray-200"
            >
              <LogOut size={27} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Menú desplegable */}
        {menuOpen && (
          <nav className="absolute left-4 top-[105px] z-50 w-64 rounded-lg border border-gray-200 bg-white p-2 text-black shadow-xl lg:top-[92px]">
            <button
              type="button"
              onClick={() => goTo("/home")}
              className="flex w-full items-center gap-3 rounded-md bg-green-100 px-4 py-3 text-left text-sm font-semibold transition hover:bg-green-200"
            >
              <HomeIcon size={20} />
              Inicio
            </button>

            <button
              type="button"
              onClick={() => goTo("/documentos")}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold transition hover:bg-gray-100"
            >
              <Files size={20} />
              Documentos
            </button>

            <button
              type="button"
              onClick={() => goTo("/busqueda")}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold transition hover:bg-gray-100"
            >
              <FileSearch size={20} />
              Búsqueda avanzada
            </button>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-8">
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Total usuarios */}
          <article>
            <div className="mb-3 flex items-center gap-2">
              <Users size={23} />

              <h2 className="text-lg font-semibold text-[#303030]">
                Total usuarios
              </h2>
            </div>

            <div className="flex min-h-80 items-center justify-center bg-[#ededf1] p-8">
              <span className="text-8xl font-medium text-[#181818] sm:text-9xl">
                {stats.totalUsuarios}
              </span>
            </div>
          </article>

          {/* Estadísticas de la derecha */}
          <div className="flex flex-col gap-10">
            <article>
              <div className="mb-3 flex items-center gap-2">
                <Files size={23} />

                <h2 className="text-lg font-semibold text-[#303030]">
                  Total archivos
                </h2>
              </div>

              <div className="flex min-h-36 items-center justify-center rounded-md bg-[#d8d8d8] p-6">
                <span className="text-6xl font-semibold text-[#252525]">
                  {stats.totalArchivos}
                </span>
              </div>
            </article>

            <article>
              <div className="mb-3 flex items-center gap-2">
                <FileSearch size={23} />

                <h2 className="text-lg font-semibold text-[#303030]">
                  Total búsquedas
                </h2>
              </div>

              <div className="flex min-h-36 items-center justify-center rounded-md bg-[#d8d8d8] p-6">
                <span className="text-6xl font-semibold text-[#252525]">
                  {stats.totalBusquedas}
                </span>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
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