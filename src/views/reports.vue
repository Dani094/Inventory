<template>
  <div class="lg:pl-40 lg:pr-20 p-4">
    soy reportes
    <button
      class="rounded-xl bg-[#04162d] text-white p-3 flex gap-2 items-center text-2xl"
      @click="showModal = true"
    >
      <span class="material-icons"> download </span>
      <!-- <i class="fa-solid fa-file-excel"></i> -->
    </button>

    <!-- modal-->
    <q-dialog v-model="showModal">
      <q-card class="w-[400px]">
        <q-card-section class="bg-[#04162d]">
          <h5 class="text-center text-white font-bold p-2 text-xl">
            DESCARGAR EXCEL
          </h5>
        </q-card-section>
        <div class="px-8 py-4">
          <q-form ref="myForm" @submit.prevent.stop="GetPorFecha()">
            <div class="flex w-full justify-center">
              <div class="w-[100%]">
                <q-input
                  v-if='fechaDia === ""'
                  type="month"
                  v-model="fechaExcel"
                  label="Descargar por mes"
                  class="mb-5"
                />
                <q-input
                  v-if='fechaExcel === ""'
                  type="date"
                  v-model="fechaDia"
                  label="Descargar por día"
                  class="mb-5"
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
import { ref } from "vue";
import { inventoryStore } from "@/store/inventory.js";
import {exitStore} from "@/store/exits.js"
import ExcelJS from "exceljs";

const storeInventory = inventoryStore();
const storeExits = exitStore();

let showModal = ref(false);
let loading=ref(false)

let rows = ref([]);
let fechaExcel = ref("");
let fechaDia = ref("");

// get por fecha inventario
async function GetPorFecha() {
  let res;
  if (fechaExcel.value !== "") {
    res = await storeInventory.listarFecha(fechaExcel.value);
  } else {
    res = await storeInventory.listarDia(fechaDia.value);
  }
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    await descargarExcel();
    abrirDescargar.value = false;
  }
}

// get por fecha salidas
async function GetPorFechaSalidas() {
  let res;
  if (fechaExcel.value !== "") {
    res = await storeSalidas.listarFecha(fechaExcel.value);
  } else {
    res = await storeSalidas.listarDia(fechaDia.value);
  }
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    await descargarExcelSalidas();
    abrirDescargarSalidas.value = false;
  }
}

// crear excel
async function descargarExcel() {
  // Crear una instancia de un nuevo libro de Excel
  const workbook = new ExcelJS.Workbook();
  // Crear una hoja de cálculo
  const worksheet = workbook.addWorksheet("Reportes");

  // Definir el encabezado de la hoja de cálculo
  worksheet.columns = [
    { header: "N°", key: "index" },
    { header: "PROVEEDOR", key: "Proveedor" },
    { header: "CATEGORIA", key: "Categoria" },
    { header: "MODELO", key: "Modelo" },
    { header: "SERIAL", key: "Serial" },
    { header: "ID INVENTARIO", key: "IdInvent" },
    { header: "OFICINA", key: "Oficina" },
    { header: "UNIDADES", key: "Unidades" },
    { header: "PRECIO", key: "Precio" },
    { header: "FECHA", key: "createdAt" },
    { header: "ULTIMO CAMBIO", key: "updatedAt" },
    { header: "ESTADO", key: "Estado" },
    { header: "ESTADO FISICO", key: "EstadoFisico" },
  ];

  // Agregar los datos de la tabla a la hoja de cálculo
  rows.value.forEach((row) => {
    worksheet.addRow(row);
  });

  // Crear un Blob a partir del libro Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Crear una URL del Blob para descargar el archivo
  const url = window.URL.createObjectURL(blob);

  // Crear un enlace y simular un clic para descargar el archivo
  const a = document.createElement("a");
  a.href = url;
  a.download = `Reporte_Inventario(${
    fechaExcel.value ? fechaExcel.value : fechaDia.value
  }).xlsx`;
  a.click();

  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
}
</script>
