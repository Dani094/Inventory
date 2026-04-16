<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-purple-600 rounded-full"></div>
          HISTORIAL
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Registro completo de movimientos de inventario y salidas</p>
      </div>

      <div class="flex items-center gap-3">
        <Report :history="true" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="bg-purple-50 p-4 rounded-2xl">
          <span class="material-icons text-purple-600">history</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Movimientos</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ TotalMovements?.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar en el historial..."
            class="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 border border-transparent focus:border-purple-500 transition-all text-sm"
          >
        </div>
        <select 
          v-model="filterType"
          class="px-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 border border-transparent focus:border-purple-500 transition-all text-sm"
        >
          <option value="">Todos los tipos</option>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Fecha / Tipo</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Producto</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Serial</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Cantidad</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio Unit.</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Total</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Usuario</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332]">{{ row.createdAt?.slice(0, 10) }}</span>
                  <span :class="getTypeBadge(row.Type)" class="text-[10px] font-bold uppercase tracking-tighter inline-w-max px-2 py-1 rounded-lg">
                    {{ row.Type }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="font-bold text-[#1a2332] uppercase">{{ row.Name }}</span>
              </td>
              <td class="px-6 py-5">
                <span class="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{{ row.Serial || 'Sin Serial' }}</span>
              </td>
              <td class="px-6 py-5 text-center">
                <div class="flex items-center justify-center gap-2">
                  <div :class="getQuantityColor(row.Type)" class="w-2.5 h-2.5 rounded-full"></div>
                  <span class="font-bold text-[#1a2332]">{{ row.Units }}</span>
                </div>
              </td>
              <td class="px-6 py-5 font-bold text-[#1a2332]">
                $ {{ row.Price?.toLocaleString() || 'N/A' }}
              </td>
              <td class="px-6 py-5">
                <span class="font-black text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl text-xs">
                  $ {{ (row.Price * row.Units)?.toLocaleString() || 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-5">
                <span class="text-gray-600 text-xs font-medium">{{ row.UserEmail || row.UserUpdate || 'Sistema' }}</span>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Report from "@/components/descargarExcel.vue";
import { inventoryStore } from "@/store/inventory.js";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";

const storeInventory = inventoryStore();
const storeExits = exitStore();
const storeLogin = LoginStore();

// Estados de la Interfaz
let filter = ref("");
let filterType = ref("");
let TotalMovements = ref(0);
let rows = ref([]);

/**
 * Obtiene el historial combinado de inventario y salidas
 */
async function getHistory() {
  try {
    // Obtener salidas
    const exitsRes = await storeExits.GetExits(storeLogin.Email);
    const exits = exitsRes?.data?.map(e => ({
      ...e,
      Type: "Salida"
    })) || [];

    // Obtener inventario (todos los productos del inventario)
    const inventoryRes = await storeInventory.GetInventory(storeLogin.Email);
    const inventory = inventoryRes?.data?.map(i => ({
      ...i,
      Type: "Entrada"
    })) || [];

    // Combinar y ordenar por fecha más reciente
    rows.value = [...exits, ...inventory].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB - dateA;
    });

    TotalMovements.value = rows.value.length;
  } catch (error) {
    console.error("Error al obtener historial:", error);
    rows.value = [];
  }
}

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
const filteredRows = computed(() => {
  return rows.value.filter(row => {
    const matchesSearch = !filter.value || 
      row.Name?.toLowerCase().includes(filter.value.toLowerCase()) ||
      row.Serial?.toLowerCase().includes(filter.value.toLowerCase()) ||
      row.UserEmail?.toLowerCase().includes(filter.value.toLowerCase()) ||
      row.UserUpdate?.toLowerCase().includes(filter.value.toLowerCase());
    
    const matchesType = !filterType.value || row.Type === filterType.value;
    
    return matchesSearch && matchesType;
  });
});

// Carga inicial de datos
onMounted(() => {
//   getHistory();
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