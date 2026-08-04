<template>
  <div class="p-6 lg:p-20 w-full max-w-[1600px] mx-auto">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 ">
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-green-600 rounded-full"></div>
          DASHBOARD
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Descripción General</p>
      </div>
      
      <div class="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="w-10 h-10 rounded-xl bg-[#1a2332] flex items-center justify-center text-white font-bold text-sm">
          {{ storeLogin.Name?.charAt(0) }}
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-[#1a2332]">{{ storeLogin.Name }}</span>
          <span class="text-[10px] text-gray-400 leading-none">{{ storeLogin.Email }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <CardInfo 
        :num="TotalUnits" 
        :title="'Total Inventario'" 
        :newRoute="'/inventory'"
        class="bg-white rounded-[2rem] p-2 shadow-sm hover:shadow-md transition-all border-none" 
      />
      <CardInfo 
        :num="TotalUnits2" 
        :title="'Total Ventas'" 
        :newRoute="'/exits'" 
        class="bg-white rounded-[2rem] p-2 shadow-sm hover:shadow-md transition-all border-none"
      />
      <CardInfo 
        :num="estimatedExits" 
        :title="'Valor Potencial de Venta'" 
        :newRoute="'/inventory'"
        class="bg-white rounded-[2rem] p-2 shadow-sm hover:shadow-md transition-all border-none" 
      />
      <CardInfo 
        :num="estimatedProfit" 
        :title="'margen de ganancia'" 
        :newRoute="'/inventory'" 
        class="bg-white rounded-[2rem] p-2 shadow-sm hover:shadow-md transition-all border-none"
      />
    </div>

    <div class="mb-10">
      <div class="flex items-center gap-3 mb-8">
        <div class="w-1.5 h-8 bg-[#1a2332] rounded-full"></div>
        <h2 class="text-xl font-bold text-[#1a2332] tracking-tight text-uppercase">Análisis de Flujo</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <div class="lg:col-span-6 bg-[#1a2332] p-12 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-start">
        <h3 class="font-bold mb-6 opacity-80 text-center uppercase text-[10px] tracking-[2px]">
          Productos más vendidos
        </h3>
        
        <div class="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2 custom-scroll">
          
          <p v-if="topProducts.length === 0" class="text-sm text-gray-400 text-center py-4">
            No hay datos de ventas disponibles
          </p>

          <div 
            v-for="(product, index) in topProducts" 
            :key="index" 
            class="flex flex-col gap-1 border-b border-gray-700/50 pb-3 last:border-none"
          >
            <div class="flex justify-between items-center text-sm">
              <div class="flex items-center gap-2">
                <span :class="{
                  'text-amber-400 font-bold': index === 0,
                  'text-slate-300 font-bold': index === 1,
                  'text-amber-600 font-bold': index === 2,
                  'text-gray-500': index > 2
                }">
                  #{{ index + 1 }}
                </span>
                <span class="font-medium truncate max-w-[180px]">
                  {{ product.Name || product.Nombre }}
                </span>
              </div>
              
              <span class="font-bold text-green-400">
                {{ product.qty || product.TotalUnits }} unds
              </span>
            </div>

            <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                class="bg-green-500 h-full rounded-full"
                :style="{ width: `${(product.TotalUnits / topProducts[0].qty) * 100}%` }"
              ></div>
            </div>
          </div>

        </div>
      </div>
        <div class="lg:col-span-6 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-center content-center ">
        <h3 class="font-bold text-gray-800 mb-6 text-center uppercase text-xs tracking-widest ">Frecuencia por Categoría</h3>
        <ChartUse :chartExits="true" :newType="'polarArea'" chartId="chart4" class="h-[400px]"/>
        </div>

         <div class="lg:col-span-5 bg-white p-4 rounded-[2.5rem] shadow-xl text-gray-800 flex flex-col justify-center items-center">
          <h3 class="font-bold mb-6 opacity-80 text-center uppercase text-[10px] tracking-[2px]">Distribución de Stock</h3>
          <ChartUse :chartInventory="true" :newType="'pie'" chartId="chart3" class="h-[450px] flex justify-center items-center"/>
        </div>

        <div class="lg:col-span-7 bg-[#1a2332] p-4 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-white mb-6 text-center uppercase text-xs tracking-widest ">Ventas Mensual</h3>
          <ChartUse :chartExits="true" :title="'Ventas'" :newType="'line'" chartId="chart2" class="h-[450px] " />
        </div>
   
        <div class="lg:col-span-8 bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-gray-800 mb-2 text-center uppercase text-xs tracking-widest ">Inventario Mensual</h3>
          <ChartUse :chartInventory="true" :title="'Inventario'" :newType="'bar'" chartId="chart1" />
        </div>

        
    
      </div>
    </div>

    <FooterUs class="mt-12 py-6 border-t border-gray-100" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CardInfo from "@/components/card.vue";
import ChartUse from "@/components/charts.vue";
import FooterUs from "@/components/footer.vue";
import { inventoryStore } from "@/store/inventory.js";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";

const storeInventory = inventoryStore();
const storeExits = exitStore();
const storeLogin = LoginStore();

const topProducts = ref([]);

let TotalUnits = ref(0);
let TotalUnits2 = ref(0);
let estimatedProfit = ref(0);
let estimatedExits = ref(0);

async function InventoryGet() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res && res.status < 299) {
    // Reiniciamos valores para evitar acumulaciones si se vuelve a llamar
    TotalUnits.value = 0;

    estimatedProfit.value = res.data.statistics.estimatedProfit
    TotalUnits.value = res.data.statistics.inventoryValue;
    estimatedExits.value = res.data.statistics.estimatedExits;
  }
}

async function ExitsGet() {
  const res = await storeExits.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    TotalUnits2.value = res.data.exits.reduce((acc, curr) => acc + curr.Total, 0);
  }
}

async function getDashboard() {
  try {
    const res = await storeExits.getDashboard(storeLogin.Email);
    if (res && res.status < 299) {
     console.log(res.data);
     
    topProducts.value = res.data.statistics.topProducts || [];

    const valor = res.data.statistics.dineroHoy || 0;
    console.log("Valor de dineroHoy:", valor);
    }
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
  }
}

onMounted(() => {
  InventoryGet();
  ExitsGet();
  getDashboard()
});
</script>

<style scoped>
/* Animación suave al cargar las secciones */
.grid > div {
  transition: all 0.3s ease;
}

.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>