<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#08011d] p-4">
    <!-- <img src="../assets/logoNewxo.png" class="w-12 h-14 absolute top-4 left-4 text-white" alt="Logo"> -->
    <!-- Card Principal -->
    <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-100">
      
      <!-- Logo / Icono -->
      <div class="flex justify-center mb-6">
        <div class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      <!-- Encabezado -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-900">Bienvenido de nuevo</h2>
        <p class="text-slate-500 text-sm mt-1">Ingresa tus datos para continuar</p>
      </div>

      <!-- Mensaje de error desde servidor (credenciales inválidas) -->
      <div v-if="serverError" class="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ serverError }}</span>
      </div>

      <!-- Formulario HTML5 con Validación Nativa -->
      <form @submit.prevent="validar" class="space-y-5">
        
        <!-- Campo: Usuario / Correo -->
        <div>
          <label for="user" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Usuario / Correo
          </label>
          <div class="relative">
            <input 
              id="user"
              v-model.trim="user"
              type="text"
              required
              minlength="3"
              placeholder="correo@ejemplo.com"
              autocomplete="username"
              class="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200 outline-none invalid:border-red-500 invalid:focus:ring-red-100"
            />
            <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Campo: Contraseña -->
        <div>
          <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Contraseña
          </label>
          <div class="relative">
            <input 
              id="password"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              required
              minlength="4"
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200 outline-none invalid:border-red-500 invalid:focus:ring-red-100"
            />
            <button 
              type="button" 
              @click="isPwd = !isPwd"
              class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              tabindex="-1"
            >
              <!-- Icono Mostrar -->
              <svg v-if="isPwd" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <!-- Icono Ocultar -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908A8.982 8.982 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Botón de Ingreso -->
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl font-bold uppercase text-xs tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? 'Iniciando sesión...' : 'Ingresar' }}</span>
        </button>

        <!-- Registro por WhatsApp -->
        <div class="text-center pt-4 border-t border-slate-100">
          <span class="text-xs text-slate-500">¿No tienes una cuenta?</span>
          <a 
            class="ml-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors" 
            href="https://api.whatsapp.com/send?phone=573118048146&text=Hola,%20equipo%20de%20Newxo%20Dev.%20Me%20gustaría%20registrarme%20en%20su%20plataforma.%20%C2%A1Gracias%20por%20su%20asistencia!" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Registrarse
          </a>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginStore } from "../store/login.js";

const store = LoginStore();
const router = useRouter();

const user = ref("");
const password = ref("");
const isPwd = ref(true);
const loading = ref(false);
const serverError = ref("");

async function validar() {
  // Cuando la función ejecuta, el navegador YA VALIDÓ que los campos tengan contenido
  // y cumplan con los atributos 'required' y 'minlength'.
  serverError.value = "";
  loading.value = true;

  try {
    await store.newLogin({
      user: user.value,
      password: password.value,
    });
    pasarHome();
  } catch (error) {
    console.error("Error en autenticación:", error);
    serverError.value = error?.response?.data?.message || "Usuario o contraseña incorrectos.";
  } finally {
    loading.value = false;
  }
}

function pasarHome() {
  router.push("/home");
}
</script>