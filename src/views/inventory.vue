<template>
  <div class="lg:pl-40 lg:pr-20 p-4">
    <!-- title -->
    <div class="mb-4">
      <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
        <span class="material-icons text-5xl"> arrow_right </span>
        INVENTARIO
      </h1>
    </div>
    <!-- count and add-->
    <div class="flex justify-between py-4">
        <div class="flex items-center">
          <div class="bg-[#04162d] px-4 p-2 rounded-2xl">
            <h4 class="text-xl text-white font-bold">
              Total Unidades: {{ TotalUnits }}
            </h4>
          </div>
        </div>
      <div class="flex gap-2">
        <Report :inventory="true"/>
          <q-btn
            icon="add"
            class="rounded-xl bg-[#04162d] text-white"
            @click="(showModal = true), cleanForm()">
          </q-btn>
      </div>
    </div>
    <!-- table  -->
    <!-- <Tables :rows="rows" :columns="columns" :showModal="showModal" :Post="InventoryPut"/> -->
    <q-table
      flat
      :separator="'cell'"
      bordered
      :rows="rows"
      :columns="columns"
      row-key="index"
      class="inventTable h-[550px] lg:h-[720px] rounded-2xl"
      :filter="filter"
      @focusin="activateNavigation"
      @focusout="deactivateNavigation"
      @keydown="onKey"
      virtual-scroll
      v-model:pagination="pagination"
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
              class="q-mx bg-[#04162d]"
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
              icon="remove_circle_outline"
              class="q-mx-md bg-[#FF0000]"
              size="xs"
              title="Salida"
              @click="
                (index = props.row._id),
                  goInfo2(props.row),
                  (showModalExits = true),
                  cleanForm()
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
    <!-- modals  -->
    <!-- modal crear -->
    <q-dialog v-model="showModal">
      <q-card class="w-[400px]">
        <q-card-section class="bg-[#04162d]">
          <h5 class="text-center text-white font-bold p-2 text-xl">
            INGRESA LOS DATOS
          </h5>
        </q-card-section>
        <div class="p-4">
          <q-form ref="myForm" @submit.prevent.stop="InventoryPost()">
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
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Precio',
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
                  v-if="(showModal = true)"
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
                v-close-popup
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
          <q-form ref="myForm" @submit.prevent.stop="InventoryPut()">
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
                      (val && val.toString().trim().length > 0) ||
                      'Digite las Unidades',
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
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite el Precio',
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
                v-close-popup
                >CERRAR
              </q-btn>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <!-- modal exits -->
    <q-dialog v-model="showModalExits">
      <q-card class="w-[400px]">
        <q-card-section class="bg-[#04162d]">
          <h5 class="text-center text-white font-bold p-2 text-xl">
            INGRESA LOS DATOS
          </h5>
        </q-card-section>
        <div class="p-4">
          <q-form ref="myForm" @submit.prevent.stop="ExitsPost()">
            <div class="flex w-full justify-center">
              <div class="w-[45%]">
                <q-input
                  type="text"
                  readonly
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
                  readonly
                  v-model="serialExit"
                  label="Serial"
                  class="mb-5"
                />
                <q-input
                  type="number"
                  readonly
                  v-model="units2"
                  label="Unidades Disponibles"
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
                  v-model="unitsExit"
                  label="Unidades a Sacar"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val &&
                        val.toString().length > 0 &&
                        parseInt(val) > 0 &&
                        parseInt(val) <= units2) ||
                      'No puede ser 0, Mayor o Menor a las Unidades Disponibles',
                  ]"
                />
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
                label="GUARDAR"
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
import { ref, onMounted } from "vue";
import Report from "@/components/descargarExcel.vue"
// import Tables from "@/components/table.vue";
// import Modal from "@/components/modals.vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";
import { exitStore } from "../store/exits.js";
import { sweetDelete } from "@/Global/notify";
import { useQuasar } from "quasar";

const $q = useQuasar();

$q.loading.show();
$q.loading.hide();

const storeInventory = inventoryStore();
const storeLogin = LoginStore();
const storeExits = exitStore();


let showModal = ref(false);
let showModalEdit = ref(false);
let showModalExits = ref(false);
let loading = ref(false);
// variables inventory
let index = ref();
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
let TotalUnits = ref();
// variables exits
let nameExit = ref("");
let serialExit = ref("");
let units2 = ref();
let unitsExit = ref();
let priceExit = ref();
let discount = ref("");

let rows = ref([]);

