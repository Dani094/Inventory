<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-purple-600 rounded-full"></div>
          HISTORIAL
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Registro completo de movimientos de inventario </p>
      </div>

      <div class="flex items-center gap-3">
        <Report :history="true" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-purple-50 p-4 rounded-2xl">
          <span class="material-icons text-purple-600">history</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Movimientos</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ TotalMovements?.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[1rem] border border-gray-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar en el historial..."
            class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-[10px] outline-none focus:ring-2 focus:ring-purple-500/20 border border-transparent focus:border-purple-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Fecha </th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Tipo</th> 
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Producto</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio Unidad</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio total</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Stock</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Descripción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332]">{{ row.createdAt?.slice(0, 10) }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span :class="getTypeBadge(row.Type)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ row.Type }}
                </span>
              </td>
              <td class="px-6 py-5">
                <span class="font-bold text-[#1a2332] uppercase">{{ row.Name }}</span>
              </td>
              <td class="px-6 py-5">
                <span class="text-[14px] font-mono text-gray-800 uppercase tracking-tighter">{{ row.PriceBuy  || 'Sin Precio' }}$</span>
              </td>
              <td class="px-6 py-5">
                <span class="text-[14px] font-mono text-gray-800 uppercase tracking-tighter">{{ (row.PriceBuy * row.Units).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'Sin Precio' }}$</span>
              </td>
              <td class="px-2 py-5 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="flex items-center gap-2">
                  <div :class="getQuantityColor(row.Type)" class="w-2.5 h-2.5 rounded-full"></div>
                  <span class="font-bold text-[#1a2332]">{{ row.Units }}</span>
                </div>
                <!-- Detalle del cambio de stock -->
                <span class="text-[13px] text-gray-400 font-mono mt-0.5">
                  ({{ row.previousStock }} → {{ row.newStock }})
                </span>
              </div>
            </td>
            <td  class="px-6 py-5">
                <span class="text-gray-600 text-xs font-medium  line-clamp-2">{{ row.description }}</span>
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0" class="hover:bg-gray-50/50">
              <td colspan="7" class="px-6 py-8 text-center text-gray-400 font-medium">
                No hay movimientos registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       <div class="p-4 px-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
        
        <!-- Selector de cantidad por página e indicador -->
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

        <!-- Botones de Navegación -->
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
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Report from "@/components/descargarExcel.vue";
import { historyStore } from "@/store/history.js";
import { LoginStore } from "../store/login.js";

const storeHistory = historyStore();
const storeLogin = LoginStore();

// Estados de la Interfaz
let filter = ref("");
let filterType = ref("");
let TotalMovements = ref(0);
let rows = ref([]);

// variables paginacion 
const currentPage = ref(1)
const itemsPerPage = ref(4)
const totalPages = ref(1)
const totalRecords = ref(0)

const filteredRows = computed(() => rows.value);


/**
 * Obtiene el historial real desde la base de datos (History collection)
 */
async function getHistory() {
  try {
    // Consultamos únicamente el historial completo (Entradas y Salidas)
    const historyRes = await storeHistory.Gethistory(storeLogin.Email,{
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: filter.value
    });
    console.log(historyRes);

    const historyData = historyRes.data?.history || [];
    

    if (historyRes.data.pagination) {
      totalPages.value = historyRes.data.pagination.totalPages;
      totalRecords.value = historyRes.data.pagination.totalRecords;
    }

    // Formateamos y ordenamos por fecha más reciente
    rows.value = historyData.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    TotalMovements.value = rows.value.length;
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    rows.value = [];
  }
}



// 3. Métodos para cambiar de página
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

// 4. Volver a consultar al backend cuando cambie la página o el tamaño de página
watch([currentPage, itemsPerPage], () => {
  getHistory();
});

// 5. Al escribir en la búsqueda, reseteamos a la página 1 y consultamos con 'debounce' implícito o directo
let filterTimeout;
watch(filter, () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    currentPage.value = 1;
    getHistory();
  }, 300); // Espera 300ms después de escribir para no saturar la API
});




/**
 * Retorna el estilo de badge según el tipo de movimiento
 */
const getTypeBadge = (type) => {
  if (type === "Salida") {
    return "bg-orange-50 text-orange-700 border border-orange-100";
  }
  return "bg-emerald-50 text-emerald-700 border border-emerald-100";
};

/**
 * Retorna el color del indicador según el tipo de movimiento
 */
const getQuantityColor = (type) => {
  return type === "Salida" ? "bg-orange-500" : "bg-emerald-500";
};

/**
 * Filtra las filas por búsqueda y tipo
 */
// const filteredRows = computed(() => {
//   return rows.value.filter(row => {
//     const matchesSearch = !filter.value || 
//       row.Name?.toLowerCase().includes(filter.value.toLowerCase()) ||
//       row.Serial?.toLowerCase().includes(filter.value.toLowerCase()) ||
//       row.UserEmail?.toLowerCase().includes(filter.value.toLowerCase()) ||
//       row.UserUpdate?.toLowerCase().includes(filter.value.toLowerCase());
    
//     const matchesType = !filterType.value || row.Type === filterType.value;
    
//     return matchesSearch && matchesType;
//   });
// });

// Carga inicial de datos
onMounted(() => {
  getHistory();
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