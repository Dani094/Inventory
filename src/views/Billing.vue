<template>
  <div class="min-h-screen bg-[#F4F7FE] lg:p-20 p-4 font-sans text-[#1e293b]">
    
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <div class="w-1 h-6 bg-[#4F46E5] rounded-full"></div>
          <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Administración</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#0F172A] tracking-tight">Facturación</h1>
      </div>

      <div class="flex items-center gap-4">
        <div class="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <span class="material-symbols-outlined text-2xl">receipt_long</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase leading-none">Total Documentos</p>
            <p class="text-xl font-black text-[#0F172A]">{{ rows.length }}</p>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button @click="getBill()" class="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
            <q-icon name="refresh" size="20px" />
          </button>
          <button @click="modalCreaEdit(1)" class="flex items-center gap-2 px-5 py-3 bg-[#111827] text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-900/10 font-bold text-sm">
            <q-icon name="add" size="20px" />
            Nueva Factura
          </button>
        </div>
      </div>
    </header>

    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1 min-w-[300px]">
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <q-icon name="search" size="20px" />
          </span>
          <input 
            v-model="filter" 
            type="text" 
            placeholder="Buscar por cliente, factura o vendedor..." 
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
          >
        </div>

        <div class="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <q-checkbox v-model="filtroDay" color="indigo" @click="getBill()" />
          <span class="text-xs font-bold text-indigo-700 uppercase tracking-tight">Ventas de hoy</span>
        </div>
      </div>

      <q-select
        v-model="visibleColumns"
        multiple
        dense
        options-dense
        display-value="Columnas"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        class="meridian-select"
        bg-color="white"
        outlined
        rounded
      />
    </div>

    <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        :filter="filter"
        :visible-columns="visibleColumns"
        row-key="index"
        class="meridian-table"
        v-model:pagination="pagination"
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="bg-slate-50/50">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell-numero="props">
          <q-td :props="props">
            <span class="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-xs">
              #{{ props.row.numFactura }}
            </span>
          </q-td>
        </template>

        <template v-slot:body-cell-Total="props">
          <q-td :props="props" class="text-right">
            <span class="font-black text-[#0F172A] tracking-tight">
              ${{ parseFloat(props.row.PrecioVenta).toLocaleString() }}
            </span>
          </q-td>
        </template>

        <template v-slot:body-cell-options="props">
          <q-td :props="props">
            <div class="flex justify-center gap-2">
              <button @click="modalCreaEdit(3), arrayBill = props.row" class="action-btn hover:text-indigo-600 hover:bg-indigo-50" title="Ver Detalle">
                <q-icon name="visibility" size="18px" />
              </button>
              <button @click="(index = props.row._id), arrayEdit = props.row, modalCreaEdit(2)" class="action-btn hover:text-amber-600 hover:bg-amber-50" title="Editar">
                <q-icon name="edit" size="18px" />
              </button>
              <button @click="deleteBill(props.row)" class="action-btn hover:text-rose-600 hover:bg-rose-50" title="Eliminar">
                <q-icon name="delete_outline" size="18px" />
              </button>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
      <div v-if="showBill == 3" class="w-full max-w-4xl min-h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
        <bill :dataBill="arrayBill" />
      </div>
      <div v-else class="w-full max-w-2xl bg-white rounded-3xl p-2 shadow-2xl">
        <createbill :title="modalTitle" :ind="index" :value="valEditCrea" :dataEdit="arrayEdit" />
      </div>
    </q-dialog>

  </div>
</template>

<style scoped>
/* Estilos para igualar la Meridian Logic Table */
.meridian-table :deep(.q-table__middle) {
  max-height: 650px;
}

.meridian-table :deep(thead tr) {
  height: 60px;
}

.meridian-table :deep(tbody tr) {
  height: 70px;
  transition: all 0.2s;
}

.meridian-table :deep(tbody tr:hover) {
  background-color: #F8FAFC !important;
}

.meridian-table :deep(.q-td) {
  border-bottom: 1px solid #f1f5f9;
  padding: 12px 16px;
}

.meridian-select {
  width: 150px;
  @apply text-xs font-bold;
}

.action-btn {
  @apply w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 transition-all duration-200 border border-transparent;
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>

<script setup>
// MANTENEMOS TODA TU LÓGICA ORIGINAL SIN CAMBIOS
import { ref, onMounted } from "vue";
import createbill from "@/components/createBill.vue";
import bill from "@/components/Bill.vue"
import { billStore } from "../store/billing.js";
import { sweetDelete } from "@/Global/notify"
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const storeExist = exitStore();
const storeBilling = billStore();
const storeLogin = LoginStore();
let arrayEdit = ref()
let valEditCrea = ref()
let modalTitle = ref()
let dialog = ref(false);
let index = ref();
let filtroDay = ref(false);
let showBill = ref(false)
let rowsExist = ref()
let arrayBill = ref()
let pagination = ref({ rowsPerPage: 50 });

const visibleColumns = ref(["numero", "vendedor", "Cliente", "Cantidad de productos", "Total", "Fecha", "options"]);

let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center", sortable: true },
  { name: "numero", align: "center", label: "Factura", field: "numFactura", sortable: true },
  { name: "vendedor", align: "left", label: "Vendedor", field: "vendedor", sortable: true },
  { name: "Cliente", align: "left", label: "Cliente", field: "cliente", sortable: true },
  { name: "Cantidad de productos", align: "center", label: "Cant.", field: "CantProduct", sortable: true },
  { name: "Total", align: "right", label: "Monto Total", field: "PrecioVenta", sortable: true },
  { name: "Fecha", align: "center", label: "Fecha", field: (row) => row.date.slice(0, 10), sortable: true },
  { name: "options", align: "center", label: "Acciones" },
]);

let rows = ref([]);

const getBill = async () => {
  $q.loading.show();
  const res = await storeBilling.GetIBill(storeLogin.Email);
  if (res.status < 299) {
    let resBill = res.data;
    if (filtroDay.value === true) {
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, "0"); 
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");  
      const anio = fechaActual.getFullYear();
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      resBill = resBill.filter((fecha) => fecha.date.slice(0, 10) === fechaFormateada );
      rows.value = resBill;
    } else {
      rows.value = res.data;
    }
    rows.value.forEach((row, idx) => { row.index = idx + 1; });
  }
  $q.loading.hide();
};

async function ExitsGet() {
  const res = await storeExist.GetExits(storeLogin.Email);
  if (res && res.status < 299) { rowsExist.value = res.data; } 
}

async function deleteBill(data) {  
  sweetDelete(data, async () => { 
    try {
      await storeBilling.DeleteBill(data._id);
      deleteExist(data);
      getBill(); 
    } catch (error) { console.error(error); }
  })
}

async function deleteExist(data) {
  try {
    for (const element of rowsExist.value) {
      if (element.NumBill == data.numFactura) {
        await storeExist.DeleteExits(element._id);
      }
    }
    getBill();
  } catch (error) { console.error(error); }
}

async function modalCreaEdit(p) {
  showBill.value = p
  if (p === 1) {
    dialog.value = true;
    modalTitle.value = "CREAR FACTURA";
    valEditCrea.value = p;
  } else if(p === 2){
    dialog.value = true;
    modalTitle.value = "EDITAR FACTURA";
    valEditCrea.value = p;
  } else {
    dialog.value = true;
  }
}

// Variables para el filtro de Quasar
let filter = ref("");

onMounted(() => {
  getBill();
  ExitsGet();
});
</script>