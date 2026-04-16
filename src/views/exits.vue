<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-orange-600 rounded-full"></div>
          SALIDAS
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Registro histórico de despachos y ventas</p>
      </div>

      <div class="flex items-center gap-3">
        <Report :exits="true" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="bg-orange-50 p-4 rounded-2xl">
          <span class="material-icons text-orange-600">logout</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Items Retirados</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ TotalUnits?.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar salida..."
            class="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 border border-transparent focus:border-orange-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Factura / Fecha</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Producto</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Cant.</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Total</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors group text-sm">
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332]">#{{ row.NumBill || 'S/F' }}</span>
                  <span class="text-[10px] text-gray-400">{{ row.createdAt?.slice(0, 10) }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332] uppercase">{{ row.Name }}</span>
                  <span class="text-[10px] text-gray-400">{{ row.Serial || 'Sin Serial' }}</span>
                </div>
              </td>
              <td class="px-6 py-5 text-center font-black text-orange-600">{{ row.Units }}</td>
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332]">$ {{ (row.Price * row.Units).toLocaleString() }}</span>
                  <span v-if="row.Discount > 0" class="text-[10px] text-red-500 font-bold">- ${{ row.Discount.toLocaleString() }} Desc.</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex justify-center items-center gap-2">
                  <button @click="openEdit(row)" class="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button @click="deleteItem(row)" class="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModalEdit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalEdit = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between items-center">
          <h3 class="text-xl font-black uppercase tracking-tight">Editar Registro</h3>
          <button @click="showModalEdit = false" class="hover:rotate-90 transition-transform">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <form @submit.prevent="ExitsPut" class="p-8 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-gray-400 ml-2">Producto</label>
              <input v-model="nameExit" type="text" class="w-full bg-gray-50 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 border-none">
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-gray-400 ml-2">Serial</label>
              <input v-model="serialExit" type="text" class="w-full bg-gray-50 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 border-none">
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-gray-400 ml-2">Cant. Vendida</label>
              <input v-model="units2" type="number" class="w-full bg-gray-50 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 border-none">
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-gray-400 ml-2">Precio Unit.</label>
              <input v-model="priceExit" type="number" class="w-full bg-gray-50 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 border-none">
            </div>
            <div class="col-span-2 space-y-1">
              <label class="text-[10px] font-black uppercase text-gray-400 ml-2">Descuento Aplicado</label>
              <input v-model="discount" type="number" class="w-full bg-gray-50 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 border-none">
            </div>
          </div>

          <div class="flex gap-3">
            <button type="submit" :disabled="loading" class="flex-1 bg-[#1a2332] text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
              {{ loading ? 'GUARDANDO...' : 'ACTUALIZAR SALIDA' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Report from "@/components/descargarExcel.vue";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";
import { inventoryStore } from "@/store/inventory.js";
import { sweetDelete } from "@/Global/notify";

// Inicialización de Stores
const storeExits = exitStore();
const storeLogin = LoginStore();
const storeInventory = inventoryStore();

// Estados de la Interfaz (UI)
let showModalEdit = ref(false);
let loading = ref(false);
let filter = ref("");

// Variables del Formulario y Datos
let index = ref();
let nameExit = ref("");
let serialExit = ref("");
let units2 = ref();
let priceExit = ref();
let discount = ref("");
let user = ref(storeLogin.Email);
let TotalUnits = ref(0);
let rows = ref([]);

/**
 * Obtiene el historial de salidas desde el servidor
 */
async function ExitsGet() {
  try {
    const res = await storeExits.GetExits(storeLogin.Email);
    if (res && res.status < 299) {
      rows.value = res.data || [];
      TotalUnits.value = rows.value.reduce((total, row) => total + (Number(row.Units) || 0), 0);
    }
  } catch (error) {
    console.error("Error al obtener salidas:", error);
    rows.value = [];
  }
}

/**
 * Prepara los datos y abre el modal de edición
 */
function openEdit(row) {
  index.value = row._id;
  goInfo(row);
  showModalEdit.value = true;
}

/**
 * Llena las variables reactivas con la información de la fila seleccionada
 */
function goInfo(data) {
  nameExit.value = data.Name;
  serialExit.value = data.Serial;
  units2.value = data.Units;
  priceExit.value = data.Price;
  discount.value = data.Discount;
}

/**
 * Actualiza un registro de salida existente
 */
async function ExitsPut() {
  loading.value = true;
  try {
    await storeExits.PutExits(index.value, {
      Name: nameExit.value,
      Serial: serialExit.value,
      Units: parseFloat(units2.value),
      Price: parseFloat(priceExit.value),
      Discount: parseFloat(discount.value),
      UserUpdate: user.value
    });
    showModalEdit.value = false;
    await ExitsGet(); // Refresca la tabla
  } catch (error) {
    console.error("Error al actualizar salida:", error);
  } finally {
    loading.value = false;
  }
}

/**
 * Elimina una salida y devuelve el stock al inventario automáticamente
 */
async function deleteItem(data) {
  sweetDelete(data, async () => {
    try {

      console.log(data);
      
      // 1. Intentar devolver el stock al inventario
      if (data.IdProduct) {
        try {
          // Usamos el multiplicador -1 para sumar las unidades de vuelta
          const unitsToReturn = Number(data.Units);
          console.log(unitsToReturn);
          

          await storeInventory.PutUnits(
            data.IdProduct, 
            0, // Unidades actuales (el store suele manejar el cálculo interno)
            unitsToReturn, 
            "Disponible"
          );
          console.log("Stock devuelto exitosamente");
        } catch (invError) {
          console.error("Error al devolver stock, procediendo con la eliminación:", invError);
          // No bloqueamos el borrado si falla la devolución de stock
        }
      } else {
        console.warn("La salida no tiene IdProduct asociado.");
      }

      // 2. Borrar el registro de salida
      const res = await storeExits.DeleteExits(data._id);
      
      // 3. Refrescar datos de la vista
      if (res) {
        await ExitsGet(); 
        
        // Actualizar el store de inventario en segundo plano para mantener consistencia
        if (storeInventory.GetInventory) {
          storeInventory.GetInventory(storeLogin.Email).catch(e => console.log("Error refresh inv:", e));
        }
      }

    } catch (error) {
      console.error("Error crítico en deleteItem:", error);
    }
  });
}

/**
 * Limpia las variables del formulario
 */
function cleanForm() {
  nameExit.value = "";
  serialExit.value = "";
  units2.value = "";
  priceExit.value = "";
  discount.value = "";
}

/**
 * Filtro de búsqueda en tiempo real para la tabla
 */
const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const search = filter.value.toLowerCase();
  return rows.value.filter(row => 
    row.Name?.toLowerCase().includes(search) ||
    row.NumBill?.toString().includes(search) ||
    row.Serial?.toLowerCase().includes(search)
  );
});

// Carga inicial de datos
onMounted(() => {
  ExitsGet();
});
</script>

<style scoped>
.animate-modal {
  animation: pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes pop {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Scrollbar personalizada para la tabla */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>