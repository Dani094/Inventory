<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-sky-600 rounded-full"></div>
          CLIENTES
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Gestión de información, contacto y seguimiento de clientes</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="openCreate()"
          class="flex items-center gap-2 px-5 py-3 bg-sky-600 text-white font-bold rounded-[10px] shadow-sm hover:bg-sky-700 transition-all text-sm cursor-pointer"
        >
          <span class="material-icons text-lg">person_add</span>
          Nuevo Cliente
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-sky-50 p-4 rounded-2xl">
          <span class="material-icons text-sky-600">people</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Clientes</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ totalCustomers.toLocaleString() }}</h3>
        </div>
      </div>

      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-emerald-50 p-4 rounded-2xl">
          <span class="material-icons text-emerald-600">verified</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Activos</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ activeCustomers.toLocaleString() }}</h3>
        </div>
      </div>

      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-violet-50 p-4 rounded-2xl">
          <span class="material-icons text-violet-600">trending_up</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Compras este mes</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ purchasesThisMonth }}</h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[1rem] border border-gray-200 shadow-sm overflow-hidden mb-40">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input
            v-model="filter"
            type="text"
            placeholder="Buscar cliente..."
            class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-[10px] outline-none focus:ring-2 focus:ring-sky-500/20 border border-transparent focus:border-sky-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Cliente</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Documento</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Contacto</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Segmento</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Estado</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in paginatedRows" :key="row.id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a2332] uppercase">{{ row.name }}</span>
                  <span class="text-[10px] text-gray-400">{{ row.company || 'Cliente individual' }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="text-gray-700 font-medium">{{ row.document }}</span>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col">
                  <span class="text-gray-700">{{ row.phone }}</span>
                  <span class="text-[10px] text-gray-400">{{ row.email }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-100">
                  {{ row.segment }}</span>
              </td>
              <td class="px-6 py-5 text-center">
                <span :class="getStatusBadge(row.state)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ row.state ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
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
                    @click="deleteCustomer(row)"
                    class="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                    title="Eliminar"
                  >
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="paginatedRows.length === 0" class="hover:bg-gray-50/50">
              <td colspan="6" class="px-6 py-8 text-center text-gray-400 font-medium">
                No se encontraron clientes registrados
              </td>
            </tr>
          </tbody>
        </table>

        <div class="p-4 px-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <div class="flex items-center gap-3">
            <span>Mostrar:</span>
            <select
              v-model="itemsPerPage"
              class="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 outline-none text-gray-700 font-bold focus:border-sky-500 cursor-pointer"
            >
              <option :value="4">4</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
            <span>
              Mostrando {{ totalRecords ? (currentPage - 1) * itemsPerPage + 1 : 0 }} -
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

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="closeModal"></div>
      <div class="bg-white w-full max-w-lg rounded-[10px] shadow-2xl z-10 overflow-hidden">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between text-xl items-center">
          <h3 class="font-black uppercase tracking-tight">{{ isEditing ? 'Editar Cliente' : 'Agregar Cliente' }}</h3>
          <button @click="closeModal" class="hover:text-sky-400 transition-colors"><span class="material-icons">close</span></button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nombre</label>
              <input v-model="form.name" required type="text" placeholder="Nombre completo" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Documento</label>
                <input v-model="form.document" required type="text" placeholder="CC / NIT" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Teléfono</label>
                <input v-model="form.phone" type="text" placeholder="300 000 0000" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Correo</label>
              <input v-model="form.email" type="email" placeholder="cliente@correo.com" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Segmento</label>
                <select v-model="form.segment" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
                  <option value="Retail">Retail</option>
                  <option value="Mayorista">Mayorista</option>
                  <option value="VIP">VIP</option>
                  <option value="Nuevo">Nuevo</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Estado</label>
                <select v-model="form.state" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
                  <option :value="true">Activo</option>
                  <option :value="false">Inactivo</option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Empresa</label>
              <input v-model="form.company" type="text" placeholder="Empresa o negocio" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-sky-500/20 text-sm">
            </div>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-[#1a2332] text-white font-bold py-3 rounded-[10px] hover:bg-sky-600 transition-colors disabled:opacity-50">
            {{ loading ? 'GUARDANDO...' : 'GUARDAR' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const rows = ref([
  {
    id: 1,
    name: "Ana María Gómez",
    document: "1023456789",
    phone: "3001234567",
    email: "ana.gomez@gmail.com",
    company: "Gómez Boutique",
    segment: "Retail",
    state: true,
    purchases: 8,
  },
  {
    id: 2,
    name: "Carlos Velásquez",
    document: "901234567",
    phone: "3159876543",
    email: "carlos@mayorista.com",
    company: "Distribuciones CV",
    segment: "Mayorista",
    state: true,
    purchases: 15,
  },
  {
    id: 3,
    name: "Laura Torres",
    document: "2145678901",
    phone: "3104567890",
    email: "laura.torres@vip.com",
    company: "Torres & Cía.",
    segment: "VIP",
    state: false,
    purchases: 3,
  },
  {
    id: 4,
    name: "Javier Ruiz",
    document: "890123456",
    phone: "3016543210",
    email: "javier@nuevo.co",
    company: "Sin empresa",
    segment: "Nuevo",
    state: true,
    purchases: 2,
  },
  {
    id: 5,
    name: "Diana Pérez",
    document: "1087654321",
    phone: "3202223344",
    email: "diana@moda.com",
    company: "Diana Store",
    segment: "Retail",
    state: true,
    purchases: 10,
  },
  {
    id: 6,
    name: "Mateo Castro",
    document: "900765432",
    phone: "3123334455",
    email: "mateo@castro.co",
    company: "Castro Logistics",
    segment: "Mayorista",
    state: false,
    purchases: 4,
  },
]);

const filter = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(4);
const loading = ref(false);
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  document: "",
  phone: "",
  email: "",
  company: "",
  segment: "Retail",
  state: true,
});

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value;

  const search = filter.value.toLowerCase();
  return rows.value.filter((row) => {
    return (
      row.name?.toLowerCase().includes(search) ||
      row.document?.toLowerCase().includes(search) ||
      row.phone?.toLowerCase().includes(search) ||
      row.email?.toLowerCase().includes(search) ||
      row.company?.toLowerCase().includes(search) ||
      row.segment?.toLowerCase().includes(search)
    );
  });
});

const totalRecords = computed(() => filteredRows.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalRecords.value / itemsPerPage.value)));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredRows.value.slice(start, start + itemsPerPage.value);
});

