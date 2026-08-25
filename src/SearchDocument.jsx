import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import DashboardLayout from "./components/Dashboardlayout";

const initialResults = [
  {
    id: 1,
    numeroOrden: 1,
    usuario: "Nico",
    area: "Tecnología",
    documento: "Informe de gestión.pdf",
    serie: "Informes",
    subSerie: "Informes mensuales",
    fechaInicial: "2026-01-01",
    fechaFinal: "2026-01-31",
    caja: "Caja 01",
    tipoCaja: "X200",
    carpeta: "Carpeta 03",
    tomo: "Tomo 1",
    numeroFolios: 120,
    soporte: "Digital",
    frecuenciaConsulta: "Alta",
    ubicacionFisica: "Archivo central",
    formato: "PDF",
  },
  {
    id: 2,
    numeroOrden: 2,
    usuario: "Andrés",
    area: "Jurídica",
    documento: "Contrato de prestación.csv",
    serie: "Contratos",
    subSerie: "Prestación de servicios",
    fechaInicial: "2026-02-05",
    fechaFinal: "2026-12-31",
    caja: "Caja 04",
    tipoCaja: "X300",
    carpeta: "Carpeta 02",
    tomo: "Tomo 1",
    numeroFolios: 85,
    soporte: "Físico",
    frecuenciaConsulta: "Media",
    ubicacionFisica: "Estante B-04",
    formato: "CSV",
  },
  {
    id: 3,
    numeroOrden: 3,
    usuario: "Gloria",
    area: "Gestión Comercial",
    documento: "Reporte comercial.pdf",
    serie: "Reportes",
    subSerie: "Reportes trimestrales",
    fechaInicial: "2026-03-01",
    fechaFinal: "2026-03-31",
    caja: "Caja 08",
    tipoCaja: "X200",
    carpeta: "Carpeta 07",
    tomo: "Tomo 2",
    numeroFolios: 64,
    soporte: "Digital",
    frecuenciaConsulta: "Baja",
    ubicacionFisica: "Archivo digital",
    formato: "PDF",
  },
  {
  id: 4,
  numeroOrden: 4,
  usuario: "María",
  area: "Gestión Financiera",
  documento: "Ejecución presupuestal.xlsx",
  serie: "Presupuesto",
  subSerie: "Ejecución presupuestal",
  fechaInicial: "2026-04-01",
  fechaFinal: "2026-04-30",
  caja: "Caja 11",
  tipoCaja: "X200",
  carpeta: "Carpeta 04",
  tomo: "Tomo 1",
  numeroFolios: 96,
  soporte: "Digital",
  frecuenciaConsulta: "Alta",
  ubicacionFisica: "Archivo financiero",
  formato: "XLSX",
},
{
  id: 5,
  numeroOrden: 5,
  usuario: "Carlos",
  area: "Desarrollo Humano",
  documento: "Historias laborales.docx",
  serie: "Historias laborales",
  subSerie: "Expedientes de funcionarios",
  fechaInicial: "2025-01-01",
  fechaFinal: "2025-12-31",
  caja: "Caja 15",
  tipoCaja: "X300",
  carpeta: "Carpeta 09",
  tomo: "Tomo 2",
  numeroFolios: 210,
  soporte: "Físico",
  frecuenciaConsulta: "Alta",
  ubicacionFisica: "Archivo de Desarrollo Humano",
  formato: "DOCX",
},
{
  id: 6,
  numeroOrden: 6,
  usuario: "Angie",
  area: "Licencias",
  documento: "Informe mensual de licencias.csv",
  serie: "Informes",
  subSerie: "Informes de licencias",
  fechaInicial: "2026-05-01",
  fechaFinal: "2026-05-31",
  caja: "Caja 18",
  tipoCaja: "X200",
  carpeta: "Carpeta 05",
  tomo: "Tomo 1",
  numeroFolios: 73,
  soporte: "Digital",
  frecuenciaConsulta: "Media",
  ubicacionFisica: "Archivo Licencias",
  formato: "CSV",
},
{
  id: 7,
  numeroOrden: 7,
  usuario: "Andrés",
  area: "RTM",
  documento: "Inventario de equipos.pdf",
  serie: "Inventarios",
  subSerie: "Inventario tecnológico",
  fechaInicial: "2026-06-01",
  fechaFinal: "2026-06-15",
  caja: "Caja 21",
  tipoCaja: "X200",
  carpeta: "Carpeta 02",
  tomo: "Tomo 1",
  numeroFolios: 48,
  soporte: "Digital",
  frecuenciaConsulta: "Media",
  ubicacionFisica: "Archivo RTM",
  formato: "PDF",
},
{
  id: 8,
  numeroOrden: 8,
  usuario: "Laura",
  area: "Jurídica",
  documento: "Acta de conciliación.docx",
  serie: "Actas",
  subSerie: "Actas de conciliación",
  fechaInicial: "2026-02-14",
  fechaFinal: "2026-02-14",
  caja: "Caja 06",
  tipoCaja: "X300",
  carpeta: "Carpeta 11",
  tomo: "Tomo 1",
  numeroFolios: 34,
  soporte: "Físico",
  frecuenciaConsulta: "Baja",
  ubicacionFisica: "Estante Jurídica C-02",
  formato: "DOCX",
},
{
  id: 9,
  numeroOrden: 9,
  usuario: "Santiago",
  area: "Planeación",
  documento: "Plan estratégico institucional.xlsx",
  serie: "Planes",
  subSerie: "Planeación estratégica",
  fechaInicial: "2026-01-01",
  fechaFinal: "2026-12-31",
  caja: "Caja 25",
  tipoCaja: "X200",
  carpeta: "Carpeta 01",
  tomo: "Tomo 1",
  numeroFolios: 155,
  soporte: "Digital",
  frecuenciaConsulta: "Alta",
  ubicacionFisica: "Archivo Planeación",
  formato: "XLSX",
},
{
  id: 10,
  numeroOrden: 10,
  usuario: "Valentina",
  area: "Control Interno",
  documento: "Informe de auditoría.xlsx",
  serie: "Auditorías",
  subSerie: "Auditorías internas",
  fechaInicial: "2026-03-10",
  fechaFinal: "2026-03-25",
  caja: "Caja 30",
  tipoCaja: "X300",
  carpeta: "Carpeta 08",
  tomo: "Tomo 1",
  numeroFolios: 118,
  soporte: "Digital",
  frecuenciaConsulta: "Media",
  ubicacionFisica: "Archivo Control Interno",
  formato: "XLSX",
},
{
  id: 11,
  numeroOrden: 11,
  usuario: "Felipe",
  area: "Contratación",
  documento: "Proceso contractual 2026-014.pdf",
  serie: "Contratos",
  subSerie: "Contratos de prestación de servicios",
  fechaInicial: "2026-01-20",
  fechaFinal: "2026-11-30",
  caja: "Caja 34",
  tipoCaja: "X300",
  carpeta: "Carpeta 12",
  tomo: "Tomo 3",
  numeroFolios: 285,
  soporte: "Físico",
  frecuenciaConsulta: "Alta",
  ubicacionFisica: "Archivo Contratación",
  formato: "PDF",
},
{
  id: 12,
  numeroOrden: 12,
  usuario: "Natalia",
  area: "Gestión Documental",
  documento: "Transferencia documental primaria.docx",
  serie: "Transferencias documentales",
  subSerie: "Transferencias primarias",
  fechaInicial: "2026-07-01",
  fechaFinal: "2026-07-15",
  caja: "Caja 40",
  tipoCaja: "X200",
  carpeta: "Carpeta 06",
  tomo: "Tomo 1",
  numeroFolios: 132,
  soporte: "Digital",
  frecuenciaConsulta: "Baja",
  ubicacionFisica: "Archivo central",
  formato: "DOCX",
},
];

