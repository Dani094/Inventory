<template>
<!-- modal crear -->
<q-dialog v-model="props.showModal">
    <q-card class="w-[400px]">
      <q-card-section class="bg-[#04162d]">
        <h5 class="text-center text-white font-bold p-2 text-xl">
          INGRESA LOS DATOS
        </h5>
      </q-card-section>
      <div class="p-4">
        <q-form ref="myForm" @submit.prevent.stop="props.Post()">
          <div class="flex w-full justify-center">
            <div class="w-[45%]">
              <q-input
                type="text"
                v-model="supplier"
                label="Proveedor"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'Digite el Proveedor',
                ]"
              />
              <q-input
                type="text"
                v-model="name"
                label="Nombre del Producto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'Digite el Nombre',
                ]"
              />
              <q-input
                type="text"
                v-model="serial"
                label="Serial"
                class="mb-5"
              />
              <q-input
                type="number"
                v-model="units"
                label="Unidades"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'Digite las Unidades',
                ]"
              />
            </div>
            <div class="w-[45%] ml-4">
              <q-input
                type="number"
                v-model="price"
                label="Precio Unitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.trim().length > 0) || 'Digite el Precio',
                ]"
              />
              <q-input
                type="date"
                v-model="expirationDate"
                label="Fecha de Vencimiento"
                class="mb-5"
              />
              <q-select
                v-model="state"
                :options="states"
                label="Estado"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'Escoja el Estado',
                ]"
              />
              <q-select
                v-model="copias"
                :options="opCopias"
                label="¿Copias?"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'Escoja la opcion',
                ]"
              />
              <q-input
                v-if="copias == 'Sí'"
                type="number"
                v-model="crearCopias"
                label="Copias"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) ||
                    'Digite la Cantidad de Copias',
                ]"
              />
            </div>
          </div>
          <!-- div botones  -->
          <div class="flex justify-center items-center gap-4">
            <q-btn
              icon="save_as"
              label="GUARDAR"
              :loading="loading"
              type="submit"
              class="text-white bg-green-800 rounded-2xl"
            ></q-btn>
            <q-btn
              icon="cancel"
              type="button"
              class="text-white bg-red-700 rounded-2xl"
              @click="props.showModal=showModal" 
              >CERRAR
            </q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
<!-- modal editar -->
  <q-dialog v-model="showModalEdit">
    <q-card class="w-[400px]">
      <q-card-section class="bg-[#04162d]">
        <h5 class="text-center text-white font-bold p-2 text-xl">
          INGRESA LOS DATOS
        </h5>
      </q-card-section>
      <div class="p-4">
        <q-form ref="myForm" @submit.prevent.stop="props.Post()">
          <div class="flex w-full justify-center">
            <div class="w-[45%]">
              <q-input
                type="text"
                v-model="supplier"
                label="Proveedor"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'Digite el Proveedor',
                ]"
              />
              <q-input
                type="text"
                v-model="name"
                label="Nombre del Producto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'Digite el Nombre',
                ]"
              />
              <q-input
                type="text"
                v-model="serial"
                label="Serial"
                class="mb-5"
              />
              <q-input
                type="number"
                v-model="units"
                label="Unidades"
                lazy-rules
                :rules="[
                  (val) =>
                  (val && val.toString().trim().length > 0) || 'Digite las Unidades',
                ]"
              />
            </div>
            <div class="w-[45%] ml-4">
              <q-input
                type="number"
                v-model="price"
                label="Precio Unitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.toString().trim().length > 0) || 'Digite el Precio',
                ]"
              />
              <q-input
                type="date"
                v-model="expirationDate"
                label="Fecha de Vencimiento"
                class="mb-5"
              />
              <q-select
                v-model="state"
                :options="states"
                label="Estado"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'Escoja el Estado',
                ]"
              />
            </div>
          </div>
          <div class="flex justify-center items-center gap-4">
            <q-btn
              icon="save_as"
              label="GUARDAR"
              :loading="loading"
              type="submit"
              class="text-white bg-green-800 rounded-2xl"
            ></q-btn>
            <q-btn
              icon="cancel"
              type="button"
              class="text-white bg-red-700 rounded-2xl"
              @click="showModal.valueOf=false"
              >CERRAR
            </q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
