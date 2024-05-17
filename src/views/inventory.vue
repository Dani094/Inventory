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
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="openModal"></q-btn>
        </div>
        <!-- table  -->
        <Tables :rows="rows" :columns="columns" />
        <!-- modals  -->
       
            <Modal />
        
    </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import Search from "@/components/search.vue";
import Tables from "@/components/table.vue";
import Modal from "@/components/modals.vue";
import { inventoryStore } from "@/store/inventory.js";
import Login from "./login.vue";

console.log(Modal);
const storeInventory = inventoryStore();
import { useModalStore } from '../store/modal.js';

const modalStore = useModalStore();
const openModal = modalStore.openModal;
const value = modalStore.showModal


let filter=ref("2")
let TotalUnits=ref();


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
        field: (row) => row.ExpirationDate.slice(0, 10),
        align: "center",
    },
    {
        name: "updateAt",
        align: "center",
        label: "ULTIMO CAMBIO",
        field: (row) => (row.updatedAt ? row.updatedAt.slice(0, 16) : ""),
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

onMounted(() => {
  GetInventario();
  console.log(value);
});
</script>
