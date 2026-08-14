import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, Files, Users } from "lucide-react";
import DashboardLayout from "./components/DashboardLayout";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [stats] = useState({
    totalUsuarios: 67,
    totalArchivos: 0,
    totalBusquedas: 0,
  });

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

  return (
    <DashboardLayout
      activePage="home"
      searchValue={search}
      onSearchChange={(event) => setSearch(event.target.value)}
      onSearchSubmit={handleSearch}
      searchPlaceholder="Buscar archivo"
    >
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
    </DashboardLayout>
  );
}