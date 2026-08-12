
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.correo.trim() || !formData.password.trim()) {
      return;
    }

    console.log("Inicio de sesión:", formData);

    // Solo se ejecuta al presionar el botón.
    navigate("/home");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4 py-6">
      <section className="grid min-h-[560px] w-full max-w-6xl grid-cols-1 bg-[#f1f1f1] md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-10 px-6 py-10 text-center">
          <div className="flex flex-col items-center">
            <img
              src="/assets/Logo-Enruta.png"
              alt="Logo Enruta"
              className="mb-6 h-auto w-36 object-contain md:w-44"
            />

            <h1 className="text-3xl font-bold text-[#202020] md:text-5xl">
              Gestor documental
            </h1>
          </div>

          <img
            src="/assets/mascota.png"
            alt="Mascota Enruta"
            className="h-auto w-36 object-contain md:w-56"
          />
        </div>

        <div className="flex items-center justify-center px-6 py-10">
          <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <div className="mb-7 flex flex-col">
              <label
                htmlFor="correo"
                className="mb-2 text-sm font-bold text-[#202020]"
              >
                Correo institucional
              </label>

              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="ej: pepito.perez@enruta.gov.co"
                value={formData.correo}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="mb-7 flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-bold text-[#202020]"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digita la contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <button
              type="submit"
              className="mx-auto block h-12 w-full rounded-md bg-green-500 font-bold text-black hover:bg-green-600 sm:w-60"
            >
              Iniciar sesión
            </button>

            <p className="mt-3 flex flex-col text-center text-sm font-bold text-black">
              ¿No tienes cuenta?

              <Link
                to="/registro"
                className="underline hover:text-green-700"
              >
                Registrarse
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}