<!-- table  -->
  <q-table
    flat
    :separator="'horizontal'"
    bordered
    :rows="props.rows"
    :columns="props.columns"
    row-key="index"
    virtual-scroll
    v-model:pagination="pagination"
    class="inventTable h-[550px] lg:h-[720px] rounded-2xl"
    :filter="filter"
    @focusin="activateNavigation"
    @focusout="deactivateNavigation"
    @keydown="onKey"
  >
    <template v-slot:top-left>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Buscar"
        class="bg-[#E7E8F3] w-full pl-4 pr-4 rounded-lg outline-none"
      >
        <template v-slot:prepend>
          <q-icon name="search" class="text-[#04162d]"/>
        </template>
      </q-input>
    </template>
    <!-- opciones  -->
    <template v-slot:body-cell-options="props">
      <q-td :props="props">
        <div class="text-white">
          <q-btn
            round
            icon="edit"
            class="q-mx bg-[#04162d]"
            size="xs"
            title="Editar"
            @click="
              (index = props.row._id), goInfo(props.row), (showModal.valueOf = true)
            "
          >
          </q-btn>
          <q-btn
            round
            icon="remove_circle_outline"
            class="q-mx-md bg-[#FF0000]"
            size="xs"
            title="Salida"
            @click="
              (index = props.row._id),
                goInfo2(props.row),
                (promptSalida = true),
                limpiar()
            "
          >
          </q-btn>
          <q-btn
            round
            icon="delete"
            class="q-mx bg-[#04162d]"
            size="xs"
            title="Borrar"
            @click="(promptEliminar = true), (inventarioId = props.row)"
          ></q-btn>
        </div>
      </q-td>
    </template>
  </q-table>

</template>

<script setup>
import { ref, nextTick, toRaw, computed } from "vue";
import Modal from "@/components/modals.vue"
import { LoginStore } from "../store/login.js";

const storeLogin = LoginStore();

const props= defineProps({
  showModal: Boolean,
  Post:Function,
  rows: Array,
  columns: Array,
})

// Propiedad recibida
let showModal = ref(false);
// let showModal = computed(() => props.showModal);


let showModalEdit=ref(false)
let pagination = ref({
  rowsPerPage: 50,
});
let loading=ref()

let index= ref()
let supplier = ref("");
let name = ref("");
let serial = ref("");
let units = ref();
let price = ref();
let expirationDate = ref("");
let state = ref("Disponible");
let states = ref(["Disponible", "Agotado", "Oferta"]);
let copias = ref("");
let opCopias = ref(["Sí", "No"]);
let crearCopias = ref();
let user = ref(storeLogin.Email);


// function filter
let filter = ref("");
const tableRef = ref(null);
const navigationActive = ref(false);
const selected = ref([]);

const activateNavigation = () => {
  navigationActive.value = true;
};

const deactivateNavigation = () => {
  navigationActive.value = false;
};

const onKey = (evt) => {
  if (
    navigationActive.value !== true ||
    [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
    tableRef.value === null
  ) {
    return;
  }

  evt.preventDefault();

  const { computedRowsNumber, computedRows } = tableRef.value;

  if (computedRows.length === 0) {
    return;
  }

  const currentIndex =
    selected.value.length > 0
      ? computedRows.indexOf(toRaw(selected.value[0]))
      : -1;
  const currentPage = pagination.value.page;
  const rowsPerPage =
    pagination.value.rowsPerPage === 0
      ? computedRowsNumber
      : pagination.value.rowsPerPage;
  const lastIndex = computedRows.length - 1;
  const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

  let index = currentIndex;
  let page = currentPage;

  switch (evt.keyCode) {
    case 36: // Home
      page = 1;
      index = 0;
      break;
    case 35: // End
      page = lastPage;
      index = rowsPerPage - 1;
      break;
    case 33: // PageUp
      page = currentPage <= 1 ? lastPage : currentPage - 1;
      if (index < 0) {
        index = 0;
      }
      break;
    case 34: // PageDown
      page = currentPage >= lastPage ? 1 : currentPage + 1;
      if (index < 0) {
        index = rowsPerPage - 1;
      }
      break;
    case 38: // ArrowUp
      if (currentIndex <= 0) {
        page = currentPage <= 1 ? lastPage : currentPage - 1;
        index = rowsPerPage - 1;
      } else {
        index = currentIndex - 1;
      }
      break;
    case 40: // ArrowDown
      if (currentIndex >= lastIndex) {
        page = currentPage >= lastPage ? 1 : currentPage + 1;
        index = 0;
      } else {
        index = currentIndex + 1;
      }
      break;
  }

  if (page !== pagination.value.page) {
    pagination.value.page = page;

    nextTick(() => {
      const { computedRows } = tableRef.value;
      selected.value = [computedRows[Math.min(index, computedRows.length - 1)]];
      tableRef.value.$el.focus();
    });
  }
};

function goInfo(data) {
    (supplier.value = data.Supplier),
    (name.value = data.Name),
    (serial.value = data.Serial),
    (units.value = data.Units),
    (price.value = data.Price),
    (expirationDate.value = data.ExpirationDate);
}
</script>

<style>

</style>
