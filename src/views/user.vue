<template>
  <div class="w-full min-h-screen  bg-[#F4F7FE] lg:p-20 font-sans text-[#1e293b]">
    
    <header class="mb-10">
      <div class="flex items-center gap-2 mb-1">
        <div class="w-1 h-6 bg-[#4F46E5] rounded-full"></div>
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Configuración</span>
      </div>
      <h1 class="text-4xl font-extrabold text-[#0F172A] tracking-tight">Mi Perfil</h1>
    </header>

    <div class="space-y-8">
      
      <section class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div class="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="id-card" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M20 21v-2a4 4 0 0 0-3-3.87m-7 0A4 4 0 0 0 4 19v2" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg text-[#0F172A]">Datos del Perfil</h3>
          </div>
          <span v-if="isModified" class="text-[10px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold animate-pulse">
            TIENES CAMBIOS PENDIENTES
          </span>
        </div>

        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Nombres <span class="text-rose-500">*</span></label>
            <input type="text" v-model="name" class="input-field" placeholder="Nombre(s)">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Apellidos <span class="text-rose-500">*</span></label>
            <input type="text" v-model="lastName" class="input-field" placeholder="Apellido(s)">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Documento de Identidad <span class="text-rose-500">*</span></label>
            <input type="text" v-model="document" class="input-field" placeholder="C.C. / NIT">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Teléfono de contacto <span class="text-rose-500">*</span></label>
            <input type="text" v-model="cel" class="input-field" placeholder="Ej: 300 123 4567">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Ciudad / Municipio <span class="text-rose-500">*</span></label>
            <input type="text" v-model="municipality" class="input-field" placeholder="Ciudad">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 ml-1 uppercase">Dirección de residencia <span class="text-rose-500">*</span></label>
            <input type="text" v-model="address" class="input-field" placeholder="Calle, Carrera, Apto">
          </div>
        </div>

        <div class="p-6 bg-slate-50/50 flex justify-end border-t border-slate-100">
          <button @click="UserPut" :disabled="!isModified" class="btn-save">
            Guardar Cambios
          </button>
        </div>
      </section>

      <section class="bg-[#111827] rounded-3xl p-1 shadow-2xl overflow-hidden">
        <div class="p-8 text-white">
          <div class="flex items-center gap-3 mb-8">
            <div class="p-2 bg-white/10 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-lg leading-none">Seguridad</h3>
              <p class="text-slate-400 text-xs mt-1">Credenciales de acceso al sistema</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico</label>
              <input type="email" v-model="email" class="input-dark" placeholder="correo@ejemplo.com">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Contraseña</label>
              <input type="password" v-model="password" class="input-dark" placeholder="••••••••••••">
            </div>
          </div>
        </div>
        <div class="p-6 bg-white/5 flex justify-end">
          <button @click="UserPut" :disabled="!isModified" class="btn-save-dark">
            Actualizar Seguridad
          </button>
        </div>
      </section>

      <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 class="text-[#04162d] font-bold text-lg mb-6 flex items-center gap-2">
           <span class="w-2 h-2 bg-green-500 rounded-full"></span>
           Soporte Técnico
        </h3>
        <footerUs />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import footerUs from "@/components/footer.vue";
import { usersStore } from "../store/users.js";
import { LoginStore } from "../store/login.js";

// Inicialización de Tiendas
const storeUsers = usersStore();
const storeLogin = LoginStore();

// Estados Reactivos
const id = ref();
const name = ref();
const lastName = ref();
const document = ref();
const email = ref();
const cel = ref();
const municipality = ref();
const address = ref();
const password = ref();
const user = ref(storeLogin.Email);

const originalData = ref({});

// --- FUNCIONALIDAD ---

async function UsersGet() {
  const res = await storeUsers.GetUsersEmail(storeLogin.Email);
  if (res && res.status < 299) {
    const userData = res.data[0] || res.data; // Manejo por si viene array o objeto único
    
    // Asignación de valores
    id.value = userData._id;
    name.value = userData.Name;
    lastName.value = userData.LastName;
    document.value = userData.Document;
    email.value = userData.Email;
    cel.value = userData.Cel;
    municipality.value = userData.Municipio;
    address.value = userData.Address;
    password.value = userData.Password;

    // Guardar copia para detectar cambios
    originalData.value = {
      name: name.value,
      lastName: lastName.value,
      document: document.value,
      email: email.value,
      cel: cel.value,
      municipality: municipality.value,
      address: address.value,
      password: password.value
    };
  }
}

async function UserPut() {
  const res = await storeUsers.PutUser(
    id.value,
    document.value,
    name.value,
    lastName.value,
    cel.value,
    address.value,
    email.value,
    municipality.value,
    password.value,
    user.value
  );
  
  // Refrescar datos después de guardar
  await UsersGet();
  alert("Datos actualizados correctamente");
}

// Lógica de validación de cambios
const isModified = computed(() => {
  return (
    name.value !== originalData.value.name ||
    lastName.value !== originalData.value.lastName ||
    document.value !== originalData.value.document ||
    email.value !== originalData.value.email ||
    cel.value !== originalData.value.cel ||
    municipality.value !== originalData.value.municipality ||
    address.value !== originalData.value.address ||
    password.value !== originalData.value.password
  );
});

onMounted(() => {
  UsersGet();
});
</script>

<style scoped>
/* Clases de utilidad personalizadas para Meridian Logic */

.input-field {
  @apply w-full py-3 px-4 outline-none rounded-2xl border border-slate-200 
         bg-slate-50/50 text-sm font-semibold transition-all duration-300
         focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
         placeholder:font-normal placeholder:text-slate-400 text-slate-700;
}

.input-dark {
  @apply w-full py-3 px-4 outline-none rounded-2xl border border-white/10 
         bg-white/5 text-sm font-semibold transition-all duration-300
         focus:bg-white/10 focus:border-indigo-400 text-white
         placeholder:text-slate-500;
}

.btn-save {
  @apply px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300
         bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/20
         disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed;
}

.btn-save-dark {
  @apply px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300
         bg-white text-[#111827] hover:bg-slate-100 
         disabled:opacity-20 disabled:cursor-not-allowed;
}

/* Transición suave para los elementos */
* {
  transition: all 0.2s ease-in-out;
}
</style>