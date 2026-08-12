import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Menu,
  Pencil,
  Search,
  X,
} from "lucide-react";

const initialDocuments = [
  {
    id: 1,
    area: "Tecnología",
    nombre: "Informe de gestión",
    serie: "Informes",
    subSerie: "Informes mensuales",
    fechaInicial: "2026-01-01",
    fechaFinal: "2026-01-31",
    ubicacionFisica: "Archivo central",
  },
  {
    id: 2,
    area: "Jurídica",
    nombre: "Contrato de prestación",
    serie: "Contratos",
    subSerie: "Prestación de servicios",
    fechaInicial: "2026-02-05",
    fechaFinal: "2026-12-31",
    ubicacionFisica: "Estante B-04",
  },
  {
    id: 3,
    area: "Gestión Comercial",
    nombre: "Reporte comercial",
    serie: "Reportes",
    subSerie: "Reportes trimestrales",
    fechaInicial: "2026-03-01",
    fechaFinal: "2026-03-31",
    ubicacionFisica: "Archivo digital",
  },
   {
    id: 4,
    area: "Gestión Comercial",
    nombre: "Reporte comercial",
    serie: "Reportes",
    subSerie: "Reportes trimestrales",
    fechaInicial: "2026-03-01",
    fechaFinal: "2026-03-31",
    ubicacionFisica: "Archivo digital",
  },
  {
    id: 5,
    area: "Gestión Comercial",
    nombre: "Reporte comercial",
    serie: "Reportes",
    subSerie: "Reportes trimestrales",
    fechaInicial: "2026-03-01",
    fechaFinal: "2026-03-31",
    ubicacionFisica: "Archivo digital",
  },
   {
    id: 5,
    area: "Gestión Comercial",
    nombre: "Reporte comercial",
    serie: "Reportes",
    subSerie: "Reportes trimestrales",
    fechaInicial: "2026-03-01",
    fechaFinal: "2026-03-31",
    ubicacionFisica: "Archivo digital",
  },
];

export default function Documents() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Después estos datos vendrán desde la API.
  const [documents] = useState(initialDocuments);

  const filteredDocuments = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return documents;
    }

    return documents.filter((document) =>
      Object.values(document).some((value) =>
        String(value).toLowerCase().includes(searchText),
      ),
    );  
  }, [documents, search]);

  const handleView = (documentId) => {
    console.log("Ver documento:", documentId);

    // Más adelante:
    // navigate(`/documentos/${documentId}`);
  };

  const handleEdit = (documentId) => {
    console.log("Editar documento:", documentId);

    // Más adelante:
    // navigate(`/documentos/${documentId}/editar`);
  };
  const goTo = (route) => {
  navigate(route);
  setMenuOpen(false);
};

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      {/* Encabezado */}
      <header className="relative bg-[#16c90f]">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3">
          {/* Logo y menú */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/mascota.png"
              alt="Mascota Enruta"
              className="h-12 w-12 object-contain"
            />

            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen((previousValue) => !previousValue)}
              className="rounded-full border-2 border-black p-2 transition hover:bg-black/10"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>

          {/* Buscador */}
          <div className="hidden w-full max-w-md items-center rounded-full border-2 border-gray-700 bg-white px-4 md:flex">
            <Search size={21} className="shrink-0 text-black" />

            <input
              type="search"
              placeholder="Buscar documento"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-gray-500"
            />
          </div>

          {/* Usuario y regresar */}
          <div className="flex items-center gap-4">
            <span className="hidden max-w-56 truncate text-sm font-bold uppercase text-black sm:block">
              Nombre del usuario
            </span>

            <button
              type="button"
              aria-label="Regresar"
              title="Regresar"
              onClick={() => navigate("/home")}
              className="rounded-full border-2 border-black p-2 transition hover:bg-black/10"
            >
              <ArrowLeft size={27} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Buscador en celular */}
        <div className="px-4 pb-4 md:hidden">
          <div className="flex items-center rounded-full border-2 border-gray-700 bg-white px-4">
            <Search size={20} className="shrink-0 text-black" />

            <input
              type="search"
              placeholder="Buscar documento"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full bg-transparent px-3 text-sm text-black outline-none"
            />
          </div>
        </div>

        {/* Menú desplegable */}
        {menuOpen && (
          <nav className="absolute left-4 top-[76px] z-20 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
           <button
  type="button"
  onClick={() => goTo("/home")}
  className="w-full rounded-md bg-green-100 px-4 py-2 text-left text-sm font-semibold transition hover:bg-green-200"
>
  Inicio
</button>

<button
  type="button"
  onClick={() => goTo("/documentos")}
  className="w-full rounded-md px-4 py-2 text-left text-sm font-semibold transition hover:bg-gray-100"
>
  Documentos
</button>

<button
  type="button"
  onClick={() => goTo("/busqueda")}
  className="w-full rounded-md px-4 py-2 text-left text-sm font-semibold transition hover:bg-gray-100"
>
  Datos
</button>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
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

        {/* Tabla responsive */}
        <div className="overflow-x-auto rounded-md border border-gray-500 bg-white shadow-sm">
          <table className="min-w-[1100px] w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  ID
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Área
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Nombre
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Serie
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Subserie
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Fecha inicial
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Fecha final
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Ubicación física
                </th>
                <th className="border border-gray-500 px-3 py-4 text-xs font-bold">
                  Acciones
                </th>
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
                      {document.id}
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

                    <td className="border border-gray-500 px-3 py-4 text-center text-sm">
                      {document.fechaInicial}
                    </td>

                    <td className="border border-gray-500 px-3 py-4 text-center text-sm">
                      {document.fechaFinal}
                    </td>

                    <td className="border border-gray-500 px-3 py-4 text-sm">
                      {document.ubicacionFisica}
                    </td>

                    <td className="border border-gray-500 px-3 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          aria-label={`Ver documento ${document.id}`}
                          title="Ver"
                          onClick={() => handleView(document.id)}
                          className="rounded-md p-2 transition hover:bg-white/60"
                        >
                          <Eye size={22} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Editar documento ${document.id}`}
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
                    colSpan={9}
                    className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                    No se encontraron documentos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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