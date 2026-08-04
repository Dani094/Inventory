<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-purple-600 rounded-full"></div>
          CATEGORÍAS
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Gestión y clasificación de productos del inventario</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="openCreate"
          class="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white font-bold rounded-[10px] shadow-sm hover:bg-purple-700 transition-all text-sm cursor-pointer"
        >
          <span class="material-icons text-lg">add</span>
          Nueva Categoría
        </button>
      </div>
    </div>

    <!-- Métrica Principal -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-purple-50 p-4 rounded-2xl">
          <span class="material-icons text-purple-600">category</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Categorías</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ totalCategories.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <!-- Tabla y Buscador -->
    <div class="bg-white rounded-[1rem] border border-gray-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar categoría..."
            class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-[10px] outline-none focus:ring-2 focus:ring-purple-500/20 border border-transparent focus:border-purple-500 transition-all text-sm"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Nombre</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Descripción</th> 
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Estado</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in rows" :key="row._id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <td class="px-6 py-5">
                <span class="font-bold text-[#1a2332] uppercase">{{ row.name || row.Name }}</span>
              </td>
              <td class="px-6 py-5">
                <span class="text-gray-600 text-xs font-medium">{{ row.description || row.Description || 'Sin descripción' }}</span>
              </td>

              <td class="px-6 py-5 text-center">
                <span :class="getStatusBadge(row.state ?? row.State ?? true)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ (row.state ?? row.State ?? true) ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="openEdit(row)"
                    class="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                    title="Editar"
                  >
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button 
                    @click="deleteCategory(row)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Eliminar"
                  >
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="rows.length === 0" class="hover:bg-gray-50/50">
              <td colspan="4" class="px-6 py-8 text-center text-gray-400 font-medium">
                No se encontraron categorías registradas
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Paginador -->
        <div class="p-4 px-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <div class="flex items-center gap-3">
            <span>Mostrar:</span>
            <select 
              v-model="itemsPerPage" 
              @change="currentPage = 1"
              class="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 outline-none text-gray-700 font-bold focus:border-purple-500 cursor-pointer"
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

    <!-- Modal para crear/editar -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="closeModal"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between text-xl items-center">
          <h3 class="font-black uppercase tracking-tight">{{ isEditing ? 'Editar Categoría' : 'Agregar Categoría' }}</h3>
          <button @click="closeModal" class="hover:text-purple-400 transition-colors"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-8 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nombre</label>
              <input v-model="name" required placeholder="Nombre de la categoría" type="text" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-sm">
            </div>
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Descripción</label>
              <input v-model="description" placeholder="Descripción de la categoría" type="text" class="w-full bg-gray-100 rounded-[10px] p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-sm">
            </div>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-[#1a2332] text-white font-bold py-3 rounded-[10px] hover:bg-purple-600 transition-colors disabled:opacity-50">
            {{ loading ? 'GUARDANDO...' : 'GUARDAR' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { categoryStore } from "@/store/category.js";
import { LoginStore } from "@/store/login.js";
import { sweetDelete } from "@/Global/notify";

const storeCategory = categoryStore();
const storeLogin = LoginStore();

const user = ref(storeLogin.Email);
const showModal = ref(false);
const loading = ref(false);
const isEditing = ref(false);

const name = ref("");
const description = ref("");
const index = ref(null);

const filter = ref("");
const totalCategories = ref(0);

const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalPages = ref(1);
const totalRecords = ref(0);


const rows = ref([]);

async function getCategories() {
  loading.value = true;
  try {
    const res = await storeCategory.GetCategories(storeLogin.Email, {
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: filter.value
    });

    if (res?.status < 299) {
      rows.value = res.data?.categories || [];
      if (res.data.pagination) {
        totalPages.value = res.data.pagination.totalPages;
        totalRecords.value = res.data.pagination.totalRecords;
        totalCategories.value = res.data.pagination.totalRecords; // Métrica global correcta
      }
    }
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

// Controladores de Paginación
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++; // El watcher activará getCategories()
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--; // El watcher activará getCategories()
  }
};

// Reaccionar a cambios en la página actual o límite por página
watch([currentPage, itemsPerPage], () => {
  getCategories();
});

let filterTimeout;
watch(filter, () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    currentPage.value = 1; // Reiniciar a la primera página
    getCategories();
  }, 300);
});

async function handleSubmit() {
  if (isEditing.value) {
    await editCategory();
  } else {
    await categoryPost();
  }
}

async function categoryPost() {
  try {
    loading.value = true;
    const payload = {
      name: name.value,
      description: description.value,
      UserEmail: user.value,
    };

    const res = await storeCategory.CreateCategory(payload);
    if (res?.status === 200 || res?.status === 201) {
      closeModal();
      getCategories();
    }
  } catch (error) {
    console.error("Error al crear la categoría:", error);
  } finally {
    loading.value = false;
  }
}

async function editCategory() {
  try {
    loading.value = true;
    await storeCategory.UpdateCategory(index.value, {
      name: name.value,
      description: description.value,
      UserUpdate: user.value
    });
    closeModal();
    getCategories();
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
  } finally {
    loading.value = false;
  }
}

const deleteCategory = async (data) => {
  sweetDelete(data, async () => {
    // Corregido: llamar al store de categorías
    await storeCategory.DeleteCategory(data._id);
    getCategories();
  });
};

function openCreate() {
  cleanForm();
  showModal.value = true;
}

function openEdit(row) {
  index.value = row._id;
  isEditing.value = true;
  name.value = row.name || row.Name || "";
  description.value = row.description || row.Description || "";
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  cleanForm();
}

function cleanForm() {
  name.value = "";
  description.value = "";
  isEditing.value = false;
  index.value = null;
}

const getStatusBadge = (state) => {
  return state 
    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
    : "bg-orange-50 text-orange-700 border border-orange-100";
};

onMounted(() => {
  getCategories();
});
</script>