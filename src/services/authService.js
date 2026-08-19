const USE_MOCK_AUTH =
  import.meta.env.VITE_USE_MOCK_AUTH === "true";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(credentials) {
  console.log("MOCK AUTH:", USE_MOCK_AUTH);

  // PRUEBA SIN BACKEND
  if (USE_MOCK_AUTH) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      token: "token-prueba",
      usuario: {
        id: 1,
        nombre: "Usuario de prueba",
        correo: credentials.correo,
        rol: "ADMINISTRADOR",
        permisos: [
          "BUSCAR_DOCUMENTOS",
          "VER_DOCUMENTOS",
          "DESCARGAR_DOCUMENTOS",
          "CARGAR_DOCUMENTOS",
          "GESTIONAR_USUARIOS",
          "GESTIONAR_PERMISOS",
          "CONSULTAR_LOGS",
        ],
      },
    };
  }

  // API REAL
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No fue posible iniciar sesión.",
    );
  }

  return data;
}