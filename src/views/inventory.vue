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
                <div class="bg-[#04162d] px-4 p-2 rounded-2xl">
                  <h4 class="text-xl text-white font-bold">Total Unidades: {{ TotalUnits }}</h4>
                </div>
            </div>
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="openModal"></q-btn>
        </div>
        <!-- table  -->
        <Tables :rows="rows" :columns="columns" :showModal="showModal" :Post="InventoryPut"/>
        <!-- modals  -->
        <Modal :showModal="showModal" />
    </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import Tables from "@/components/table.vue";
import Modal from "@/components/modals.vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";

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


console.log(Modal);
const storeInventory = inventoryStore();
const storeLogin = LoginStore();

let showModal = ref(false)
let loading=ref(false)
let TotalUnits=ref();

let index=ref(props.index)
let supplier=ref(props.supplier);
let name=ref(props.name);
let serial=ref(props.serial);
let units=ref(props.units);
let price=ref(props.price);
let expirationDate=ref(props.expirationDate);
let state=ref(props.state);
let crearCopias=ref(props.crearCopias);
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
      for (let i in res.data) {
        let unidad = { value: res.data[i].Units };
        TotalUnits.value += unidad.value;
      }
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
  clean()
  showModal.value = false;
  // search();
  GetInventario();
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
  showModal.value = false;
  // search();
  loading.value = false;
}


onMounted(() => {
  GetInventario();
  console.log(value);
});
</script>
