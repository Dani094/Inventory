<template>
  <!-- Contenedor principal de la Sidebar -->

<div 
  v-if="showSidebar" 
  @click="showSidebar = false" 
  class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
></div>

<!-- BARRA LATERAL (ASIDE) -->
<!-- CAMBIO 1: Se sube a z-50 para que quede por encima de todo en móvil -->
<aside
  class="bg-[#1a2332] h-screen flex flex-col justify-between py-6 text-gray-400 z-50 transition-all duration-300 border-r border-gray-800 shadow-2xl shrink-0"
  :class="[
    showSidebar 
      ? 'fixed left-0 w-72' 
      : 'fixed -left-full lg:static lg:translate-x-0 lg:w-64'
  ]"
>
  <!-- Área Superior: Logo + Menú Navegable con Scroll -->
  <div class="flex flex-col flex-1 min-h-0">
    
    <!-- Header / Logo -->
    <div class="px-6 mb-8 flex items-center gap-3 shrink-0">
      <div class="rounded-md">
        <img class="w-10 h-10 object-contain" src="../assets/logoNewxo.png" alt="Logo">
      </div>
      <div class="flex flex-col">
        <span class="text-white font-bold text-sm tracking-tight">Newxo System</span>
        <span class="text-[10px] uppercase tracking-widest text-gray-500">Centro de gestión</span>
      </div>
    </div>

    <!-- Navegación con Scroll Independiente -->
    <nav class="space-y-1 px-3 overflow-y-auto custom-scrollbar flex-1">
      
      <!-- Dashboard -->
      <router-link to="/home" v-slot="{ isActive }">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">home</span>
          <span class="font-medium text-sm">Dashboard</span>
        </div>
      </router-link>

      <!-- MENÚ DESPLEGABLE: INVENTARIO / CATÁLOGO -->
      <div>
        <button 
          @click="isInventoryOpen = !isInventoryOpen"
          :class="[isInventoryActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']"
          class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center gap-4">
            <span class="material-icons text-xl" :class="isInventoryActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">inventory_2</span>
            <span class="font-medium text-sm">Gestión Stock</span>
          </div>
          <span class="material-icons text-lg transition-transform duration-200" :class="{ 'rotate-180': isInventoryOpen }">
            expand_more
          </span>
        </button>

        <!-- Subopciones Desplegables -->
        <div 
          class="grid transition-all duration-300 ease-in-out pl-11 pr-2 space-y-1"
          :class="[isInventoryOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 overflow-hidden']"
        >
          <div class="overflow-hidden space-y-1">
            <router-link to="/inventory" v-slot="{ isActive }">
              <div :class="[isActive ? 'text-white bg-[#2d3a4f]/60 font-semibold' : 'text-gray-400 hover:text-white hover:bg-[#252f41]/50']"
                   class="flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-all cursor-pointer">
                <span class="material-icons text-base">view_in_ar</span>
                <span>Productos</span>
              </div>
            </router-link>

            <router-link to="/categories" v-slot="{ isActive }">
              <div :class="[isActive ? 'text-white bg-[#2d3a4f]/60 font-semibold' : 'text-gray-400 hover:text-white hover:bg-[#252f41]/50']"
                   class="flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-all cursor-pointer">
                <span class="material-icons text-base">category</span>
                <span>Categorías</span>
              </div>
            </router-link>

            <router-link to="/suppliers" v-slot="{ isActive }">
              <div :class="[isActive ? 'text-white bg-[#2d3a4f]/60 font-semibold' : 'text-gray-400 hover:text-white hover:bg-[#252f41]/50']"
                   class="flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-all cursor-pointer">
                <span class="material-icons text-base">local_shipping</span>
                <span>Proveedores</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Historial -->
      <router-link to="/history" v-slot="{ isActive }">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">history</span>
          <span class="font-medium text-sm">Historial de inventario</span>
        </div>
      </router-link>

      <!-- Ventas -->
      <router-link to="/exits" v-slot="{ isActive }">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">shopping_cart</span>
          <span class="font-medium text-sm">Ventas</span>
        </div>
      </router-link>

      <!-- Facturación -->
      <router-link to="/bill" v-slot="{ isActive }" class="hidden lg:block">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">payments</span>
          <span class="font-medium text-sm">Facturación</span>
        </div>
      </router-link>

      <!-- Ajustes -->
      <router-link to="/user" v-slot="{ isActive }">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">settings</span>
          <span class="font-medium text-sm">Ajustes</span>
        </div>
      </router-link>

      <!-- Usuarios -->
      <router-link v-if="storelogin.rol == 'Admin'" to="/users" v-slot="{ isActive }">
        <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'text-gray-400 hover:bg-[#252f41] hover:text-gray-200']" 
             class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
          <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">group</span>
          <span class="font-medium text-sm">Usuarios</span>
        </div>
      </router-link>
    </nav>
  </div>

  <!-- Área Inferior -->
  <!-- CAMBIO 2: Se añade pb-6 lg:pb-0 para asegurar separación en móviles -->
  <div class="px-4 sm:pt-4 shrink-0 border-t border-gray-800/60 mt-2 pb-6 lg:pb-0">
    <div @click="logout()" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer group">
      <span class="material-icons text-xl">logout</span>
      <span class="font-medium text-sm">Cerrar Sesión</span>
    </div>
  </div>
</aside>

<!-- BARRA NAVEGACIÓN MÓVIL FLOTANTE -->
<!-- CAMBIO 3: z-40 y ocultamiento dinámico con opacity-0 pointer-events-none translate-y-10 cuando showSidebar es true -->
<nav 
  class="bg-[#1a2332] lg:hidden fixed w-[94%] bottom-3 left-1/2 -translate-x-1/2 text-white py-3 px-6 flex items-center justify-between rounded-2xl z-40 shadow-2xl border border-gray-700 transition-all duration-300"
  :class="[
    showSidebar 
      ? 'opacity-0 pointer-events-none translate-y-10' 
      : 'opacity-100 pointer-events-auto translate-y-0'
  ]"
>
  <router-link to="/home"><span class="material-icons text-gray-400 focus:text-white">home</span></router-link>
  <router-link to="/inventory"><span class="material-icons text-gray-400">inventory_2</span></router-link>
  <router-link to="/exits"><span class="material-icons text-gray-400">shopping_cart</span></router-link>
  <button @click="toggleSidebar()">
    <span class="material-icons text-white bg-blue-600 p-2 rounded-full shadow-lg shadow-blue-600/30">
      {{ showSidebar ? "close" : "menu" }}
    </span>
  </button>
</nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { LoginStore } from "../store/login.js";
import { useRouter } from "vue-router";

const storelogin = LoginStore();
const router = useRouter();

const isInventoryOpen = ref(false)

// Evalúa si la ruta actual pertenece a alguna subopción para mantener activo el botón principal
const isInventoryActive = computed(() => {
  return router.currentRoute.value.path.startsWith('/inventory')
})

// Opcional: Mantener abierto el menú automáticamente si la ruta activa es de inventario
if (isInventoryActive.value) {
  isInventoryOpen.value = true
}

let showSidebar = ref(false);
function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

const logout = () => {
  storelogin.logoutUser();
  router.push("/");
};

// Validación de sesión
onMounted(() => {
  const currentDate = new Date();
  const dateLogin = new Date(storelogin.dateLogin);
  if (currentDate > dateLogin.setDate(dateLogin.getDate() + 1)) {
    logout();
  }
});
</script>

<style scoped>
/* Para suavizar las transiciones de Tailwind */
.router-link-active div {
  background-color: #2d3a4f;
  color: #ffffff;
}
</style>