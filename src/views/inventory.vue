<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- title -->
            <div class="mb-4">
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl"> arrow_right </span>
                    INVENTARIO
                </h1>
            </div>
        <!-- btns y search-->
        <div class="flex justify-between py-4">
            <div class="flex items-center">
                <Search :filter="filter" :onSearch="search"/>
            </div>
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="showModal= true"></q-btn>
        </div>
        <!-- table  -->
        <Tables :rows="rows" :columns="columns" :showModal="showModal"/>
        <!-- modals  -->
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
                (val) => (val && val.trim().length > 0) || 'Digite las Unidades',
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
import { ref, onMounted} from "vue";
import Search from "@/components/search.vue";
import Tables from "@/components/table.vue";
// import Modal from "@/components/modals.vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";


const storeInventory = inventoryStore();
const storeLogin = LoginStore();

const showModal = ref(false)
let loading=ref(false)
let filter=ref("2")
let TotalUnits=ref();


let supplier=ref('');
let name=ref('');
let serial=ref('');
let units=ref();
let price=ref();
let expirationDate=ref('');
let state=ref('Disponible');
let states=ref(["Disponible","Agotado", "Oferta"])
let copias =ref('');
let opCopias=ref(["Sí", "No"])
let crearCopias=ref()
let user=ref(storeLogin.Email)


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
        field: (row) => parseFloat(row.Units).toLocaleString()
    },
    {
        name: "proveedor",
        align: "center",
        label: "PRECIO UNITARIO",
        field: (row) => parseFloat(row.Price).toLocaleString()
    },
    {
        name: "proveedor",
        align: "center",
        label: "PRECIO COMPRA",
        field: (row) => parseFloat(row.SellingPrice).toLocaleString()
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
        field: (row) => (row.ExpirationDate ? row.ExpirationDate.slice(0, 10) : "NA"),
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
        if (row.State === 'Disponible') {
          return 'color: green';
        }
        // Estilo por defecto
        return '';
      },
    },
    {
        name: "options",
        align: "center",
        label: "OPCIONES",
    },
]);

let rows = ref([]);

rows.value.forEach((row, index) => {
    row.index = index + 1;
});


function goInfo(data) {
    (supplier.value = data.Supplier),
    (name.value = data.Name),
    (serial.value = data.Serial),
    (units.value = data.Units),
    (preci.value = data.Price),
    (expirationDate.value = data.ExpirationDate)
}

// peticiones 
async function GetInventario() {
  let res;
    res = await storeInventory.GetInventory();
  if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
      TotalUnits.value = 0;
      
    });
  }
}

async function search(filter) {
    const res= await storeInventory.Filter(filter.value)
    if (res && res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
      TotalUnits.value = 0;
      for (let i in res.data) {
        let object = { label: res.data[i].Units };
        TotalUnits.value += object.label;
      }})
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
    // Crea una copia del elemento sin duplicar el serial
    const itemToDuplicate = {
      Supplier: supplier.value,
      Name: name.value,
      Serial: serial.value,
      Units: units.value,
      Price: price.value,
      ExpirationDate: expirationDate.value,
      State: state.value,
      UserEmail: user.value
    };
    for (let i = 0; i < crearCopias.value; i++) {
      const duplicatedItem = {
        ...itemToDuplicate,
      };
      // Realiza la petición al servidor para guardar la duplicación
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
  GetInventario();
  loading.value = false;
}


onMounted(() => {
  GetInventario();
});
</script>
