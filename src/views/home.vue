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
        :num="spent" 
        :title="'Productos Agotados'" 
        :newRoute="'/inventory'"
        class="bg-white rounded-[2rem] p-2 shadow-sm hover:shadow-md transition-all border-none" 
      />
      <CardInfo 
        :num="expiration" 
        :title="'Productos Vencidos'" 
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
        <div class="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-gray-800 mb-6 text-center uppercase text-xs tracking-widest text-gray-400">Inventario Mensual</h3>
          <ChartUse :chartInventory="true" :title="'Inventario'" :newType="'bar'" chartId="chart1" class="h-[400px]"/>
        </div>

        <div class="lg:col-span-5 bg-[#1a2332] p-8 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center">
          <h3 class="font-bold mb-6 opacity-80 text-center uppercase text-[10px] tracking-[2px]">Distribución de Stock</h3>
          <ChartUse :chartInventory="true" :newType="'pie'" chartId="chart3" class="h-[350px] flex justify-center items-center"/>
        </div>

        <div class="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-gray-800 mb-6 text-center uppercase text-xs tracking-widest text-gray-400">Ventas Mensual</h3>
          <ChartUse :chartExits="true" :title="'Salidas'" :newType="'line'" chartId="chart2" class="h-[350px]" />
        </div>

        <div class="lg:col-span-5 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-center">
          <h3 class="font-bold text-gray-800 mb-6 text-center uppercase text-xs tracking-widest text-gray-400">Frecuencia por Categoría</h3>
          <ChartUse :chartExits="true" :newType="'polarArea'" chartId="chart4" class="h-[350px]"/>
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

let TotalUnits = ref(0);
let TotalUnits2 = ref(0);
let spent = ref(0);
let expiration = ref(0);

async function InventoryGet() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res && res.status < 299) {
    // Reiniciamos valores para evitar acumulaciones si se vuelve a llamar
    TotalUnits.value = 0;
    spent.value = 0;
    expiration.value = 0;

    res.data.forEach(item => {
      TotalUnits.value += item.SellingPrice;
      
      if (item.State === "Agotado") {
        spent.value += 1;
      }

      const expirationDate = item.ExpirationDate;
      if (expirationDate && expirationDate !== "NA") {
        const expDate = new Date(expirationDate);
        if (expDate < new Date()) {
          expiration.value += 1;
        }
      }
    });
  }
}

async function ExitsGet() {
  const res = await storeExits.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    TotalUnits2.value = res.data.reduce((acc, curr) => acc + curr.Total, 0);
  }
}

onMounted(() => {
  InventoryGet();
  ExitsGet();
});
</script>

<style scoped>
/* Animación suave al cargar las secciones */
.grid > div {
  transition: all 0.3s ease;
}
</style>