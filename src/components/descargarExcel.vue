<template>
  <div>
    <!-- Botón de apertura con tooltip e ícono representativo -->
    <q-btn
      unelevated
      color="primary"
      class="bg-slate-900 text-white rounded-xl px-2 py-4 hover:bg-slate-800 transition-all shadow-sm "
      @click="showModal = true; clean()"
    >
      <q-icon name="file_download" class="mr-2" size="20px" />
      <span class="font-medium text-sm">Descargar Reporte</span>
      <q-tooltip class="bg-slate-800 text-xs">Exportar datos a Excel</q-tooltip>
    </q-btn>

    <!-- Modal de Selección de Fechas -->
    <q-dialog v-model="showModal" transition-show="scale" transition-hide="scale ">
      <q-card class="w-[420px] max-w-full rounded-2xl overflow-hidden shadow-2xl bg-white">
        
        <!-- Header del Modal -->
        <div class="bg-slate-900 text-white p-6 relative ">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <q-icon name="description" size="24px" />
            </div>
            <div>
              <h3 class="text-lg font-bold tracking-tight">Exportar a Excel</h3>
              <p class="text-xs text-slate-400">Selecciona el periodo del reporte</p>
            </div>
          </div>

          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="absolute top-4 right-4 text-slate-400 hover:text-white"
          />
        </div>

        <!-- Contenido del Modal -->
        <q-card-section class="p-6 rounded-2xl">
          <q-form ref="myForm" @submit.prevent.stop="OptionGet" class="space-y-4">
            
            <!-- Selector Tipo Fecha -->
            <div class="space-y-4">
              <div v-if="fechaDia === ''" class="flex flex-col">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Filtrar por Mes
                </label>
                <q-input
                  outlined
                  dense
                  type="month"
                  v-model="fechaExcel"
                  class="rounded-xl bg-slate-50"
                  active-design="outlined"
                />
              </div>

              <div v-if="fechaExcel === ''" class="flex flex-col">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Filtrar por Día Exacto
                </label>
                <q-input
                  outlined
                  dense
                  type="date"
                  v-model="fechaDia"
                  class="rounded-xl bg-slate-50"
                  active-design="outlined"
                />
              </div>
            </div>

            <!-- Botón para limpiar filtros activos si eligió uno -->
            <div v-if="fechaExcel || fechaDia" class="flex justify-end">
              <button 
                type="button" 
                @click="clean" 
                class="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
              >
                <q-icon name="restart_alt" size="14px" />
                Limpiar selección
              </button>
            </div>

            <!-- Acciones / Botones -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <q-btn
                flat
                label="Cancelar"
                v-close-popup
                class="rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider"
              />

              <q-btn
                unelevated
                type="submit"
                :loading="loading"
                :disabled="!fechaExcel && !fechaDia"
                class="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                <q-icon name="download" size="18px" class="mr-1.5" />
                Generar Excel
              </q-btn>
            </div>

          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
const props = defineProps({ 
  inventory: Boolean,
  exits: Boolean
})
import { ref } from "vue";
import { inventoryStore } from "@/store/inventory.js";
import { exitStore } from "@/store/exits.js"
import { LoginStore } from "../store/login.js";
import ExcelJS from "exceljs";

const storeInventory = inventoryStore();
const storeExits = exitStore();
const storeLogin = LoginStore();

let showModal = ref(false);
let loading = ref(false)

let rows = ref([]);
let fechaExcel = ref("");
let fechaDia = ref("");

function clean() {
  fechaExcel.value = ""
  fechaDia.value = ""
}

// get por fecha inventario
async function GetPorFecha() {
  loading.value = true;
  try {
    let res;
    if (fechaExcel.value !== "") {
      res = await storeInventory.GetForDate(fechaExcel.value, storeLogin.Email);
    } else {
      res = await storeInventory.GetForDay(fechaDia.value, storeLogin.Email);
    }
    if (res?.status < 299) {
      rows.value = res.data;
      rows.value.forEach((row, index) => {
        row.index = index + 1;
      });
      await downloadExcel();
      showModal.value = false;
    }
  } catch (error) {
    console.error("Error al obtener reporte de inventario:", error);
  } finally {
    loading.value = false;
  }
}

// get por fecha salidas
async function GetPorFechaSalidas() {
  loading.value = true;
  try {
    let res;
    if (fechaExcel.value !== "") {
      res = await storeExits.GetForDate(fechaExcel.value, storeLogin.Email);
    } else {
      res = await storeExits.GetForDay(fechaDia.value, storeLogin.Email);
    }
    if (res?.status < 299) {
      rows.value = res.data;
      rows.value.forEach((row, index) => {
        row.index = index + 1;
      });
      await downloadExcelExit();
      showModal.value = false;
    }
  } catch (error) {
    console.error("Error al obtener reporte de salidas:", error);
  } finally {
    loading.value = false;
  }
}

function OptionGet() {
  if (props.inventory === true) {
    GetPorFecha()
  } else if (props.exits === true) {
    GetPorFechaSalidas()
  } 
}

// crear excel
async function downloadExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Reportes");

  worksheet.columns = [
    { header: "N°", key: "index" },
    { header: "PROVEEDOR", key: "Supplier" },
    { header: "NOMBRE", key: "Name" },
    { header: "SERIAL", key: "Serial" },
    { header: "UNIDADES", key: "Units" },
    { header: "PRECIO DE COMPRA", key: "PriceBuy" },
    { header: "PRECIO DE VENTA", key: "PriceSale" },
    { header: "PRECIO DE COMPRA total", key: "PurchasePrice" },
    { header: "PRECIO DE VENTA total", key: "SellingPrice" },
    { header: "ESTADO", key: "State" },
    { header: "FECHA", key: "createdAt" },
    { header: "FECHA DE VENCIMIENTO", key: "ExpirationDate" }
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
  a.download = `Reporte_Inventario(${fechaExcel.value ? fechaExcel.value : fechaDia.value}).xlsx`;
  a.click();

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
    { header: "FECHA", key: "createdAt" },
    { header: "DESCRIPCION", key: "description" },
    { header: "MÉTODO DE PAGO", key: "methodPayment" },
    { header: "CLIENTE", key: "Client" },
    { header: "FECHA DE VENTA", key: "Date" },

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
  a.download = `Reporte_Salidas(${fechaExcel.value ? fechaExcel.value : fechaDia.value}).xlsx`;
  a.click();

  window.URL.revokeObjectURL(url);
}
</script> 