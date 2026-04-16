<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-[#770202] rounded-full"></div>
          INVENTARIO
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Gestión de activos y stock en tiempo real</p>
      </div>

      <div class="flex items-center gap-3">
        <Report :inventory="true" />
        <button 
          @click="(showModal = true), cleanForm()"
          class="bg-[#1a2332] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <span class="material-icons text-sm">add</span>
          Nuevo Item
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="bg-blue-50 p-4 rounded-2xl">
          <span class="material-icons text-blue-600">inventory_2</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Unidades</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ TotalUnits?.toLocaleString() }}</h3>
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
            placeholder="Buscar en el ledger..."
            class="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Producto / Vencimiento</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Proveedor / Serial</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Stock</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio Unit.</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 ">Valor Total</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Estado</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332] uppercase">{{ row.Name }}</span>
                  <span class="text-[11px] text-gray-400 italic">Vence: {{ row.ExpirationDate ? row.ExpirationDate.slice(0, 10) : 'N/A' }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col text-sm text-gray-600">
                  <span class="font-medium text-gray-700">{{ row.Supplier }}</span>
                  <span class="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{{ row.Serial || 'Sin Serial' }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2">
                  <div :class="getStockColor(row.Units)" class="w-2.5 h-2.5 rounded-full"></div>
                  <span class="font-bold text-[#1a2332] text-lg">{{ row.Units.toLocaleString() }}</span>
                </div>
              </td>
              <td class="px-6 py-5 font-bold text-[#1a2332]">
                $ {{ row.Price.toLocaleString() }}
              </td>
              <td class="px-6 py-5">
                <span class="font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl text-xs">
                  $ {{ (row.Price * row.Units).toLocaleString() }}
                </span>
              </td>
              <td class="px-6 py-5">
                <span :class="getStateBadge(row.State)" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border">
                  {{ row.State }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEdit(row)" class="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button @click="openExit(row)" class="p-2 hover:bg-orange-50 text-orange-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">logout</span>
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

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModal = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Nuevo Producto</h3>
          <button @click="showModal = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="InventoryPost" class="p-8 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input v-model="supplier" placeholder="Proveedor" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="name" placeholder="Nombre" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="units" placeholder="Unidades" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="price" placeholder="Precio" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="serial" placeholder="Serial" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="expirationDate" placeholder="Fecha de Vencimiento" type="date" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <select v-model="copias" class="bg-gray-50 rounded-2xl p-3 border-none text-sm text-gray-600">
              <option value="" disabled>¿Copias?</option>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
            <input v-if="copias === 'Sí'" v-model="crearCopias" placeholder="Cantidad de copias" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm" min="1">
          </div>
          <button type="submit" class="w-full bg-[#1a2332] text-white font-bold py-3 rounded-2xl">GUARDAR</button>
        </form>
      </div>
    </div>

    <div v-if="showModalEdit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalEdit = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Editar Producto</h3>
          <button @click="showModalEdit = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="InventoryPut" class="p-8 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input v-model="supplier" placeholder="Proveedor" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="name" placeholder="Nombre" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="units" placeholder="Unidades" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="price" placeholder="Precio" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="serial" placeholder="Serial" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="expirationDate" placeholder="Fecha de Vencimiento" type="date" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl">ACTUALIZAR</button>
        </form>
      </div>
    </div>

    <div v-if="showModalExits" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalExits = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-orange-600 p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Registrar Salida</h3>
          <button @click="showModalExits = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="ExitsPost" class="p-8 space-y-4">
          <div class="p-3 bg-orange-50 rounded-xl text-orange-700 text-xs font-bold mb-10">{{ nameExit }}</div>
          <div class="grid grid-cols-2 gap-1 ">
            <label class="" for="">Cantidad:</label>
            <label class="" for="">Descuento:</label>
            <input v-model="unitsExit" placeholder="Cantidad" type="number" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
            <input v-model="discount" placeholder="Descuento" type="number" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
          </div>
          <button type="submit" class="w-full bg-orange-600 text-white font-bold py-3 rounded-2xl">CONFIRMAR</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Report from "@/components/descargarExcel.vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";
import { exitStore } from "../store/exits.js";
import { sweetDelete } from "@/Global/notify";

const storeInventory = inventoryStore();
const storeLogin = LoginStore();
const storeExits = exitStore();

// Visibilidad de Modales
let showModal = ref(false);
let showModalEdit = ref(false);
let showModalExits = ref(false);
let loading = ref(false);
let filter = ref("");

// Variables de Formulario
let index = ref();
let supplier = ref("");
let name = ref("");
let serial = ref("");
let units = ref(0);
let price = ref(0);
let expirationDate = ref("");
let state = ref("Disponible");
let user = ref(storeLogin.Email);
let TotalUnits = ref(0);
let copias = ref("");
let crearCopias = ref(0);

// Variables Salidas
let nameExit = ref("");
let serialExit = ref("");
let units2 = ref(0);
let unitsExit = ref(0);
let priceExit = ref(0);
let discount = ref(0);

let rows = ref([]);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  return rows.value.filter(r => 
    r.Name.toLowerCase().includes(filter.value.toLowerCase()) ||
    r.Supplier.toLowerCase().includes(filter.value.toLowerCase())
  );
});

