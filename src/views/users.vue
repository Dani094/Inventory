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

 <!-- modals -->
  <!-- modal crear -->
 <q-dialog v-model="showModal">
      <q-card class="w-[400px]">
        <q-card-section class="bg-[#04162d]">
          <h5 class="text-center text-white font-bold p-2 text-xl">
            INGRESA LOS DATOS
          </h5>
        </q-card-section>
        <div class="p-4">
          <q-form ref="myForm" @submit.prevent.stop="UsersPost()">
            <div class="flex w-full justify-center">
              <div class="w-[45%]">
                <q-input
                  type="text"
                  v-model="document"
                  label="Documento"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Documento',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="name"
                  label="Nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite el Nombre',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="lastName"
                  label="Apellidos"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite los Apellidos',
                  ]"
                />
                <q-input
                  type="number"
                  v-model="cel"
                  label="Telefono"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Dijite su Telefono',
                    (val) =>
                      (val && val.trim().length === 10) ||
                      'El número de teléfono debe tener 10 dígitos',
                  ]"
                />
              </div>
              <div class="w-[45%] ml-4">
                <q-input
                  type="text"
                  v-model="address"
                  label="Dirección"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite la Dirección',
                  ]"
                />
                <q-input
                  type="email"
                  v-model="email"
                  label="Correo"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Correo',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="municipality"
                  label="Municipio"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Municipio',
                  ]"
                />
                <q-input
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
                  label="Contraseña"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Dijite la Contraseña',
                    (val) =>
                      (val && val.trim().length >= 8) ||
                      'La Contraseña debe tener minimo 8 dígitos',
                  ]"
                >
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-[#04162d]"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
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
            EDITE LOS DATOS
          </h5>
        </q-card-section>
        <div class="p-4">
          <q-form ref="myForm" @submit.prevent.stop="UsersPut()">
            <div class="flex w-full justify-center">
              <div class="w-[45%]">
                <q-input
                  type="text"
                  v-model="document"
                  label="Documento"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Documento',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="name"
                  label="Nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite el Nombre',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="lastName"
                  label="Apellidos"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().trim().length > 0) ||
                      'Digite los Apellidos',
                  ]"
                />
                <q-input
                  type="number"
                  v-model="cel"
                  label="Telefono"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Dijite su Telefono',
                    (val) =>
                      (val && val.trim().length === 10) ||
                      'El número de teléfono debe tener 10 dígitos',
                  ]"
                />
              </div>
              <div class="w-[45%] ml-4">
                <q-input
                  type="text"
                  v-model="address"
                  label="Dirección"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite la Dirección',
                  ]"
                />
                <q-input
                  type="email"
                  v-model="email"
                  label="Correo"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Correo',
                  ]"
                />
                <q-input
                  type="text"
                  v-model="municipality"
                  label="Municipio"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Digite el Municipio',
                  ]"
                />
                <q-input
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
                  label="Contraseña"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.trim().length > 0) || 'Dijite la Contraseña',
                    (val) =>
                      (val && val.trim().length >= 8) ||
                      'La Contraseña debe tener minimo 8 dígitos',
                  ]"
                >
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-[#04162d]"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usersStore } from "../store/users.js";
import { LoginStore } from "../store/login.js";
import { sweetDelete } from "@/Global/notify";
import { useQuasar } from "quasar";

const $q = useQuasar();

$q.loading.show();
$q.loading.hide();
const storeUsers = usersStore();
const storeLogin = LoginStore();

let isPwd = ref(true);
let showModal=ref(false)
let showModalEdit=ref(false)
let loading=ref(false)
// variables
let index = ref();
let document=ref()
let name=ref()
let lastName=ref()
let cel=ref()
let address=ref()
let email=ref()
let municipality=ref()
let password=ref()
let user=ref(storeLogin.Email)

// peticiones
async function UsersGet() {
  $q.loading.show();
  const res = await storeUsers.GetUsers();
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    $q.loading.hide();
  }
}
async function UsersPost() {
  loading.value = true;
  const res = await storeUsers.PostUsers(
    document.value,
    name.value,
    lastName.value,
    cel.value,
    address.value,
    email.value,
    municipality.value,
    password.value,
    user.value
  );
  showModal.value = false;
  UsersGet();
  loading.value = false;
}
async function UsersPut() {
  loading.value = true;
  const res = await storeUsers.PutUser(
    index.value,
    document.value,
    name.value,
    lastName.value,
    cel.value,
    address.value,
    email.value,
    municipality.value,
    password.value,
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

function goInfo(data) {
    (document.value = data.Document),
    (name.value = data.Name),
    (lastName.value = data.LastName),
    (cel.value = data.Cel),
    (address.value = data.Address),
    (email.value = data.Email ),
    (municipality.value = data.Municipio);
    (password.value = data.Password);
}
function cleanForm() {
  document.value=""
  name.value=""
  lastName.value=""
  cel.value=""
  address.value=""
  email.value=""
  municipality.value=""
  password.value=""
}
// table
let rows = ref([]);
let pagination = ref({
  rowsPerPage: 50,
});
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
