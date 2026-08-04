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
        <!-- Modal / Botón para crear categoría -->
        <button 
          @click="(showModal = true)"
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
          <h3 class="text-2xl font-black text-[#1a2332]">{{ totalCategories?.toLocaleString() }}</h3>
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
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Productos Asociados</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Estado</th>
              <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="category in filteredCategories" :key="category._id" class="hover:bg-gray-50/50 transition-colors text-sm">
              <td class="px-6 py-5">
                <span class="font-bold text-[#1a2332] uppercase">{{ category.name }}</span>
              </td>
              <td class="px-6 py-5">
                <span class="text-gray-600 text-xs font-medium">{{ category.description || 'Sin descripción' }}</span>
              </td>
              <td class="px-6 py-5 text-center">
                <span class="font-bold text-[#1a2332] bg-gray-100 px-3 py-1 rounded-full text-xs">
                  {{ category.productCount || 0 }}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <span :class="getStatusBadge(category.state)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ category.state ? 'true' : 'false' }}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="openEdit(category)"
                    class="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                    title="Editar"
                  >
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button 
                    @click="deleteCategory(category)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Eliminar"
                  >
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredCategories.length === 0" class="hover:bg-gray-50/50">
              <td colspan="5" class="px-6 py-8 text-center text-gray-400 font-medium">
                No se encontraron categorías registradas
              </td>
            </tr>
          </tbody>
      
        </table>
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

    <!-- Modal para crear/editar categoría -->
     <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModal = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between text-xl">
          <h3 v-if="!isEditing" class="font-black uppercase tracking-tight text-center">agregar Categoria</h3>
          <h3 v-else class="font-black uppercase tracking-tight text-center">Editar Categoria</h3>
          <button @click="showModal = false"><span class="material-icons">close</span></button>
        </div>
        <form  @submit.prevent="handleSubmit" class="p-8 space-y-4 ">
            
          <div class="grid grid-cols-1 gap-6 mb-6">
            <input v-model="name" placeholder="Nombre de la categoría" type="text" class="bg-gray-100 rounded-[10px] p-3 border-none text-sm">
            <input v-model="description" placeholder="Descripción de la categoría" type="text" class="bg-gray-100 rounded-[10px] p-3 border-none text-sm">
          </div>
          <button type="submit" class="w-full bg-[#1a2332] text-white font-bold py-3 rounded-[10px]">GUARDAR</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { categoryStore } from "@/store/category.js";
import { LoginStore } from "@/store/login.js";
import { sweetDelete } from "@/Global/notify";

const storeCategory = categoryStore();
const storeLogin = LoginStore();

let user = ref(storeLogin.Email);
let showModal = ref(false);
let loading = ref(false);
let isEditing = ref(false);

// variables para crear/editar categoría
let name = ref("");
let description = ref("");
let index = ref(null);

// Estados de la Interfaz
const filter = ref("");
const totalCategories = ref(0);
const categories = ref([]);

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalPages = ref(1)
const totalRecords = ref(0)

let rows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return categories.value.slice(start, end);
});


/**
 * Obtiene la lista de categorías registradas desde el Store
 */
async function getCategories() {
  try {
    const res = await storeCategory.GetCategories(storeLogin.Email,{
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: filter.value
    });

    const data = res.data?.categories || [];
    console.log(data);
    

    categories.value = data

    totalCategories.value = categories.value.length

    if (res.data.pagination) {
        totalPages.value = res.data.pagination.totalPages;
        totalRecords.value = res.data.pagination.totalRecords;
      }
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    categories.value = [];
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
  getCategories();
});

// 5. Al escribir en la búsqueda, reseteamos a la página 1 y consultamos con 'debounce' implícito o directo
let filterTimeout;
watch(filter, () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    currentPage.value = 1;
    getCategories();
  }, 300); // Espera 300ms después de escribir para no saturar la API
});



async function handleSubmit() {
  console.log(isEditing.value);
  if (isEditing.value) {
    await editCategory();
  } else {
    console.log("Creando categoría...");
    await categoryPost();
  }
}


async function categoryPost() {
  try {
    const payload = {
      name: name.value,
      description: description.value,
      UserEmail: user.value,
    };

    const res = await storeCategory.CreateCategory(payload);

    if (res?.status === 200 || res?.status === 201) {
      showModal.value = false;
      getCategories(); // Actualiza la lista de categorías
    } else {
      alert("Error al crear la categoría");
    }
  } catch (error) {
    console.error("Error al crear la categoría:", error);
  }
  cleanForm();
}


/**
 * Retorna el estilo de badge de estado
 */
const getStatusBadge = (state) => {
  return state 
    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
    : "bg-orange-50 text-orange-700 border border-orange-100";
};

/**
 * Filtra las categorías según el campo de búsqueda
 */
const filteredCategories = computed(() => {
  return categories.value.filter(cat => {
    return !filter.value || 
      cat.name?.toLowerCase().includes(filter.value.toLowerCase()) ||
      cat.description?.toLowerCase().includes(filter.value.toLowerCase());
  });
});

// Handlers para acciones

async function editCategory() {
    loading.value = true;
    const res = await storeCategory.UpdateCategory(index.value, {
    name: name.value,
    description: description.value,
    UserUpdate: user.value
  });
  showModal.value = false;
  isEditing.value = false;
  cleanForm();
  getCategories();
  loading.value = false;
};


const deleteCategory = async (data) => {
   sweetDelete(data, async () => {
    await storeInventory.DeleteInventory(data._id);
    getCategories();
   })
};

function openEdit(row) {
  index.value = row._id;
  isEditing.value = true;
  goInfo(row);
  showModal.value = true;
}


function goInfo(data) {
  console.log(data);
  name.value = data.name;
  description.value = data.description;
}



function cleanForm() {
  name.value = "";
  description.value = "";
  isEditing.value = false;
  index.value = null;
}

// Carga inicial
onMounted(() => {
  getCategories();
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