const initialFilters = {
  usuario: "",
  documento: "",
  id: "",
  area: "",
  fecha: "",
  formato: "",
};

const initialActiveFilters = {
  usuario: false,
  documento: false,
  id: false,
  area: false,
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

  const [expandedDocument, setExpandedDocument] = useState(null);

  // Datos simulados.
  // Más adelante vendrán desde la API.
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

      const matchesArea =
        !filters.area ||
        document.area
          .toLowerCase()
          .includes(filters.area.toLowerCase());

      const matchesDate =
        !filters.fecha ||
        document.fechaInicial === filters.fecha ||
        document.fechaFinal === filters.fecha;

      const matchesFormat =
        !filters.formato ||
        document.formato === filters.formato;

      return (
        matchesGeneral &&
        matchesUser &&
        matchesDocument &&
        matchesId &&
        matchesArea &&
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
    setActiveFilters((previous) => {
      const newState = !previous[filterName];

      if (!newState) {
        setFilters((previousFilters) => ({
          ...previousFilters,
          [filterName]: "",
        }));
      }

      return {
        ...previous,
        [filterName]: newState,
      };
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchExecuted(true);
  };

  const handleReset = () => {
    setGeneralSearch("");
    setFilters(initialFilters);
    setActiveFilters(initialActiveFilters);
    setSearchExecuted(false);
    setExpandedDocument(null);
  };

  const toggleDetails = (documentId) => {
    setExpandedDocument((previous) =>
      previous === documentId
        ? null
        : documentId,
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

const filterButtonClasses =
  "flex h-10 w-40 items-center justify-center gap-2 " +
  "rounded-md border border-gray-400 bg-white px-3 " +
  "text-sm font-semibold text-black transition " +
  "hover:border-green-500 hover:bg-green-50";

  const inputClasses =
    "mt-2 h-10 w-full rounded-md border border-gray-300 " +
    "bg-white px-3 text-sm text-black outline-none transition " +
    "focus:border-green-500 focus:ring-2 focus:ring-green-200";

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
      <div className="space-y-8">
        {/* TÍTULO */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Búsqueda avanzada
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Selecciona los filtros que necesites para encontrar
            documentos.
          </p>
        </div>

        {/* FILTROS */}
        <section className="p-2">
          <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-3xl">
              {/* USUARIO */}
              <div className="w-40">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("usuario")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.usuario
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
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
                    className={inputClasses}
                  />
                )}
              </div>

              {/* DOCUMENTO */}
              <div className="w-full sm:w-44">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("documento")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.documento
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
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
                    className={inputClasses}
                  />
                )}
              </div>

              {/* ID */}
              <div className="w-full sm:w-44">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("id")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.id
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
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
                    className={`${inputClasses}
                      [appearance:textfield]
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                    `}
                  />
                )}
              </div>

              {/* ÁREA */}
              <div className="w-full sm:w-44">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("area")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.area
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
                    }
                  />

                  Área
                </button>

                {activeFilters.area && (
                  <input
                    type="text"
                    name="area"
                    placeholder="Área o dependencia"
                    value={filters.area}
                    onChange={handleFilterChange}
                    className={inputClasses}
                  />
                )}
              </div>

              {/* FECHA */}
              <div className="w-full sm:w-44">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("fecha")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.fecha
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
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
                    className={inputClasses}
                  />
                )}
              </div>

              {/* FORMATO */}
              <div className="w-full sm:w-44">
                <button
                  type="button"
                  onClick={() =>
                    toggleFilter("formato")
                  }
                  className={filterButtonClasses}
                >
                  <Plus
                    size={20}
                    className={
                      activeFilters.formato
                        ? "rotate-45 transition-transform"
                        : "transition-transform"
                    }
                  />

                  Formato
                </button>

                {activeFilters.formato && (
                  <select
                    name="formato"
                    value={filters.formato}
                    onChange={handleFilterChange}
                    className={inputClasses}
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

            {/* BOTONES */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-green-500 px-8 font-bold text-black transition hover:bg-green-600"
              >
                <Search size={19} />
                Buscar
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex h-11 items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-6 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                <RotateCcw size={18} />
                Limpiar
              </button>
            </div>
          </form>
        </section>

        {/* RESULTADOS */}
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

          {/* CABECERA RESULTADOS */}
          <div className="flex flex-col gap-2 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Resultados de búsqueda
              </h2>

              <p className="text-sm text-gray-500">
                {filteredResults.length} documento(s) encontrado(s)
              </p>
            </div>
          </div>

          {/* TABLA */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    N.° orden
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    Documento
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    Área
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    Serie / Subserie
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    Fecha inicial
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase">
                    Soporte
                  </th>

                  <th className="px-4 py-4 text-center text-xs font-bold uppercase">
                    Detalles
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map(
                    (document, index) => {
                      const isExpanded =
                        expandedDocument === document.id;

                      return (
                        <>
                          {/* FILA PRINCIPAL */}
                          <tr
                            key={`document-${document.id}`}
                            className={
                              index % 2 === 0
                                ? "border-t border-gray-200 bg-green-50"
                                : "border-t border-gray-200 bg-white"
                            }
                          >
                            <td className="px-4 py-4 text-center text-sm font-semibold">
                              {document.numeroOrden}
                            </td>

                            <td className="px-4 py-4">
                              <div className="font-semibold text-gray-900">
                                {document.documento}
                              </div>

                              <div className="mt-1 text-xs text-gray-500">
                                {document.formato}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm">
                              {document.area}
                            </td>

                            <td className="px-4 py-4 text-sm">
                              <div>
                                {document.serie}
                              </div>

                              <div className="mt-1 text-xs text-gray-500">
                                {document.subSerie}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {formatDate(
                                document.fechaInicial,
                              )}
                            </td>

                            <td className="px-4 py-4">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  document.soporte ===
                                  "Digital"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {document.soporte}
                              </span>
                            </td>

                            <td className="px-4 py-4 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleDetails(
                                    document.id,
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold transition hover:bg-gray-100"
                              >
                                Ver detalles

                                {isExpanded ? (
                                  <ChevronUp
                                    size={17}
                                  />
                                ) : (
                                  <ChevronDown
                                    size={17}
                                  />
                                )}
                              </button>
                            </td>
                          </tr>

                          {/* DETALLES DESPLEGABLES */}
                          {isExpanded && (
                            <tr
                              key={`details-${document.id}`}
                            >
                              <td
                                colSpan={7}
                                className="border-t border-gray-200 bg-[#f7f7f7] px-6 py-6"
                              >
                                <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 lg:grid-cols-4">

                                  <DetailItem
                                    label="ID"
                                    value={document.id}
                                  />

                                  <DetailItem
                                    label="Usuario"
                                    value={
                                      document.usuario
                                    }
                                  />

                                  <DetailItem
                                    label="Fecha final"
                                    value={formatDate(
                                      document.fechaFinal,
                                    )}
                                  />

                                  <DetailItem
                                    label="Caja"
                                    value={
                                      document.caja
                                    }
                                  />

                                  <DetailItem
                                    label="Tipo de caja"
                                    value={
                                      document.tipoCaja
                                    }
                                  />

                                  <DetailItem
                                    label="Carpeta"
                                    value={
                                      document.carpeta
                                    }
                                  />

                                  <DetailItem
                                    label="Tomo"
                                    value={
                                      document.tomo
                                    }
                                  />

                                  <DetailItem
                                    label="Número de folios"
                                    value={
                                      document.numeroFolios
                                    }
                                  />

                                  <DetailItem
                                    label="Frecuencia de consulta"
                                    value={
                                      document.frecuenciaConsulta
                                    }
                                  />

                                  <DetailItem
                                    label="Ubicación física"
                                    value={
                                      document.ubicacionFisica
                                    }
                                  />

                                  <DetailItem
                                    label="Formato"
                                    value={
                                      document.formato
                                    }
                                  />

                                  <DetailItem
                                    label="Subserie"
                                    value={
                                      document.subSerie
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center text-sm text-gray-500"
                    >
                      No se encontraron documentos con los
                      criterios seleccionados.
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

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}