<template>
  <div class="min-h-screen bg-[#F4F7FE] lg:p-20 p-6 font-sans text-[#1e293b]">
    
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-1 h-6 bg-[#4F46E5] rounded-full"></div>
          <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Cuentas de clientes</span>
        </div>
        <h1 class="text-4xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
          Clientes
        </h1>
      </div>

      <button 
        @click="(showModal = true), cleanForm()" 
        class="flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-900/10 font-bold text-sm"
      >
        <span class="material-icons text-lg">add</span>
        Nuevo Cliente
      </button>
    </header>

    <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6 flex items-center justify-between">
      <div class="relative w-full max-w-md">
        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
          <span class="material-icons text-xl">search</span>
        </span>
        <input 
          v-model="filter" 
          type="text" 
          placeholder="Buscar por nombre, documento o correo..." 
          class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
        >
      </div>
      <div class="hidden md:flex items-center gap-2 text-slate-400 text-xs font-bold px-4">
        <span class="material-icons text-sm">filter_list</span>
        {{ rows.length }} REGISTROS ENCONTRADOS
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th v-for="col in columns" :key="col.name" class="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-500">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in filteredRows" :key="idx" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4 text-xs font-bold text-slate-400">#{{ row.index }}</td>
              <td class="px-6 py-4 text-sm font-bold text-[#0F172A]">{{ row.Document }}</td>
              <td class="px-6 py-4 text-sm font-medium text-slate-600">{{ row.Name }} {{ row.LastName }}</td>
              <td class="px-6 py-4 text-sm text-slate-500">{{ row.Cel }}</td>
              <td class="px-6 py-4 text-sm text-slate-500">
                <div class="flex flex-col">
                  <span>{{ row.Email }}</span>
                  <span class="text-[10px] text-slate-400 uppercase tracking-tighter">{{ row.Municipio }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="row.state == 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {{ row.state == 1 ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-1">
                  <button @click="(index = row._id), goInfo(row), (showModalEdit = true)" class="action-btn-mini hover:bg-indigo-50 hover:text-indigo-600">
                    <span class="material-icons text-sm">edit</span>
                  </button>
                  <button @click="StateUpdate(row)" :class="row.state == 1 ? 'hover:bg-rose-50 hover:text-rose-600' : 'hover:bg-emerald-50 hover:text-emerald-600'" class="action-btn-mini text-slate-400">
                    <span class="material-icons text-sm">{{ row.state == 1 ? 'block' : 'check_circle' }}</span>
                  </button>
                  <button @click="deleteItem(row)" class="action-btn-mini hover:bg-rose-50 hover:text-rose-600">
                    <span class="material-icons text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal || showModalEdit" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/40 backdrop-blur-sm">
      <div class="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="bg-[#111827] p-8 text-white flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold">{{ showModalEdit ? 'Editar Cliente' : 'Nuevo Cliente' }}</h3>
            <p class="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Información de contacto y acceso</p>
          </div>
          <button @click="showModal = false; showModalEdit = false" class="text-slate-400 hover:text-white transition-colors">
            <span class="material-icons">close</span>
          </button>
        </div>

        <form @submit.prevent="showModalEdit ? UsersPut() : UsersPost()" class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-1">
              <label class="input-label">Documento</label>
              <input v-model="document" type="text" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Nombre</label>
              <input v-model="name" type="text" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Apellidos</label>
              <input v-model="lastName" type="text" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Teléfono</label>
              <input v-model="cel" type="text" class="meridian-input" required maxlength="10">
            </div>
            <div class="space-y-1">
              <label class="input-label">Dirección</label>
              <input v-model="address" type="text" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Municipio</label>
              <input v-model="municipality" type="text" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Email</label>
              <input v-model="email" type="email" class="meridian-input" required>
            </div>
            <div class="space-y-1">
              <label class="input-label">Contraseña</label>
              <div class="relative">
                <input :type="isPwd ? 'password' : 'text'" v-model="password" class="meridian-input w-full" required>
                <button type="button" @click="isPwd = !isPwd" class="absolute right-3 top-2.5 text-slate-400">
                  <span class="material-icons text-lg">{{ isPwd ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="showModal = false; showModalEdit = false" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all uppercase">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="px-8 py-3 bg-[#4F46E5] text-white rounded-xl font-bold text-sm hover:bg-indigo-600 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
              <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ showModalEdit ? 'ACTUALIZAR DATOS' : 'GUARDAR CLIENTE' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meridian-input {
  @apply w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-semibold text-slate-700;
}

.input-label {
  @apply text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1;
}

.action-btn-mini {
  @apply p-2 rounded-lg text-slate-400 transition-all duration-200 flex items-center justify-center;
}

.action-btn-mini:hover {
  @apply shadow-sm scale-110;
}

/* Transiciones de tabla */
tr {
  transition: all 0.2s ease-in-out;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usersStore } from "../store/users.js";
import { LoginStore } from "../store/login.js";
import { sweetDelete } from "@/Global/notify";

const storeUsers = usersStore();
const storeLogin = LoginStore();

const isPwd = ref(true);
const showModal = ref(false);
const showModalEdit = ref(false);
const loading = ref(false);

const index = ref();
const document = ref();
const name = ref();
const lastName = ref();
const cel = ref();
const address = ref();
const email = ref();
const municipality = ref();
const password = ref();
const user = ref(storeLogin.Email);

// Filtro computado (reemplazo del filter de q-table)
const filter = ref("");
const rows = ref([]);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const search = filter.value.toLowerCase();
  return rows.value.filter(row => 
    row.Name.toLowerCase().includes(search) || 
    row.Document.toLowerCase().includes(search) ||
    row.Email.toLowerCase().includes(search)
  );
});

// Peticiones
async function UsersGet() {
  const res = await storeUsers.GetUsers();
  if (res && res.status < 299) {
    rows.value = res.data.map((row, i) => ({ ...row, index: i + 1 }));
  }
}

async function UsersPost() {
  loading.value = true;
  await storeUsers.PostUsers(document.value, name.value, lastName.value, cel.value, address.value, email.value, municipality.value, password.value, user.value);
  showModal.value = false;
  await UsersGet();
  loading.value = false;
}

async function UsersPut() {
  loading.value = true;
  await storeUsers.PutUser(index.value, document.value, name.value, lastName.value, cel.value, address.value, email.value, municipality.value, password.value, user.value);
  showModalEdit.value = false;
  await UsersGet();
  loading.value = false;
}

async function deleteItem(data) {
  sweetDelete(data, async () => {
    try {
      await storeUsers.DeleteUser(data._id);
      await UsersGet();
    } catch (error) { console.log(error); }
  });
}

async function StateUpdate(data) {
  const newState = data.state == 1 ? 0 : 1;
  await storeUsers.UpdateState(data._id, newState);
  await UsersGet();
}

function goInfo(data) {
  document.value = data.Document;
  name.value = data.Name;
  lastName.value = data.LastName;
  cel.value = data.Cel;
  address.value = data.Address;
  email.value = data.Email;
  municipality.value = data.Municipio;
  password.value = data.Password;
}

function cleanForm() {
  document.value = ""; name.value = ""; lastName.value = ""; cel.value = "";
  address.value = ""; email.value = ""; municipality.value = ""; password.value = "";
}

const columns = [
  { name: "index", label: "#" },
  { name: "doc", label: "Documento" },
  { name: "name", label: "Cliente" },
  { name: "tel", label: "Teléfono" },
  { name: "loc", label: "Ubicación / Email" },
  { name: "state", label: "Estado" },
  { name: "options", label: "Acciones" },
];

onMounted(() => {
  UsersGet();
});
</script>