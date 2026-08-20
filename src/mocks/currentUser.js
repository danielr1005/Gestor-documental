import {
  ROLES,
  PERMISSIONS,
} from "../config/permissions";

export const currentUser = {
  id: 1,
  nombre: "Nombre del usuario",
  correo: "usuario@enruta.com",

  rol: ROLES.ADMIN,

  permisos: [
    PERMISSIONS.SEARCH_DOCUMENTS,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.DOWNLOAD_DOCUMENTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_PERMISSIONS,
    PERMISSIONS.VIEW_LOGS,
  ],
};