const totalCustomers = computed(() => rows.value.length);
const activeCustomers = computed(() => rows.value.filter((item) => item.state).length);
const purchasesThisMonth = computed(() => rows.value.reduce((sum, item) => sum + Number(item.purchases || 0), 0));

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

watch(filter, () => {
  currentPage.value = 1;
});

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

const getStatusBadge = (state) => {
  return state
    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
    : "bg-orange-50 text-orange-700 border border-orange-100";
};

function openCreate() {
  isEditing.value = false;
  editingId.value = null;
  cleanForm();
  showModal.value = true;
}

function openEdit(row) {
  isEditing.value = true;
  editingId.value = row.id;
  form.value = {
    name: row.name,
    document: row.document,
    phone: row.phone,
    email: row.email,
    company: row.company,
    segment: row.segment,
    state: row.state,
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  cleanForm();
}

function cleanForm() {
  form.value = {
    name: "",
    document: "",
    phone: "",
    email: "",
    company: "",
    segment: "Retail",
    state: true,
  };
}

async function handleSubmit() {
  loading.value = true;

  try {
    if (isEditing.value && editingId.value !== null) {
      const index = rows.value.findIndex((item) => item.id === editingId.value);
      if (index !== -1) {
        rows.value[index] = {
          ...rows.value[index],
          ...form.value,
        };
      }
    } else {
      const newCustomer = {
        id: Date.now(),
        ...form.value,
        purchases: 0,
      };
      rows.value.unshift(newCustomer);
    }

    closeModal();
  } catch (error) {
    console.error("Error al guardar cliente:", error);
  } finally {
    loading.value = false;
  }
}

function deleteCustomer(row) {
  const confirmDelete = window.confirm(`¿Deseas eliminar a ${row.name}?`);
  if (confirmDelete) {
    rows.value = rows.value.filter((item) => item.id !== row.id);
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  }
}

onMounted(() => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Scrollbar personalizada para la tabla */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
