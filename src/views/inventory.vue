<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <div>
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div>
                    <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                        <span class="material-icons text-5xl">
                            arrow_right
                        </span>
                        INVENTARIO
                    </h1>
                </div>
                <!-- search  -->
                <Search/>
            </div>
        </div>
        <!-- btns -->
        <q-btn></q-btn>
        <!-- table  -->
            <Tables :rows="rows" :columns="columns"/>
    </div>
</template>

<script setup>
import {ref} from "vue"
import Search from "@/components/search.vue"
import Tables from "@/components/table.vue"


let state=ref("Activo")

let rows = ref([]);
rows.value = [
  { Proveedor: "Proveedor 1" ,Cantidad: "1"},
  { Proveedor: "Proveedor 2" ,Cantidad: "1"},
  { Proveedor: "Proveedor 3" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
  { Proveedor: "Proveedor 4" ,Cantidad: "1"},
];

rows.value.forEach((row, index) => {
  row.index = index + 1;
});

let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center" },
  {
    name: "proveedor",
    align: "center",
    label: "NOMBRE",
    field: "Proveedor",
  },
  {
    name: "proveedor",
    align: "center",
    label: "Cantidad",
    field: "Cantidad",
  },
  {
    name: "state",
    align: "center",
    label: "ESTADO",
    field: "state",
  },
  {
    name: "options",
    align: "center",
    label: "OPCIONES"
  },
])
</script>