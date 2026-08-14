import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "./components/Dashboardlayout";

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
    usuario: "Andres",
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
  const [generalSearch, setGeneralSearch] = useState("");

  const [filters, setFilters] = useState(initialFilters);

  const [activeFilters, setActiveFilters] = useState(
    initialActiveFilters,
  );

  const [searchExecuted, setSearchExecuted] = useState(false);

  // Datos quemados temporalmente.
  // Después vendrán de la API.
  const [documents] = useState(initialResults);

  const filteredResults = useMemo(() => {
    if (!searchExecuted) {
      return documents;
    }

    const generalText = generalSearch
      .trim()
      .toLowerCase();

    return documents.filter((document) => {
      const matchesGeneral =
        !generalText ||
        Object.values(document).some((value) =>
          String(value)
            .toLowerCase()
            .includes(generalText),
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
        !filters.fecha ||
        document.fecha === filters.fecha;

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
  }, [
    documents,
    filters,
    generalSearch,
    searchExecuted,
  ]);

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
    "flex h-12 w-full items-center justify-center gap-2 " +
    "rounded-md border border-gray-400 bg-white px-4 " +
    "text-sm font-semibold text-black transition " +
    "hover:bg-gray-100";

  const inputClasses =
    "h-10 w-full rounded-md border border-gray-300 " +
    "bg-white px-3 text-sm text-black outline-none " +
    "transition focus:border-green-500 " +
    "focus:ring-2 focus:ring-green-200";

  return (
    <DashboardLayout
      activePage="busqueda"
      searchValue={generalSearch}
      onSearchChange={(event) =>
        setGeneralSearch(event.target.value)
      }
      onSearchSubmit={handleSearch}
      searchPlaceholder="Buscar documento"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* FILTROS */}
        <section>
          <h1 className="mb-7 text-2xl font-bold text-gray-900">
            Búsqueda avanzada
          </h1>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              
              {/* Usuario */}
              <div className="W-full sm:w-48">
                <button 
                  type="button"
                  onClick={() =>
                    toggleFilter("usuario")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={22}
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
              <div className="W-full sm:w-48">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("documento")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={22}
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
              <div className="W-full sm:w-48">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("id")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={22}
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
              <div className="W-full sm:w-48">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("fecha")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={22}
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
              <div className="W-full sm:w-48">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("formato")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={22}
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
                    <option value="">
                      Seleccione un formato
                    </option>

                    <option value="PDF">
                      PDF
                    </option>

                    <option value="CSV">
                      CSV
                    </option>

                    <option value="DOCX">
                      DOCX
                    </option>

                    <option value="XLSX">
                      XLSX
                    </option>
                  </select>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 h-12 w-full rounded-lg bg-green-500 px-8 font-bold text-black transition hover:bg-green-600 sm:w-44"
            >
              Buscar
            </button>
          </form>
        </section>

        {/* RESULTADOS */}
        <section className="self-start rounded-md bg-[#d8d8d8] p-6">
          <div className="border-b border-gray-500 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Resultados de búsqueda:{" "}
              {filteredResults.length}
            </h2>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[550px] border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left">
                    ID
                  </th>

                  <th className="px-3 py-2 text-left">
                    Documento
                  </th>

                  <th className="px-3 py-2 text-left">
                    Usuario
                  </th>

                  <th className="px-3 py-2 text-left">
                    Fecha
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map(
                    (document) => (
                      <tr
                        key={document.id}
                        className="border-t border-gray-400"
                      >
                        <td className="px-3 py-3">
                          {String(document.id).padStart(
                            2,
                            "0",
                          )}
                        </td>

                        <td className="px-3 py-3">
                          {document.documento}
                        </td>

                        <td className="px-3 py-3">
                          {document.usuario}
                        </td>

                        <td className="px-3 py-3">
                          {formatDate(
                            document.fecha,
                          )}
                        </td>
                      </tr>
                    ),
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-12 text-center text-gray-600"
                    >
                      No se encontraron documentos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}