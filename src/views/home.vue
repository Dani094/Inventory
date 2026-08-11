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

        <!-- Columna 1: Productos Globales Más Vendidos -->
        <div class="lg:col-span-6 bg-[#1a2332] p-12 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-start">
          <h3 class="font-bold mb-6 opacity-80 text-center uppercase text-[10px] tracking-[2px]">
            Productos más vendidos (General)
          </h3>
          
          <div class="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2 custom-scroll">
            
            <p v-if="topProducts.length === 0" class="text-sm text-gray-400 text-center py-4">
              No hay datos de ventas disponibles
            </p>

            <div 
              v-for="(product, index) in topProducts" 
              :key="product.IdProduct || index" 
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
                  class="bg-green-500 h-full rounded-full transition-all duration-300"
                  :style="{ width: `${((product.qty || product.TotalUnits || 0) / (topProducts[0]?.qty || topProducts[0]?.TotalUnits || 1)) * 100}%` }"
                ></div>
              </div>
            </div>

          </div>
        </div>

        <!-- Columna 2: Productos Filtrados por Categoría -->
       <div class="lg:col-span-6 bg-slate-900 border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-2xl text-slate-100 flex flex-col justify-start">
  
  <!-- Encabezado con Icono y Estado -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
        <!-- SVG Icono de Categorías/Grid -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <div>
        <h3 class="font-semibold text-sm tracking-wide text-slate-200 uppercase">
          Rendimiento por Categoría
        </h3>
        <p class="text-xs text-slate-400">Top de productos con mayores unidades vendidas</p>
      </div>
    </div>

    <!-- Píldora de Selección / Dropdown estilizado -->
    <div v-if="categoriesData.length > 0" class="relative">
      <select 
        v-model="selectedCategoryId"
        class="appearance-none bg-slate-800/90 text-xs text-indigo-300 font-medium pl-3.5 pr-8 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer w-full sm:w-auto shadow-inner"
      >
        <option value="ALL">Todas las Categorías</option>
        <option 
          v-for="(cat, idx) in categoriesData" 
          :key="cat.CategoryId || idx" 
          :value="cat.CategoryId || idx"
        >
          {{ cat.CategoryName || `Categoría ${idx + 1}` }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>

  <!-- Lista de Productos en Tarjetas Modularizadas -->
  <div class="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-1.5 custom-scroll">
    
    <!-- Estado Vacío -->
    <div v-if="topProductsCategory.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-500 gap-2 border border-dashed border-slate-800 rounded-2xl">
      <svg class="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
      <p class="text-xs">Sin registros de ventas en esta categoría</p>
    </div>

    <!-- Items de Productos -->
    <div 
      v-for="(product, index) in topProductsCategory" 
      :key="product.IdProduct || index" 
      class="group bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700/80 p-3.5 rounded-2xl transition-all duration-200 flex flex-col gap-2.5"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <!-- Rank Badge Medalla -->
          <span 
            class="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
            :class="{
              'bg-amber-500/10 text-amber-400 border border-amber-500/30': index === 0,
              'bg-slate-300/10 text-slate-300 border border-slate-300/30': index === 1,
              'bg-orange-500/10 text-orange-400 border border-orange-500/30': index === 2,
              'bg-slate-800 text-slate-500 border border-slate-700/50': index > 2
            }"
          >
            {{ index + 1 }}
          </span>

          <!-- Nombre de Producto -->
          <span class="text-sm font-medium text-slate-200 group-hover:text-white truncate max-w-[200px]" :title="product.Name || product.Nombre">
            {{ product.Name || product.Nombre }}
          </span>
        </div>
        
        <!-- Indicador de Unidades Vendidas -->
        <div class="text-right shrink-0">
          <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {{ product.TotalUnits || product.qty || 0 }} <span class="text-[10px] font-normal opacity-80">unds</span>
          </span>
        </div>
      </div>

      <!-- Barra de Proporción Animada con Fondo sutil -->
      <div class="w-full bg-slate-900/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div 
          class="h-full rounded-full transition-all duration-500 ease-out"
          :class="{
            'bg-gradient-to-r from-amber-500 to-amber-400': index === 0,
            'bg-gradient-to-r from-indigo-500 to-indigo-400': index > 0
          }"
          :style="{ width: `${((product.TotalUnits || product.qty || 0) / maxUnitsCategory) * 100}%` }"
        ></div>
      </div>

    </div>

  </div>
