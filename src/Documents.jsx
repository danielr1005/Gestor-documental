import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";
import DashboardLayout from "./components/DashboardLayout";

const initialDocuments = [
  {
    id: 1,
    numeroOrden: 1,
    area: "Tecnología",
    nombre: "Informe de gestión",
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
  },
  {
    id: 2,
    numeroOrden: 2,
    area: "Jurídica",
    nombre: "Contrato de prestación",
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
  },
  {
    id: 3,
    numeroOrden: 3,
    area: "Gestión Comercial",
    nombre: "Reporte comercial",
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
  },
];


export default function Documents() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Después estos datos vendrán desde la API.
  const [documents] = useState(initialDocuments);

  const filteredDocuments = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return documents;
    }

    return documents.filter((document) =>
      Object.values(document).some((value) =>
        String(value)
          .toLowerCase()
          .includes(searchText),
      ),
    );
  }, [documents, search]);

  const handleView = (documentId) => {
    navigate(`/documentos/${documentId}`);
  };

  const handleEdit = (documentId) => {
    console.log("Editar documento:", documentId);

    // Más adelante:
    // navigate(`/documentos/${documentId}/editar`);
  };

  return (
    <DashboardLayout
      activePage="documentos"
      searchValue={search}
      onSearchChange={(event) =>
        setSearch(event.target.value)
      }
      searchPlaceholder="Buscar documento"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Documentos
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            {filteredDocuments.length} documento(s) encontrado(s)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-500 bg-white shadow-sm">
        <table className="w-full min-w-[1100px] border-collapse">
       <thead>
  <tr className="bg-white">
    {[
      "N.° orden",
      "Área",
      "Documento",
      "Serie",
      "Subserie",
      "Fecha inicial",
      "Fecha final",
      "Caja",
      "Tipo caja",
      "Carpeta",
      "Tomo",
      "Folios",
      "Soporte",
      "Frecuencia",
      "Ubicación física",
      "Acciones",
    ].map((title) => (
      <th
        key={title}
        className="border border-gray-500 px-3 py-4 text-xs font-bold whitespace-nowrap"
      >
        {title}
      </th>
    ))}
  </tr>
</thead>

          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document, index) => (
           <tr
  key={document.id}
  className={
    index % 2 === 0
      ? "bg-[#a9edc5]"
      : "bg-white"
  }
>
  <td className="border border-gray-500 px-3 py-4 text-center text-sm">
    {document.numeroOrden}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-sm">
    {document.area}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-sm">
    {document.nombre}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-sm">
    {document.serie}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-sm">
    {document.subSerie}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm whitespace-nowrap">
    {document.fechaInicial}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm whitespace-nowrap">
    {document.fechaFinal}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm whitespace-nowrap">
    {document.caja}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm">
    {document.tipoCaja}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm whitespace-nowrap">
    {document.carpeta}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm whitespace-nowrap">
    {document.tomo}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm">
    {document.numeroFolios}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm">
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        document.soporte === "Digital"
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {document.soporte}
    </span>
  </td>

  <td className="border border-gray-500 px-3 py-4 text-center text-sm">
    {document.frecuenciaConsulta}
  </td>

  <td className="border border-gray-500 px-3 py-4 text-sm">
    {document.ubicacionFisica}
  </td>

  <td className="border border-gray-500 px-3 py-4">
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        title="Ver"
        onClick={() => handleView(document.id)}
        className="rounded-md p-2 transition hover:bg-white/60"
      >
        <Eye size={22} />
      </button>

      <button
        type="button"
        title="Editar"
        onClick={() => handleEdit(document.id)}
        className="rounded-md p-2 transition hover:bg-white/60"
      >
        <Pencil size={21} />
      </button>
    </div>
  </td>
</tr>
              ))
            ) : (
              <tr>
                <td
                colSpan={16}
                   className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                   No se encontraron documentos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}