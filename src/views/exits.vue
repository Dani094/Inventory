<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- title -->
            <div class="mb-4">
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl"> arrow_right </span>
                    SALIDAS
                </h1>
            </div>
            <!-- btns y search-->
        <div class="flex justify-between py-4">
            <div class="flex items-center">
                <div class="bg-[#04162d] px-4 p-2 rounded-2xl">
                    <h4 class="text-xl text-white font-bold">
                        Total Unidades: {{ TotalUnits }}
                    </h4>
                </div>
            </div>
        </div>
        <!-- table  -->
        <!-- <Tables :rows="rows" :columns="columns" /> -->
        <q-table
      flat
      :separator="'cell'"
      bordered
      :rows="rows"
      :columns="columns"
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
            <q-icon name="search" class="text-[#04162d]" />
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
              class="q-mx-md bg-[#04162d]"
              size="xs"
              title="Editar"
              @click="
                (index = props.row._id),
                  goInfo(props.row),
                  (showModalEdit = true)
              "
            >
            </q-btn>
            <q-btn
              round
              icon="delete"
              class="q-mx bg-[#04162d]"
              size="xs"
              title="Borrar"
              @click="deleteItem(props.row)"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
        <!-- modals -->
    <q-dialog v-model="showModalEdit">
      <q-card class="w-[400px]">
        <q-card-section class="bg-[#04162d]">
          <h5 class="text-center text-white font-bold p-2 text-xl">
            INGRESA LOS DATOS
          </h5>
        </q-card-section>
        <div class="p-4">
          <q-form ref="myForm" @submit.prevent.stop="ExitsPut()">
            <div class="flex w-full justify-center">
              <div class="w-[45%]">
                <q-input
                  type="text"
                  v-model="nameExit"
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
                  v-model="serialExit"
                  label="Serial"
                  class="mb-5"
                />
                <q-input
                  type="number"
                  v-model="units2"
                  label="Unidades Sacadas"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite las Unidades',
                  ]"
                />
              </div>
              <div class="w-[45%] ml-4">
                <q-input
                  type="number"
                  v-model="priceExit"
                  label="Precio Unitario"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite el Precio',
                  ]"
                /><q-input
                  type="number"
                  v-model="discount"
                  label="Descuento"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite el Descuento',
                  ]"
                />
              </div>
            </div>
            <div class="flex justify-center items-center gap-4">
              <q-btn
                icon="save_as"
                label="Actualizar"
                :loading="loading"
                type="submit"
                class="text-white bg-green-800 rounded-2xl"
              ></q-btn>
              <q-btn
                icon="cancel"
                type="button"
                class="text-white bg-red-700 rounded-2xl"
                v-close-popup
                >CERRAR
              </q-btn>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Tables from "@/components/table.vue"
import {exitStore} from "@/store/exits.js"
import { LoginStore } from "../store/login.js";
import {sweetDelete} from "@/Global/notify"

const storeExits = exitStore();
const storeLogin = LoginStore();


let showModal = ref(false);
let showModalEdit = ref(false);
let loading=ref()
// variables 
let index=ref()
let nameExit = ref("");
let serialExit = ref("");
let units2 = ref();
let unitsExit = ref();
let priceExit = ref();
let discount = ref("");
let user=ref(storeLogin.Email)
let TotalUnits=ref(0)

// peticiones get,put,delete
async function ExitsGet() {
  const res = await storeExits.GetExits();
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index= index + 1;
      TotalUnits.value = 0;
      TotalUnits.value = rows.value.reduce((total, row) => total + row.Units, 0);
    });
  } 
}
async function ExitsPut() {
  loading.value = true;
  const res = await storeExits.PutExits(
    index.value,
    nameExit.value,
    serialExit.value,
    parseFloat(units2.value),
    parseFloat(priceExit.value),
    parseFloat(discount.value),
    user.value
  );
  showModalEdit.value = false;
  ExitsGet();
  loading.value = false;
}
async function deleteItem(data) {
  sweetDelete(data, async () => {
    try {
      await storeExits.DeleteExits(data._id);
      ExitsGet();
    } catch (error) {
      console.log(error);
    }
  });
}
// table  
let pagination = { rowsPerPage: 50 };
let rows = ref([]);
let columns = ref([
    { name: "index", label: "N°", field: "index", align: "center" },
    {
        name: "name",
        align: "center",
        label: "NOMBRE",
        field: "Name",
    },
    {
        name: "serial",
        align: "center",
        label: "SERIAL",
        field: "Serial",
    },
    {
        name: "units",
        align: "center",
        label: "UNIDADES",
        field: "Units",
    },
    {
        name: "price",
        align: "center",
        label: "PRECIO UNITARIO",
        field: (row) => parseFloat(row.Price).toLocaleString(),

    },
    {
        name: "price",
        align: "center",
        label: "PRECIO TOTAL",
        field: (row) => parseFloat(row.Price*row.Units).toLocaleString(),

    },
    {
        name: "discount",
        align: "center",
        label: "DESCUENTO",
        field: (row) => parseFloat(row.Discount).toLocaleString(),
    },
    {
        name: "total",
        align: "center",
        label: "TOTAL",
        field: (row) => parseFloat(row.Total).toLocaleString(),
    },
    {
        name: "options",
        align: "center",
        label: "OPCIONES",
    },
]);
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
    (nameExit.value = data.Name),
    (serialExit.value = data.Serial),
    (units2.value = data.Units),
    (priceExit.value = data.Price),
    (discount.value = data.Discount)
}

onMounted(() => {
  ExitsGet();
});
</script>