</div>

        <!-- Gráficos -->
        <div class="lg:col-span-6 bg-[#0f172a] p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-center content-center ">
          <h3 class="font-bold text-white mb-6 text-center uppercase text-xs tracking-widest ">Frecuencia por Categoría</h3>
          <ChartUse :chartExits="true" :newType="'polarArea'" chartId="chart4" class="h-[400px]"/>
        </div>

        <div class="lg:col-span-6 bg-[#0f172a] p-4 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center items-center">
          <h3 class="font-bold mb-6 opacity-80 text-center uppercase text-[10px] tracking-[2px]">Distribución de Stock</h3>
          <ChartUse :chartInventory="true" :newType="'pie'" chartId="chart3" class="h-[450px] flex justify-center items-center"/>
        </div>

        <div class="lg:col-span-6 bg-[#0f172a] p-4 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-white mb-6 text-center uppercase text-xs tracking-widest ">Ventas Mensual</h3>
          <ChartUse :chartExits="true" :title="'Ventas'" :newType="'line'" chartId="chart2" class="h-[450px] " />
        </div>
   
        <div class="lg:col-span-6 bg-[#0f172a] p-4 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 class="font-bold text-white mb-2 text-center uppercase text-xs tracking-widest ">Inventario Mensual</h3>
          <ChartUse :chartInventory="true" :title="'Inventario'" :newType="'bar'" chartId="chart1" />
        </div>

      </div>
    </div>

    <FooterUs class="mt-12 py-6 border-t border-gray-100" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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
const categoriesData = ref([]); 
const selectedCategoryId = ref("ALL"); 

let TotalUnits = ref(0);
let TotalUnits2 = ref(0);
let estimatedProfit = ref(0);
let estimatedExits = ref(0);

// --- COMPUTED PROPERTIES SAFE ---

const topProductsCategory = computed(() => {
  if (!Array.isArray(categoriesData.value) || categoriesData.value.length === 0) return [];

  // Si se selecciona una categoría específica
  if (selectedCategoryId.value !== "ALL") {
    const selectedCat = categoriesData.value.find(
      (c, idx) => (c.CategoryId || idx) === selectedCategoryId.value
    );
    
    if (!selectedCat) return [];
    
    // Evalúa si la categoría es directamente un array o si contiene una propiedad de lista
    if (Array.isArray(selectedCat)) return selectedCat;
    if (Array.isArray(selectedCat.products)) return selectedCat.products;
    return [];
  }

  // Si está en 'ALL' (Todas), consolidación robusta
  const allProds = [];

  categoriesData.value.forEach((cat) => {
    // Determinar la lista interna de productos según la estructura devuelta
    const productList = Array.isArray(cat) ? cat : (Array.isArray(cat?.products) ? cat.products : []);

    productList.forEach((p) => {
      const units = p.TotalUnits || p.qty || 0;
      const id = p.IdProduct || p._id || p.Name || p.Nombre;

      const index = allProds.findIndex((item) => (item.IdProduct || item._id || item.Name) === id);
      if (index === -1) {
        allProds.push({ ...p, TotalUnits: units });
      } else {
        allProds[index].TotalUnits += units;
      }
    });
  });

  return allProds.sort((a, b) => (b.TotalUnits || 0) - (a.TotalUnits || 0));
});

const maxUnitsCategory = computed(() => {
  if (!topProductsCategory.value.length) return 1;
  return Math.max(...topProductsCategory.value.map((p) => p.TotalUnits || p.qty || 0)) || 1;
});

// --- FUNCIONES API ---

async function InventoryGet() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res && res.status < 299) {
    TotalUnits.value = 0;
    estimatedProfit.value = res.data.statistics.estimatedProfit;
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
      topProducts.value = res.data.statistics.topProducts || [];
      categoriesData.value = res.data.statistics.salesByCategory || res.data.statistics.categoriesWithTopProducts || [];
    }
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
  }
}

onMounted(() => {
  InventoryGet();
  ExitsGet();
  getDashboard();
});
</script>

<style scoped>
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