<template>
    <div>
        <canvas :id="chartId" class="flex justify-center items-center p-4 lg:p-10" :style="{ width: chartWidth, height: chartHeight }"></canvas> 
    </div>
</template>

<script setup>
const props= defineProps({
    names: Array,
    valores: Array,
    newType: String,
    chartId: String,
    chartWidth: String,
    chartHeight: String
})
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { inventoryStore } from "@/store/inventory.js";

const storeInventory = inventoryStore();

let loading=ref(false)
let names = ref([]);
let valores = ref([]);
let type = ref("bar");
let newType = ref(props.newType);
let myChart;


// traer los datos por proveedor
async function GetInventory() {
  const res = await storeInventory.GetInventory();
  try {
    const unidadesPorProveedor = {};

    for (let i in res.data) {
      const productos = res.data[i].Name;
      let unidades = res.data[i].Units;

      // Si es la primera vez que se encuentra este proveedor, inicializa el total de puntos
      if (!unidadesPorProveedor[productos]) {
        unidadesPorProveedor[productos] = unidades;
      } else {
        // Si ya se ha encontrado antes, suma los puntos al total
        unidadesPorProveedor[productos] += unidades;
      }
    }
    names.value = [];
    valores.value = [];
    // Recorremos el objeto 'unidadesPorProveedor' para obtener los nombres y valores
    for (const productos in unidadesPorProveedor) {
      names.value.push(productos);
      valores.value.push(unidadesPorProveedor[productos]);
    }
  } catch (error) {}
}

// chart 
async function createChart() {
  loading.value = true;
  type.value=newType.value
  await GetInventory()
  const ctx = document.getElementById(props.chartId);
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: type.value,
    data: {
      labels: names.value,
      datasets: [
        {
          label: "INVENTARIO",
          data: valores.value,
          backgroundColor: [
            "rgb(255, 99, 132, 0.3)",
            "rgb(54, 162, 132, 0.3)",
            "rgb(132, 142, 132, 0.3)",
            "rgb(233, 59, 22, 0.3)",
            "rgb(19, 198, 25, 0.3)",
            "rgb(19, 27, 198, 0.3)",
            "rgb(129, 14, 157, 0.3)",
            "rgb(212, 176, 16, 0.3)",
            "rgb(250, 243, 18, 0.3)",
            "rgb(28, 254, 250, 0.3)",
            "rgb(236, 154, 28, 0.3)",
            "rgb(184, 24, 148, 0.3)",
            "rgb(26, 210, 204, 0.3)",
            "rgb(67, 15, 15, 0.3)",
            "rgb(142, 8, 8 , 0.3)",
            "rgb(188, 214, 169 , 0.3)",
            "rgb(42, 91, 108  0.3)",
            "rgb(254, 136, 226, 0.3)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 132)",
            "rgb(132, 142, 132)",
            "rgb(233, 59, 22)",
            "rgb(19, 198, 25)",
            "rgb(19, 27, 198)",
            "rgb(129, 14, 157)",
            "rgb(212, 176, 16)",
            "rgb(250, 243, 18)",
            "rgb(28, 254, 250)",
            "rgb(236, 154, 28)",
            "rgb(184, 24, 148)",
            "rgb(26, 210, 204)",
            "rgb(67, 15, 15)",
            "rgb(142, 8, 8 )",
            "rgb(188, 214, 169 )",
            "rgb(42, 91, 108 )",
            "rgb(254, 136, 226)",
          ],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  loading.value = false;
}

onMounted(()=>{
    createChart()
    GetInventory()
})

</script>