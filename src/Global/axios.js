import axios from "axios";

const requestAxios = axios.create({
  // baseURL: "https://backend-inventory-wl06.onrender.com/api",
  
  // servicio angel 
  baseURL: "https://backend-inventory-9jz3.onrender.com/api",
  // baseURL: "http://localhost:8500/api"
});

// --- INTERCEPTOR DE PETICIÓN (Envío automático) ---
requestAxios.interceptors.request.use(
  (config) => {
    // Extraemos el token del loginStore persistido en localStorage
    // Nota: Ajusta 'loginStore' según el nombre que use Pinia para persistir
    const loginData = JSON.parse(localStorage.getItem("LoginStore"));
    const token = loginData?.token;

    // 1. Protección contra fuga de token: Solo enviar a nuestra API
    const isInternal = config.url.startsWith("/") || config.url.startsWith(config.baseURL);

    if (token && isInternal) {
      // Usamos el header 'token' porque es el que tu backend espera
      config.headers.token = token;
    }

    // 2. Manejo del ID del Negocio (Si lo sigues usando)
    const bizData = JSON.parse(localStorage.getItem("businesses"));
    if (bizData?.selectedBusiness?.id) {
      config.headers["X-Business-ID"] = bizData.selectedBusiness.id;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPTOR DE RESPUESTA (Seguridad de Sesión) ---
requestAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verificamos si la petición que falló fue la de Login
    const isLoginRequest = error.config?.url?.includes('/login');

    // Si da 401 o 403 Y NO ES la petición de Login, entonces sí expiró el token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!isLoginRequest) {
        console.error("Sesión expirada o inválida. Redirigiendo...");
        localStorage.clear(); // Limpiamos todo por seguridad
        window.location.href = "/"; // O la ruta de tu login
      }
    }
    
    // IMPORTANTE: Siempre relanzar el error para que lo atrape el catch de la vista/store
    return Promise.reject(error);
  }
);

export { requestAxios };
