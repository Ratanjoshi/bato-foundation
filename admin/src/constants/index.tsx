import { LangType } from "../locale/language";
export const currentLanguage: LangType = "jp";

// backend for local host
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
export const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;
export const WEBSOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL;
// export const WEBSOCKET_URL = "wss://recruit.generalasahi.co.jp/backend/";
// admin/src/constants/index.ts  (append)
export const ICON_OPTIONS = [
  { value: "GraduationCap", label: "Graduation Cap" },
  { value: "Bot", label: "Robot / Bot" },
  { value: "Code2", label: "Code" },
  { value: "FlaskConical", label: "Flask / Science" },
  { value: "Users", label: "Users" },
  { value: "Compass", label: "Compass" },
  { value: "Book", label: "Book" },
  { value: "Lightbulb", label: "Lightbulb" },
  { value: "Rocket", label: "Rocket" },
  { value: "Globe", label: "Globe" },
  { value: "Heart", label: "Heart" },
  { value: "Star", label: "Star" },
];
// local backend
// export const BACKEND_BASE_URL = "http://localhost:8080/api/v1/";
// export const IMAGE_BASE_URL = "http://localhost:8080/";
// export const FRONTEND_BASE_URL = "http://localhost:5172/admin";
// export const WEBSOCKET_URL = "ws://localhost:8080";

// Network Host
// export const BACKEND_BASE_URL = "http://192.168.1.66:8080/api/v1/";
// export const IMAGE_BASE_URL = "http://192.168.1.66:8080/";
// export const FRONTEND_BASE_URL = "http://192.168.1.66:8080/admin/";
// export const WEBSOCKET_URL = "ws://192.168.1.66:8080";
