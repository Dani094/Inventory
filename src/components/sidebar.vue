<template>
  <div
  class="bg-[#1a2332] h-full flex flex-col justify-between py-6 text-gray-400 z-40 transition-all border-r border-gray-800 shadow-2xl shrink-0"
  :class="[
    showSidebar 
      ? 'fixed left-0 w-72' 
      : 'fixed -left-full lg:static lg:translate-x-0 lg:w-64'
  ]"
>
    <div>
      <div class="px-6 mb-10 flex items-center gap-3">
        <div class="bg-white p-1 rounded-md">
           <img class="w-6 h-6 object-contain" src="../assets/logoNewxo.png" alt="Logo">
        </div>
        <div class="flex flex-col">
          <span class="text-white font-bold text-sm tracking-tight">Newxo System</span>
          <span class="text-[10px] uppercase tracking-widest text-gray-500">Centro de gestión</span>
        </div>
      </div>

      <nav class="space-y-1 px-3">
        <router-link to="/home" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">home</span>
            <span class="font-medium text-sm">Dashboard</span>
          </div>
        </router-link>

        <router-link to="/inventory" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">inventory_2</span>
            <span class="font-medium text-sm">Inventario</span>
          </div>
        </router-link>

        <router-link to="/exits" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">shopping_cart</span>
            <span class="font-medium text-sm">Ventas</span>
          </div>
        </router-link>

        <router-link to="/bill" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">payments</span>
            <span class="font-medium text-sm">Facturación</span>
          </div>
        </router-link>

        <router-link to="/history" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">history</span>
            <span class="font-medium text-sm">Historial</span>
          </div>
        </router-link>

        <router-link to="/user" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">settings</span>
            <span class="font-medium text-sm">Ajustes</span>
          </div>
        </router-link>

        <router-link v-if="storelogin.rol == 'Admin'" to="/users" v-slot="{ isActive }">
          <div :class="[isActive ? 'bg-[#2d3a4f] text-white' : 'hover:bg-[#252f41] hover:text-gray-200']" 
               class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group">
            <span class="material-icons text-xl" :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">group</span>
            <span class="font-medium text-sm">Usuarios</span>
          </div>
        </router-link>
      </nav>
    </div>

    <div class="px-4 space-y-4">
      <!-- <button class="w-full bg-white text-[#1a2332] font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-gray-100 transition shadow-white/5">
        <span class="material-icons text-sm">add</span>
        <span class="text-xs uppercase tracking-wider">Nueva Salida</span>
      </button> -->

      <div @click="logout()" class=" flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer group">
        <span class="material-icons text-xl">logout</span>
        <span class="font-medium text-sm">Cerrar Sesión</span>
      </div>
    </div>
  </div>

  <nav class="bg-[#1a2332] lg:hidden fixed w-[94%] bottom-4 left-1/2 -translate-x-1/2 text-white py-3 px-6 flex items-center justify-between rounded-2xl z-50 shadow-2xl border border-gray-700">
    <router-link to="/home"><span class="material-icons text-gray-400 focus:text-white">home</span></router-link>
    <router-link to="/inventory"><span class="material-icons text-gray-400">inventory_2</span></router-link>
    <router-link to="/bill"><span class="material-icons text-gray-400">payments</span></router-link>
    <button @click="toggleSidebar()"><span class="material-icons text-white bg-blue-600 p-2 rounded-full shadow-lg shadow-blue-600/30">{{ showSidebar ? "close" : "menu" }}</span></button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LoginStore } from "../store/login.js";
import { useRouter } from "vue-router";

const storelogin = LoginStore();
const router = useRouter();

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
  @apply bg-[#2d3a4f] text-white;
}
</style>