// peticiones
async function InventoryGet() {
  $q.loading.show();
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
      TotalUnits.value = 0;
      TotalUnits.value = rows.value.reduce(
        (total, row) => total + row.Units,
        0
      );
    });
    $q.loading.hide();
  }
}
async function InventoryPost() {
  loading.value = true;
  await storeInventory.PostInventory(
    supplier.value,
    name.value,
    serial.value,
    units.value,
    price.value,
    expirationDate.value,
    state.value,
    user.value
  );
  if (crearCopias.value >= 1) {
    const itemToDuplicate = {
      Supplier: supplier.value,
      Name: name.value,
      Units: units.value,
      Price: price.value,
      ExpirationDate: expirationDate.value,
      State: state.value,
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
        duplicatedItem.State,
        duplicatedItem.UserEmail
      );
    }
  }
  loading.value = false;
  showModal.value = false;
  InventoryGet();
}
async function InventoryPut() {
  loading.value = true;
  const res = await storeInventory.PutInventory(
    index.value,
    supplier.value,
    name.value,
    serial.value,
    units.value,
    price.value,
    expirationDate,
    state.value,
    user.value
  );
  showModalEdit.value = false;
  InventoryGet();
  loading.value = false;
}
async function deleteItem(data) {
  sweetDelete(data, async () => {
    try {
      await storeInventory.DeleteInventory(data._id);
      InventoryGet();
    } catch (error) {
      console.log(error);
    }
  });
}

// post exits, put cantidad
async function ExitsPost() {
  loading.value = true;
  const res = await storeExits.PostExits(
    { 
        NumBill: null,
        Name: nameExit.value,
        Serial: serialExit.value,
        Units: parseFloat(unitsExit.value),
        Price:  parseFloat(priceExit.value),
        Discount: parseFloat(discount.value),
        UserEmail: user.value,
    }
  );
  showModalExits.value = false;
  await putUnidades();
  InventoryGet();
  loading.value = false;
}
async function putUnidades() {
  if (units2.value-unitsExit.value == 0) {
      state.value= "Agotado"
  }
  const res = await storeInventory.PutUnits(
    index.value,
    units2.value,
    unitsExit.value,
    state.value
  );
}

function cleanForm() {
  supplier.value = "";
  name.value = "";
  serial.value = "";
  units.value = "";
  price.value = "";
  expirationDate.value = "";
  state.value = "Disponible";
  copias.value = "";
  crearCopias.value = "";
  unitsExit.value = "";
  discount.value = "";
}

// <--------------------------------------------------------------------->
// all table
let pagination = ref({
  rowsPerPage: 20,
});
let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center" },
  {
    name: "proveedor",
    align: "center",
    label: "PROVEEDOR",
    field: "Supplier",
  },
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
    field: (row) =>
      row.Serial ? row.Serial : "NA",
  },
  {
    name: "unidades",
    align: "center",
    label: "UNIDADES",
    field: (row) => parseFloat(row.Units).toLocaleString(),
    style: (row) => {
      if (row.Units <= 0) {
        return "background-color: rgba(255, 79, 79 )";
      } else if (row.Units >= 1 && row.Units < 10) {
        return "background-color: rgba(255, 251, 14 )";
      } else if (row.Units >= 10) {
        return "background-color: rgba(99, 239, 34)";
      } 
    }
  },
  {
    name: "precio unidad",
    align: "center",
    label: "PRECIO UNITARIO",
    field: (row) => parseFloat(row.Price).toLocaleString(),
  },
  {
    name: "precio compra",
    align: "center",
    label: "PRECIO TOTAL",
    field: (row) => parseFloat(row.SellingPrice).toLocaleString(),
  },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.createdAt.slice(0,10),
    align: "center",
  },
  {
    name: "date",
    label: "FECHA DE VENCIMIENTO",
    field: (row) =>
      row.ExpirationDate ? row.ExpirationDate.slice(0, 10) : "Sin Fecha",
    align: "center",
    style: (row) => {
      const expirationDate = new Date(row.ExpirationDate);
      const currentDate = new Date();
      if (!row.ExpirationDate) {
        return "color: black"; // NA
      }
      if (expirationDate < currentDate) {
        return "color: red"; // Expirado
      }
      if (expirationDate >= currentDate) {
        return "color: green"; // No expirado
      }
    },
  },
  {
    name: "updateAt",
    align: "center",
    label: "ULTIMO CAMBIO",
    field: (row) => (row.updatedAt ? row.updatedAt.slice(0, 10) : "NA"),
  },
  {
    name: "state",
    align: "center",
    label: "ESTADO",
    field: "State",
    style: (row) => {
      if (row.State === "Oferta") {
        return "color: yellow";
      }
      if (row.State === "Agotado") {
        return "color: red";
      }
      return "color: green";
    },
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
  (supplier.value = data.Supplier),
    (name.value = data.Name),
    (serial.value = data.Serial),
    (units.value = data.Units),
    (price.value = data.Price),
    (expirationDate = data.ExpirationDate ? data.ExpirationDate.slice(0,10) : ""),
    (state.value = data.State);
}
function goInfo2(data) {
    (nameExit.value = data.Name),
    (serialExit.value = data.Serial),
    (units2.value = data.Units),
    (priceExit.value = data.Price)
}

onMounted(() => {
  InventoryGet();
});
</script>
