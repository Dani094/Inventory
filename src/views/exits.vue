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
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="showModal = true"></q-btn>
        </div>
        <!-- table  -->
        <Tables :rows="rows" :columns="columns" />
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Tables from "@/components/table.vue"
import {exitStore} from "@/store/exits.js"

const storeExits = exitStore();


let showModal = ref(false);

// variables 
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
  const res = await storeExits.PutInventory(
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
  ExitsGet();
  loading.value = false;
}

// table  
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
        label: "PRECIO",
        field: (row) => parseFloat(row.Price).toLocaleString(),

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

onMounted(() => {
  ExitsGet();
});
</script>