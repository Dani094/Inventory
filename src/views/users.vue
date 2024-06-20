<template>
  <div class="lg:pl-40 lg:pr-20 p-4">
    <!-- title -->
    <div class="mb-4">
      <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
        <span class="material-icons text-5xl"> arrow_right </span>
        CLIENTES
      </h1>
    </div>
    <!-- btn add -->
    <div class="flex justify-between py-4">
        <div class="flex items-center">
          <div>
            
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
    <!-- table -->
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
              v-if="props.row.state == 0" 
              round 
              size="xs" 
              class="mx-1"
              color="green-10"
              @click="StateUpdate(props.row)"
              icon="check"
              >
            </q-btn>
            <q-btn 
              v-else 
              round
              class="mx-1"
              size="xs" 
              color="red" 
              @click="StateUpdate(props.row)"
              icon="close"
              >
            </q-btn>
            <q-btn
              round
              icon="delete"
              class="bg-[#04162d]"
              size="xs"
              title="Borrar"
              @click="deleteItem(props.row)"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usersStore } from "../store/users.js";
import { sweetDelete } from "@/Global/notify";

const storeUsers = usersStore();

let index = ref();



// peticiones
async function UsersGet() {
  const res = await storeUsers.GetUsers();
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
  }
}
async function UsersPost() {
  loading.value = true;
  const res = await storeUsers.PostExits(
    { 
        NumBill: null,
        Name: nameExit.value,
        Serial: serialExit.value,
        Units:  unitsExit.value,
        Price:  priceExit.value,
        Discount: discount.value,
        UserEmail: user.value,
    }
  );
  showModalExits.value = false;
  UsersGet();
  loading.value = false;
}
async function UsersPut() {
  loading.value = true;
  const res = await storeUsers.PutInventory(
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
  UsersGet();
  loading.value = false;
}
async function deleteItem(data) {
  sweetDelete(data, async () => {
    try {
      await storeUsers.DeleteUser(data._id);
      UsersGet();
    } catch (error) {
      console.log(error);
    }
  });
}
async function StateUpdate(data) {
  let res = ""
  if (data.state == 1) {
    res = await storeUsers.UpdateState(data._id, 0)
    UsersGet()
  } else {
    res = await storeUsers.UpdateState(data._id, 1)
    UsersGet()
  }
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
// table
let rows = ref([]);
let pagination = { rowsPerPage: 50 };
let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center" },
  { name: "proveedor", align: "center", label: "DOCUMENTO", field: "Document",
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
    label: "APELLIDOS",
    field: "LastName",
  },
  {
    name: "proveedor",
    align: "center",
    label: "TELEFONO",
    field: "Cel",
  },
  {
    name: "proveedor",
    align: "center",
    label: "DIRECCIÓN",
    field: "Address",
  },
  {
    name: "proveedor",
    align: "center",
    label: "CORREO",
    field: "Email",
  },
  {
    name: "proveedor",
    align: "center",
    label: "MUNICIPIO",
    field: "Municipio",
  },
  {
    name: "date",
    label: "CONTRASEÑA",
    type:"password",
    field: (row) => row.Password.slice(0, 10),
    format: val => '•'.repeat(val.length),
    align: "center",
  },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.createdAt.slice(0, 10),
    align: "center",
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
    field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),
    style: (row) => {
      if (row.State === "Inactivo") {
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
onMounted(() => {
  UsersGet();
});
</script>
