<template>
  <div class="lg:p-10 p-6 bg-[#f8fafc] min-h-screen">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-purple-600 rounded-full"></div>
          CLIENTES
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Gestión de datos de contacto, historial e información de clientes</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Botón para crear cliente -->
        <button 
          @click="(showModal = true), cleanForm()"
          class="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white font-bold rounded-[10px] shadow-sm hover:bg-purple-700 transition-all text-sm cursor-pointer"
        >
          <span class="material-icons text-lg">person_add</span>
          Nuevo Cliente
        </button>
      </div>
    </div>

    <!-- Métrica Principal -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-purple-50 p-4 rounded-2xl">
          <span class="material-icons text-purple-600">groups</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Clientes</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ totalClients?.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <!-- Tabla y Buscador -->
    <div class="bg-white rounded-[1rem] border border-gray-200 shadow-sm overflow-hidden mb-40">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar cliente por nombre, CC/NIT, teléfono o correo..."
            class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-[10px] outline-none focus:ring-2 focus:ring-purple-500/20 border border-transparent focus:border-purple-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Cliente / Documento</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Teléfono / Email</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Ciudad / Dirección</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Estado</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <!-- Nombre e Identificación -->
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332] uppercase">{{ row.Name }}</span>
                  <span class="text-[12px] font-mono text-gray-400 tracking-tighter">
                    Doc: {{ row.document || row.Nit || 'Sin registro' }}
                  </span>
                </div>
              </td>

              <!-- Información de contacto -->
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332] text-xs">{{ row.telephone || 'Sin Teléfono' }}</span>
                  <span class="text-[11px] text-gray-400 font-medium">{{ row.email || 'Sin correo' }}</span>
                </div>
              </td>

              <!-- Ubicación -->
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="text-gray-600 text-xs font-medium">{{ row.town || 'Sin Ciudad' }}</span>
                  <span class="text-[11px] text-gray-400">{{ row.address || 'Sin Dirección' }}</span>
                </div>
              </td>

              <!-- Estado -->
              <td class="px-6 py-5 text-center">
                <span :class="getStatusBadge(row.state)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ row.state ? 'Activo' : 'Inactivo' }}
                </span>
              </td>

              <!-- Acciones -->
              <td class="px-6 py-5 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="openEdit(row)"
                    class="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors"
                    title="Editar"
                  >
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button 
                    @click="deleteClient(row)"
                    class="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                    title="Eliminar"
                  >
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Estado Vacío -->
            <tr v-if="rows.length === 0" class="hover:bg-gray-50/50">
              <td colspan="5" class="px-6 py-8 text-center text-gray-400 font-medium">
                No se encontraron clientes registrados
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Paginación -->
        <div class="p-4 px-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <div class="flex items-center gap-3">
            <span>Mostrar:</span>
            <select 
              v-model="itemsPerPage" 
              @change="currentPage = 1"
              class="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 outline-none text-gray-700 font-bold focus:border-blue-500 cursor-pointer"
            >
              <option :value="4">4</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
            <span>
              Mostrando {{ (currentPage - 1) * itemsPerPage + (rows.length ? 1 : 0) }} - 
              {{ Math.min(currentPage * itemsPerPage, totalRecords) }} 
              de {{ totalRecords }} registros
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="flex items-center justify-center p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <span class="material-icons text-base">chevron_left</span>
            </button>

            <span class="px-3 font-bold text-[#1a2332]">
              Página {{ currentPage }} de {{ totalPages }}
            </span>

            <button 
              @click="nextPage" 
              :disabled="currentPage >= totalPages"
              class="flex items-center justify-center p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <span class="material-icons text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear/editar cliente -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModal = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[10px] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between items-center text-xl">
          <h3 v-if="!isEditing" class="font-black uppercase tracking-tight">Agregar Cliente</h3>
          <h3 v-else class="font-black uppercase tracking-tight">Editar Cliente</h3>
          <button @click="showModal = false" class="hover:text-gray-300 transition-colors">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-8 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <!-- Nombre -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Nombre Completo / Razón Social</span>
              <input 
                required 
                v-model="name" 
                placeholder="Nombre del cliente" 
                type="text" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
                oninvalid="this.setCustomValidity('El nombre del cliente es obligatorio')" 
                oninput="this.setCustomValidity('')"
              >
            </div>

            <!-- Documento / NIT -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Cédula / NIT</span>
              <input 
                required 
                v-model="documentNumber" 
                placeholder="Número de identificación" 
                type="text" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
              >
            </div>

            <!-- Teléfono -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Teléfono</span>
              <input 
                required 
                v-model="telephone" 
                placeholder="Teléfono o Celular" 
                type="text" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
              >
            </div>

            <!-- Correo -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Correo Electrónico</span>
              <input 
                v-model="email" 
                placeholder="correo@ejemplo.com" 
                type="email" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
              >
            </div>

            <!-- Ciudad -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Ciudad o municipio</span>
              <input 
                required 
                v-model="town" 
                placeholder="Ciudad de residencia" 
                type="text" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
              >
            </div>

            <!-- Dirección -->
            <div>
              <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider block mb-0.5">Dirección</span>
              <input 
                v-model="address" 
                placeholder="Dirección de residencia o entrega" 
                type="text" 
                class="w-full bg-gray-100 rounded-[10px] p-3 border-none text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
              >
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-[#1a2332] hover:bg-[#28354a] text-white font-bold py-3 rounded-[10px] transition-colors cursor-pointer disabled:opacity-50"
          >
            {{ loading ? 'GUARDANDO...' : 'GUARDAR' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { customerStore } from "@/store/customer.js"; // Asegúrate de crear este archivo de store
import { LoginStore } from "@/store/login.js";
import { sweetDelete } from "@/Global/notify";

const storeCustomer = customerStore();
const storeLogin = LoginStore();

// Estados de la Interfaz
const filter = ref("");
const totalClients = ref(0);

let loading = ref(false);
let showModal = ref(false);
let isEditing = ref(false);

// Campos del Formulario
let name = ref("");
let documentNumber = ref("");
let telephone = ref("");
let email = ref("");
let town = ref("");
let address = ref("");
let state = ref(true);

let index = ref(null);
let user = ref(storeLogin.Email);

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalPages = ref(1);
const totalRecords = ref(0);

const rows = ref([]);
const filteredRows = computed(() => rows.value);

/**
 * Obtiene la lista de clientes desde la API
 */
async function getClients() {
  try {
    const res = await storeCustomer.GetCustomers(storeLogin.Email, {
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: filter.value
    }); 
    console.log("Respuesta de clientes:", res);

    if (res?.status < 299) {
      rows.value = res.data?.customers || res.data?.rows || [];
      if (res.data?.pagination) {
        totalPages.value = res.data.pagination.totalPages;
        totalRecords.value = res.data.pagination.totalRecords;
        totalClients.value = res.data.pagination.totalRecords;
      }
      console.log("Clientes obtenidos:", rows.value);
    }
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    rows.value = [];
  }
}

// Controladores de Paginación
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Reaccionar a cambios en la página actual o límite por página
watch([currentPage, itemsPerPage], () => {
  getClients();
});

// Debounce para búsqueda sin saturar el servidor
let filterTimeout;
watch(filter, () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    currentPage.value = 1;
    getClients();
  }, 300);
});

