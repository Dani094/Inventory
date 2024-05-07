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
                <Search />
            </div>
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="showModal = true"></q-btn>
        </div>
        <!-- table  -->
        <Tables :rows="rows" :columns="columns" />
        <!-- modals  -->
        <q-dialog v-model="showModal">
            <Modal />
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Search from "@/components/search.vue";
import Tables from "@/components/table.vue";
import Modal from "@/components/modals.vue";

let showModal = ref(false);
let state = ref("Activo");

let rows = ref([]);
rows.value = [
    { Proveedor: "Proveedor 1", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 2", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 3", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
    { Proveedor: "Proveedor 4", Cantidad: "1", Estado:state },
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
        field: "Estado",
        style: (row) => {
        if (row.Estado === 'Activo') {
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
</script>
