<template>
  <div>
    <button class="rounded-xl bg-[#04162d] text-white p-3 flex text-xl" @click="showModal = true, clean()">
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
          <q-form ref="myForm" @submit.prevent.stop="OptionGet()">
            <div class="flex w-full justify-center">
              <div class="w-[100%]">
                <q-input v-if='fechaDia === ""' type="month" v-model="fechaExcel" label="Descargar por mes"
                  class="mb-5" />
                <q-input v-if='fechaExcel === ""' type="date" v-model="fechaDia" label="Descargar por día"
                  class="mb-5" />
              </div>
            </div>
            <!-- div botones  -->
            <div class="flex justify-center items-center gap-4">
              <q-btn icon="save_as" label="GUARDAR" :loading="loading" type="submit"
                class="text-white bg-green-800 rounded-2xl"></q-btn>
              <q-btn icon="cancel" type="button" class="text-white bg-red-700 rounded-2xl" v-close-popup>CERRAR
              </q-btn>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
const props= defineProps({ 
  inventory: Boolean,
  exits: Boolean
})
import { ref } from "vue";
import { inventoryStore } from "@/store/inventory.js";
import { exitStore } from "@/store/exits.js"
import ExcelJS from "exceljs";

const storeInventory = inventoryStore();
const storeExits = exitStore();

let showModal = ref(false);
let loading = ref(false)

let rows = ref([]);
let fechaExcel = ref("");
let fechaDia = ref("");


function clean() {
  fechaExcel.value=""
  fechaDia.value=""
}

// get por fecha inventario
async function GetPorFecha() {
  let res;
  if (fechaExcel.value !== "") {
    res = await storeInventory.GetForDate(fechaExcel.value);
  } else {
    res = await storeInventory.GetForDay(fechaDia.value);
  }
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    await downloadExcel();
    showModal.value = false;
  }
}
// get por fecha salidas
async function GetPorFechaSalidas() {
  let res;
  if (fechaExcel.value !== "") {
    res = await storeExits.GetForDate(fechaExcel.value);
  } else {
    res = await storeExits.GetForDay(fechaDia.value);
  }
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    await downloadExcelExit();
    showModal.value = false;
  }
}

function OptionGet() {
  if (props.inventory== true) {
    GetPorFecha()
  } if (props.exits== true) {
    GetPorFechaSalidas()
  } 
}


// crear excel
async function downloadExcel() {
  // Crear una instancia de un nuevo libro de Excel
  const workbook = new ExcelJS.Workbook();
  // Crear una hoja de cálculo
  const worksheet = workbook.addWorksheet("Reportes");
  // Definir el encabezado de la hoja de cálculo
  worksheet.columns = [
    { header: "N°", key: "index" },
    { header: "PROVEEDOR", key: "Supplier" },
    { header: "NOMBRE", key: "Name" },
    { header: "SERIAL", key: "Serial" },
    { header: "UNIDADES", key: "Units" },
    { header: "PRICE", key: "Price" },
    { header: "ESTADO", key: "State" },
    { header: "PRECIO DE VENTA", key: "SellingPrice" },
    { header: "FECHA", key: "createdAt" },
    { header: "FECHA DE VENCIMIENTO", key: "ExpirationDate" }
  ];

  // Aplicar estilo al encabezado
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCCC' },
    };
  });

  // Ajustar el ancho de las columnas automáticamente
  worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length;
  });

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
  a.download = `Reporte_Inventario(${fechaExcel.value ? fechaExcel.value : fechaDia.value
    }).xlsx`;
  a.click();

  // Liberar la URL del Blob
  window.URL.revokeObjectURL(url);
}

async function downloadExcelExit() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Reportes");
  worksheet.columns = [
    { header: "N°", key: "index" },
    { header: "NOMBRE", key: "Name" },
    { header: "SERIAL", key: "Serial" },
    { header: "UNIDADES", key: "Units" },
    { header: "PRICE", key: "Price" },
    { header: "DESCUENTO", key: "Discount" },
    { header: "TOTAL", key: "Total" },
    { header: "FECHA", key: "createdAt" }
  ];
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCCC' },
    };
  });
  worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length;
  });
  rows.value.forEach((row) => {
    worksheet.addRow(row);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Reporte_Salidas(${fechaExcel.value ? fechaExcel.value : fechaDia.value
    }).xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}


</script>
