import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  X,
} from "lucide-react";

const initialResults = [
  {
    id: 1,
    documento: "Archivo.pdf",
    usuario: "Nico",
    fecha: "2027-09-20",
    formato: "PDF",
  },
  {
    id: 2,
    documento: "Programa.csv",
    usuario: "Andrés",
    fecha: "2027-06-23",
    formato: "CSV",
  },
  {
    id: 3,
    documento: "Historia.docx",
    usuario: "Gloria",
    fecha: "2027-03-12",
    formato: "DOCX",
  },
];

const initialFilters = {
  usuario: "",
  documento: "",
  id: "",
  fecha: "",
  formato: "",
};

const initialActiveFilters = {
  usuario: false,
  documento: false,
  id: false,
  fecha: false,
  formato: false,
};

export default function SearchDocuments() {
 const navigate = useNavigate();

  const [generalSearch, setGeneralSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(
    initialActiveFilters,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);

  // Después estos datos vendrán de la API.
  const [documents] = useState(initialResults);

  const filteredResults = useMemo(() => {
    if (!searchExecuted) {
      return documents;
    }

    const generalText = generalSearch.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesGeneral =
        !generalText ||
        Object.values(document).some((value) =>
          String(value).toLowerCase().includes(generalText),
        );

      const matchesUser =
        !filters.usuario ||
        document.usuario
          .toLowerCase()
          .includes(filters.usuario.toLowerCase());

      const matchesDocument =
        !filters.documento ||
        document.documento
          .toLowerCase()
          .includes(filters.documento.toLowerCase());

      const matchesId =
        !filters.id ||
        String(document.id).includes(filters.id);

      const matchesDate =
        !filters.fecha || document.fecha === filters.fecha;

      const matchesFormat =
        !filters.formato ||
        document.formato === filters.formato;

      return (
        matchesGeneral &&
        matchesUser &&
        matchesDocument &&
        matchesId &&
        matchesDate &&
        matchesFormat
      );
    });
  }, [documents, filters, generalSearch, searchExecuted]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const toggleFilter = (filterName) => {
    setActiveFilters((previousFilters) => ({
      ...previousFilters,
      [filterName]: !previousFilters[filterName],
    }));

    if (activeFilters[filterName]) {
      setFilters((previousFilters) => ({
        ...previousFilters,
        [filterName]: "",
      }));
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchExecuted(true);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const filterButtonClasses =
    "flex h-12 min-w-36 items-center justify-center gap-2 " +
    "border border-gray-500 bg-white px-4 text-sm font-medium " +
    "text-black transition hover:bg-gray-100";

  const inputClasses =
    "h-10 w-full rounded-md border border-gray-300 bg-white " +
    "px-3 text-sm text-black outline-none transition " +
    "focus:border-green-500 focus:ring-2 focus:ring-green-200";

  return (
    <div
      className={`flex min-h-screen flex-col ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-[#f8f8f8] text-black"
      }`}
    >
      {/* Encabezado */}
      <header className="relative bg-[#16c90f] text-black">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          {/* Logo, home y menú */}
          <div className="flex items-center justify-between gap-4 md:justify-start">
            <img
              src="/assets/mascota.png"
              alt="Mascota Enruta"
              className="h-12 w-12 object-contain"
            />

            <button
              type="button"
              title="Ir al inicio"
              aria-label="Ir al inicio"
              onClick={() => navigate("/home")}
              className="rounded-md p-2 transition hover:bg-black/10"
            >
              <Home size={28} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              title="Abrir menú"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen((previous) => !previous)}
              className="rounded-full border-2 border-black p-2 transition hover:bg-black/10"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>

          {/* Buscador superior */}
          <form
            onSubmit={handleSearch}
            className="order-3 w-full md:order-none md:max-w-md"
          >
            <div className="flex h-11 items-center rounded-full border-2 border-gray-600 bg-white px-4">
              <Search size={21} />

              <input
                type="search"
                placeholder="Buscar documento"
                value={generalSearch}
                onChange={(event) =>
                  setGeneralSearch(event.target.value)
                }
                className="h-full w-full bg-transparent px-3 text-sm text-black outline-none"
              />
            </div>
          </form>

          {/* Usuario, modo oscuro y regresar */}
          <div className="flex items-center justify-between gap-3 md:justify-end">
            <span className="max-w-52 truncate text-sm font-bold uppercase">
              Nombre del usuario
            </span>

            <button
              type="button"
              title={
                darkMode
                  ? "Activar modo claro"
                  : "Activar modo oscuro"
              }
              onClick={() => setDarkMode((previous) => !previous)}
              className="rounded-full p-2 transition hover:bg-black/10"
            >
              {darkMode ? <Sun size={27} /> : <Moon size={27} />}
            </button>

            <button
              type="button"
              title="Regresar al Home"
              aria-label="Regresar al Home"
              onClick={() => navigate("/home")}
              className="rounded-full border-2 border-black p-2 transition hover:bg-black/10"
            >
              <ArrowLeft size={27} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Menú desplegable */}
        {menuOpen && (
          <nav className="absolute left-4 top-[76px] z-30 w-56 rounded-md border border-gray-200 bg-white p-2 text-black shadow-lg">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full rounded-md px-4 py-2 text-left text-sm font-semibold hover:bg-gray-100"
            >
              Inicio
            </button>

            <button
              type="button"
              onClick={() => navigate("/documentos")}
              className="w-full rounded-md px-4 py-2 text-left text-sm font-semibold hover:bg-gray-100"
            >
              Documentos
            </button>

            <button
              type="button"
              className="w-full rounded-md bg-green-100 px-4 py-2 text-left text-sm font-semibold"
            >
              Búsqueda avanzada
            </button>
          </nav>
        )}
      </header>

      {/* Contenido principal */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* Filtros */}
        <section>
          <h1 className="mb-6 text-2xl font-bold">
            Búsqueda avanzada
          </h1>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {/* Usuario */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFilter("usuario")}
                  className={filterButtonClasses}
                >
                  <Plus
                    size={23}
                    className={
                      activeFilters.usuario
                        ? "rotate-45 transition"
                        : "transition"
                    }
                  />
                  Usuario
                </button>

                {activeFilters.usuario && (
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Nombre del usuario"
                    value={filters.usuario}
                    onChange={handleFilterChange}
                    className={`mt-2 ${inputClasses}`}
                  />
                )}
              </div>

              {/* Documento */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFilter("documento")}
                  className={filterButtonClasses}
                >
                  <Plus
                    size={23}
                    className={
                      activeFilters.documento
                        ? "rotate-45 transition"
                        : "transition"
                    }
                  />
                  Documento
                </button>

                {activeFilters.documento && (
                  <input
                    type="text"
                    name="documento"
                    placeholder="Nombre del documento"
                    value={filters.documento}
                    onChange={handleFilterChange}
                    className={`mt-2 ${inputClasses}`}
                  />
                )}
              </div>

              {/* ID */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFilter("id")}
                  className={filterButtonClasses}
                >
                  <Plus
                    size={23}
                    className={
                      activeFilters.id
                        ? "rotate-45 transition"
                        : "transition"
                    }
                  />
                  ID
                </button>

                {activeFilters.id && (
                  <input
                    type="number"
                    name="id"
                    min={0}
                    placeholder="ID del documento"
                    value={filters.id}
                    onChange={handleFilterChange}
                    className={`mt-2 ${inputClasses}
                      [appearance:textfield]
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                    `}
                  />
                )}
              </div>

              {/* Fecha */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFilter("fecha")}
                  className={filterButtonClasses}
                >
                  <Plus
                    size={23}
                    className={
                      activeFilters.fecha
                        ? "rotate-45 transition"
                        : "transition"
                    }
                  />
                  Fecha
                </button>

                {activeFilters.fecha && (
                  <input
                    type="date"
                    name="fecha"
                    value={filters.fecha}
                    onChange={handleFilterChange}
                    className={`mt-2 ${inputClasses}`}
                  />
                )}
              </div>

              {/* Formato */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleFilter("formato")}
                  className={filterButtonClasses}
                >
                  <Plus
                    size={23}
                    className={
                      activeFilters.formato
                        ? "rotate-45 transition"
                        : "transition"
                    }
                  />
                  Formato
                </button>

                {activeFilters.formato && (
                  <select
                    name="formato"
                    value={filters.formato}
                    onChange={handleFilterChange}
                    className={`mt-2 ${inputClasses}`}
                  >
                    <option value="">Seleccione un formato</option>
                    <option value="PDF">PDF</option>
                    <option value="CSV">CSV</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                  </select>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 h-14 w-full rounded-xl border border-gray-600 bg-[#29d282] text-xl font-semibold text-black transition hover:bg-[#20bb70] sm:w-44"
            >
              Buscar
            </button>
          </form>
        </section>

        {/* Resultados */}
        <section
          className={`self-start rounded-sm p-6 ${
            darkMode ? "bg-slate-700" : "bg-[#b8b8b8]"
          }`}
        >
          <div className="border-b border-gray-600 pb-3">
            <h2 className="text-lg font-medium">
              Resultados de búsqueda: {filteredResults.length}
            </h2>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[550px] border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">
                    Documento
                  </th>
                  <th className="px-3 py-2 text-left">Usuario</th>
                  <th className="px-3 py-2 text-left">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((document) => (
                    <tr key={document.id}>
                      <td className="px-3 py-3">
                        {String(document.id).padStart(2, "0")}
                      </td>

                      <td className="px-3 py-3">
                        {document.documento}
                      </td>

                      <td className="px-3 py-3">
                        {document.usuario}
                      </td>

                      <td className="px-3 py-3">
                        {formatDate(document.fecha)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-10 text-center"
                    >
                      No se encontraron documentos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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