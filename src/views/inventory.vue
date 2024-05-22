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
      <q-btn
        icon="add"
        class="rounded-xl bg-[#04162d] text-white"
        @click="showModal = true,cleanForm()"
      ></q-btn>
    </div>
    <!-- table  -->
    <Tables :rows="rows" :columns="columns" :showModal="showModal" :Post="InventoryPut"/>

    <modal /> 

  </div>
 
</template>

<script setup>
import { ref, onMounted } from "vue";
import Tables from "@/components/table.vue"
import Modal from "@/components/modals.vue"
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";



function togglePoppUp(params) {
  
}


const props= defineProps({
   index: String,
   supplier: String,
   name: String,
   serial: String,
   units: Number,
   price: Number,
   expirationDate: String,
   state: String,
   crearCopias: String
})

const storeInventory = inventoryStore();
const storeLogin = LoginStore();

let showModal = ref(false);
let showModalEdit=ref(false)



let loading = ref(false);

let index=ref()
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


let rows = ref([]);


// peticiones
async function InventoryGet() {
  const res = await storeInventory.GetInventory();
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index= index + 1;
      TotalUnits.value = 0;
      TotalUnits.value = rows.value.reduce((total, row) => total + row.Units, 0);
    });
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
      Serial: serial.value,
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
  showModal.value = false;
  // search();
  InventoryGet();
  loading.value = false;
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
    expirationDate.value,
    state.value,
    user.value
  );
  showModalEdit.value = false;
  // search();
  InventoryGet();
  loading.value = false;
}
async function deleteItem(ID) {
  loading.value = true;
  let res = "";
  res = await storeInventory.DeleteInventory(ID._id);
  if (res.status < 299) {
    InventoryGet();
    promptEliminar.value = false;
    loading.value = false;
  }
}



function cleanForm() {
  supplier.value = ""
  name.value = ""
  serial.value = ""
  units.value = ""
  price.value = "",
  expirationDate.value = ""
  state.value = "Disponible";
  copias.value = ""
  crearCopias.value = ""
}

// <---------------------------------------------------------------------> 
// all table
let pagination = { rowsPerPage: 50 };

let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center" },
  {
    name: "proveedor",
    align: "center",
    label: "PROVEEDOR",
    field: "Supplier",
  },
  {
    name: "proveedor",
    align: "center",
    label: "NOMBRE",
    field: "Name",
  },
  {
    name: "proveedor",
    align: "center",
    label: "SERIAL",
    field: "Serial",
  },
  {
    name: "proveedor",
    align: "center",
    label: "UNIDADES",
    field: (row) => parseFloat(row.Units).toLocaleString(),
  },
  {
    name: "proveedor",
    align: "center",
    label: "PRECIO UNITARIO",
    field: (row) => parseFloat(row.Price).toLocaleString(),
  },
  {
    name: "proveedor",
    align: "center",
    label: "PRECIO COMPRA",
    field: (row) => parseFloat(row.SellingPrice).toLocaleString(),
  },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.createdAt.slice(0, 10),
    align: "center",
  },
  {
    name: "date",
    label: "FECHA DE VENCIMIENTO",
    field: (row) =>
      row.ExpirationDate ? row.ExpirationDate.slice(0, 10) : "NA",
    align: "center",
  },
  {
    name: "updateAt",
    align: "center",
    label: "ULTIMO CAMBIO",
    field: (row) => (row.updatedAt ? row.updatedAt.slice(0, 16) : "NA"),
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
    (expirationDate.value = data.ExpirationDate),
    (state.value = data.State)
}

onMounted(() => {
  InventoryGet();
});
</script>
