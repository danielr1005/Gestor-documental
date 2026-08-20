import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const correo = formData.correo.trim();
    const password = formData.password.trim();

    if (!correo || !password) {
      setError("Debes ingresar el correo y la contraseña.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        correo,
        password,
      });

      if (response.token) {
        sessionStorage.setItem(
          "token",
          response.token,
        );
      }

      if (response.usuario) {
        sessionStorage.setItem(
          "usuario",
          JSON.stringify(response.usuario),
        );
      }

      navigate("/home", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "No fue posible iniciar sesión.",
      );
    } finally {
      setLoading(false);
    }
  };

  const bloquearPegado = (event) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4 py-6">
      <section className="grid min-h-[560px] w-full max-w-6xl grid-cols-1 bg-[#f1f1f1] md:grid-cols-2">

        {/* LADO IZQUIERDO */}
        <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 text-center">
          <div className="flex flex-col items-center">
            <img
              src="/assets/Logo-Enruta.png"
              alt="Logo Enruta"
              className="mb-6 h-auto w-36 object-contain md:w-44"
            />

            <h1 className="text-3xl font-bold text-[#202020] md:text-5xl">
              Gestor Documental
            </h1>
          </div>

          <img
            src="/assets/mascota.png"
            alt="Mascota Enruta"
            className="h-auto w-52 object-contain md:w-72 lg:w-80"
          />
        </div>

        {/* LADO DERECHO */}
        <div className="flex items-center justify-center px-6 py-10">
          <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit}
          >

            {/* CORREO */}
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
                onPaste={bloquearPegado}
                disabled={loading}
                required
                autoComplete="email"
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-black outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* CONTRASEÑA */}
            <div className="mb-5 flex flex-col">
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
                onPaste={bloquearPegado}
                disabled={loading}
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-black outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* MENSAJE DE ERROR */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              className="mx-auto block h-12 w-full rounded-md bg-green-500 font-bold text-black transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-60"
            >
              {loading
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
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