// Funciones de Botones
function openEdit(row) {
  index.value = row._id;
  goInfo(row);
  showModalEdit.value = true;
}

function openExit(row) {
  index.value = row._id;
  goInfo2(row);
  cleanForm();
  showModalExits.value = true;
}

const getStockColor = (u) => u <= 0 ? 'bg-rose-500 animate-pulse' : (u < 10 ? 'bg-amber-500' : 'bg-emerald-500');

const getStateBadge = (s) => s === 'Disponible' 
  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
  : 'bg-rose-50 text-rose-700 border-rose-100';

// Lógica de API
async function InventoryGet() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res?.status < 299) {
    rows.value = res.data;
    TotalUnits.value = rows.value.reduce((t, r) => t + r.Units, 0);
  }
}

async function InventoryPost() {
  loading.value = true;
  await storeInventory.PostInventory(supplier.value, name.value, serial.value, units.value, price.value, expirationDate.value, user.value);
  
  if (crearCopias.value >= 1) {
    const itemToDuplicate = {
      Supplier: supplier.value,
      Name: name.value,
      Serial: serial.value,
      Units: units.value,
      Price: price.value,
      ExpirationDate: expirationDate.value,
      UserEmail: user.value,
    };
    for (let i = 0; i < crearCopias.value; i++) {
      const duplicatedItem = {
        ...itemToDuplicate,
      };
      await storeInventory.PostInventory(
        duplicatedItem.Supplier,
        duplicatedItem.Name,
        duplicatedItem.Serial,
        duplicatedItem.Units,
        duplicatedItem.Price,
        duplicatedItem.ExpirationDate,
        duplicatedItem.UserEmail
      );
    }
  }
  
  showModal.value = false;
  InventoryGet();
  loading.value = false;
}

async function InventoryPut() {
  loading.value = true;
  await storeInventory.PutInventory(index.value, supplier.value, name.value, serial.value, units.value, price.value, expirationDate.value, user.value);
  showModalEdit.value = false;
  InventoryGet();
  loading.value = false;
}



async function ExitsPost() {
  // 1. Convertimos todo a números reales para evitar errores de cálculo
  const cantSalida = Number(unitsExit.value);
    const stockActual = Number(units2.value);

  // 2. Validación de seguridad
  if (cantSalida <= 0 || cantSalida > stockActual) {
    alert("Cantidad no válida o stock insuficiente");
    return;
  }

  loading.value = true;
  try {
    // 3. Registramos la salida
    const resExit = await storeExits.PostExits({
      IdProduct: index.value,
      NumBill: null,
      Name: nameExit.value,
      Serial: serialExit.value,
      Units: parseFloat(unitsExit.value),
      Price:  parseFloat(priceExit.value),
      Discount: parseFloat(discount.value),
      UserEmail: user.value,
    });

    // 4. EL DESCUENTO REAL:
    // Aquí es donde se "saca" del inventario. 
    // Asegúrate de enviar los valores como números.

    await storeInventory.PutUnits(
      index.value,  
      -cantSalida, 
    );
    
    // 5. Finalización
    showModalExits.value = false;
    
    // IMPORTANTE: Debemos esperar a que el inventario se recargue del servidor
    await InventoryGet(); 
    
    cleanForm();

  } catch (error) {
    console.error("Error en el proceso de salida:", error);
    alert("Hubo un error al descontar del inventario");
  } finally {
    loading.value = false;
  }
}

async function deleteItem(data) {
  sweetDelete(data, async () => {
    await storeInventory.DeleteInventory(data._id);
    InventoryGet();
  });
}

function goInfo(data) {
  supplier.value = data.Supplier; name.value = data.Name; serial.value = data.Serial;
  units.value = data.Units; price.value = data.Price; state.value = data.State;
}

function goInfo2(data) {
  nameExit.value = data.Name; serialExit.value = data.Serial;
  units2.value = data.Units; priceExit.value = data.Price;
}

function cleanForm() {
  supplier.value = "";
  name.value = "";
  serial.value = "";
  units.value = 0;
  price.value = 0;
  expirationDate.value = "";
  copias.value = "";
  crearCopias.value = 0;
  unitsExit.value = 0;
  discount.value = 0;
}

onMounted(() => InventoryGet());
</script>

<style scoped>
.animate-modal { animation: pop 0.25s ease-out; }
@keyframes pop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>