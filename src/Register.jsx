import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  nombres: "",
  apellidos: "",
  documento: "",
  correo: "",
  area: "",
  cargo: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    console.log("Datos enviados:", formData);

    navigate("/login");
  };

  const inputClasses =
    "h-10 w-full rounded-md border border-gray-300 bg-white px-3 " +
    "text-sm text-black outline-none transition " +
    "focus:border-green-500 focus:ring-2 focus:ring-green-200";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4 py-6">
      <section className="grid w-full max-w-6xl grid-cols-1 overflow-hidden bg-[#f1f1f1] md:grid-cols-2">
        {/* Parte izquierda */}
        <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#202020] md:text-4xl">
              Bienvenidos al
            </h1>

            <h2 className="text-3xl font-bold text-[#202020] md:text-4xl">
              Gestor documental
            </h2>

            <img
              src="/assets/Logo-Enruta.png"
              alt="Logo Enruta"
              className="mt-6 h-auto w-36 object-contain md:w-44"
            />
          </div>

          <img
            src="/assets/mascota.png"
            alt="Mascota Enruta"
            className="h-auto w-36 object-contain md:w-56"
          />
        </div>

        {/* Parte derecha */}
        <div className="flex items-center justify-center px-6 py-10">
          <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 flex flex-col">
              <label
                htmlFor="nombres"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Nombres
              </label>

              <input
                id="nombres"
                name="nombres"
                type="text"
                placeholder="Escriba su nombre"
                value={formData.nombres}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="apellidos"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Apellidos
              </label>

              <input
                id="apellidos"
                name="apellidos"
                type="text"
                placeholder="Escriba su apellido"
                value={formData.apellidos}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="documento"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Documento
              </label>

              <input
                id="documento"
                name="documento"
                type="number"
                min={0}
                max={9007199254740991}
                step={1}
                placeholder="Número de documento"
                value={formData.documento}
                onChange={handleChange}
                className={`${inputClasses}
                  [appearance:textfield]
                  [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none
                `}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="correo"
                className="mb-1 text-sm font-bold text-[#202020]"
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
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="area"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Área
              </label>

              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="" disabled hidden>
                  Seleccione el área
                </option>

                <option value="Tecnología de la Información">
                  Tecnología de la Información
                </option>

                <option value="Gestión Comercial">
                  Gestión Comercial
                </option>

                <option value="Dirección Financiera">
                  Dirección Financiera
                </option>

                <option value="Desarrollo Humano">
                  Desarrollo Humano
                </option>

                <option value="Asesoría Jurídica">
                  Asesoría Jurídica
                </option>
              </select>
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="cargo"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Cargo institucional
              </label>

              <input
                id="cargo"
                name="cargo"
                type="text"
                placeholder="Cargo en la entidad"
                value={formData.cargo}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite la contraseña"
                value={formData.password}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="mb-1 text-sm font-bold text-[#202020]"
              >
                Confirmar contraseña
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {error && (
              <p className="mb-3 text-center text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mx-auto mt-5 block h-11 w-full rounded-md bg-green-500 font-bold text-black transition hover:bg-green-600 sm:w-60"
            >
              Registrarse
            </button>

            <p className="mt-3 text-center text-sm font-bold text-black">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="underline hover:text-green-700"
              >
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}