import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import {
  ArrowLeft,
  Download,
  FileText,
  X,
} from "lucide-react";


const documents = [
  {
    id: 1,
    nombre: "Historia laboral",
    descripcion:
      "Historia laboral radicada en el año 1900 por los estimados señores de la Registraduría Nacional Colombiana.",
    archivo: "HistoriaLaboral.pdf",
  },
  {
    id: 2,
    nombre: "Contrato",
    descripcion:
      "Contrato de prestación de servicios correspondiente al periodo 2026.",
    archivo: "Contrato.pdf",
  },
];

export default function DocumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const document = documents.find(
    (item) => item.id === Number(id),
  );

  const handleCancel = () => {
    navigate("/documentos");
  };

  const handleDownload = () => {
    console.log("Descargando:", document?.archivo);

    // Después se reemplazará por la descarga desde la API.
    alert(`Descarga de ${document?.archivo}`);
  };

  if (!document) {
    return (
      <DashboardLayout activePage="documentos">
        <div className="flex min-h-96 flex-col items-center justify-center gap-5">
          <h1 className="text-2xl font-bold">
            Documento no encontrado
          </h1>

          <button
            type="button"
            onClick={() => navigate("/documentos")}
            className="flex items-center gap-2 rounded-md bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-600"
          >
            <ArrowLeft size={20} />
            Volver a documentos
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activePage="documentos">
      {/* Botón atrás */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/documentos")}
          title="Volver a documentos"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black text-black transition hover:bg-gray-200"
        >
          <ArrowLeft size={27} strokeWidth={2.5} />
        </button>
      </div>

      {/* Contenedor principal */}
      <section className="mx-auto flex w-full max-w-3xl items-center justify-center">
        <div className="w-full rounded-md bg-[#ededf1] p-7 shadow-sm sm:p-10 md:p-12">

          {/* Información */}
          <div className="mb-10">
            <h1 className="mb-3 text-xl font-bold text-gray-900">
              {document.nombre}
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-gray-700 sm:text-base">
              {document.descripcion}
            </p>
          </div>

          {/* Icono documento */}
          <div className="mb-10 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white shadow-sm">
              <FileText
                size={58}
                strokeWidth={1.7}
                className="text-black"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleCancel}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red-500 px-6 font-semibold text-white transition hover:bg-red-600 sm:w-40"
            >
              <X size={20} />
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-semibold text-black transition hover:bg-green-600 sm:w-40"
            >
              <Download size={20} />
              Descargar
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}