// Handlers de acción
async function handleSubmit() {
  if (isEditing.value) {
    await editClient();
  } else {
    await clientPost();
  }
}

async function clientPost() {
  loading.value = true;
  try {
    const payload = {
      Name: name.value,
      document: documentNumber.value,
      telephone: telephone.value,
      email: email.value,
      town: town.value,
      address: address.value,
      UserEmail: user.value,
    };

    const res = await storeCustomer.CreateCustomer(payload);

    if (res?.status === 200 || res?.status === 201) {
      showModal.value = false;
      cleanForm();
      getClients();
    } else {
      alert("Error al crear el cliente");
    }
  } catch (error) {
    console.error("Error al crear el cliente:", error);
  } finally {
    loading.value = false;
  }
}

async function editClient() {
  loading.value = true;
  try {
    const res = await storeCustomer.UpdateCustomer(index.value, {
      Name: name.value,
      document: documentNumber.value,
      telephone: telephone.value,
      email: email.value,
      town: town.value,
      address: address.value,
      UserUpdate: user.value
    });

    if (res?.status < 299) {
      showModal.value = false;
      isEditing.value = false;
      cleanForm();
      getClients();
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
  } finally {
    loading.value = false;
  }
}

const deleteClient = async (data) => {
  sweetDelete(data, async () => {
    await storeCustomer.DeleteCustomer(data._id);
    getClients();
  });
};

function openEdit(row) {
  index.value = row._id;
  isEditing.value = true;
  goInfo(row);
  showModal.value = true;
}

function goInfo(data) {
  console.log(data);
  
  name.value = data.Name || "";
  documentNumber.value = data.document || data.Nit || "";
  telephone.value = data.telephone || "";
  email.value = data.email || "";
  town.value = data.town || "";
  address.value = data.address || "";
}

function cleanForm() {
  name.value = "";
  documentNumber.value = "";
  telephone.value = "";
  email.value = "";
  town.value = "";
  address.value = "";
  isEditing.value = false;
  index.value = null;
}

/**
 * Retorna el estilo de badge de estado
 */
const getStatusBadge = (state) => {
  return state 
    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
    : "bg-orange-50 text-orange-700 border border-orange-100";
};

// Carga inicial
onMounted(() => {
  getClients();
});
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>