<template>
    <div class="lg:pl-40 lg:pr-20 p-4 mb-[4rem]">
        <!-- title  -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl"> arrow_right </span>
                    HOME
                </h1>
            </div>
            <div>
                <div class="q-pa-md">
                    <q-expansion-item
                    v-model="expanded"
                    icon="person"
                    header-class="text-[#04162d] font-bold"
                    :label="storeLogin.Name"
                    :caption="storeLogin.Email"
                    class="rounded-xl"
                    >
                    <!-- <q-card class="fixed flex items-md-end">
                        <q-card-section class="flex flex-col">
                            <q-btn flat icon="settings">
                            </q-btn>
                            <q-btn flat icon="settings">
                            </q-btn>
                        </q-card-section> 
                    </q-card> -->
                    </q-expansion-item>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-6">
            <!-- Card -->
            <CardInfo :num="TotalUnits" :title="'Total Inventario'" :newRoute="'/inventory'" />
            <CardInfo :num="TotalUnits2" :title="'Total Salidas'" :newRoute="'/exits'" />
            <CardInfo :num="spent" :title="'Productos Agotados'" :newRoute="'/inventory'" />
            <CardInfo :num="expiration" :title="'Productos Vencidos'" :newRoute="'/inventory'" />
        </div>
        <!-- graficas  -->
            <div class="mb-6">
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl"> arrow_right </span>
                    GRÁFICAS
                </h1>
            </div>
        <div class="bg-white rounded-2xl">
        </div>
        <!-- charts -->
         <!-- grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div class="w-full bg-white rounded-2xl lg:col-span-7">
                <ChartUse :chartInventory="true" :title="'Inventario'" :newType="'bar'" chartId="chart1"/>
            </div>
            <div class="w-full bg-white rounded-2xl lg:col-span-5">
                <ChartUse :chartInventory="true" :newType="'pie'" chartId="chart3" class="w-full h-[500px] flex justify-center items-center"/>
            </div>
            <div class="w-full bg-white rounded-2xl lg:col-span-7">
                <ChartUse :chartExits="true" :title="'Salidas'" :newType="'line'" chartId="chart2" />
            </div>
            <div class="w-full bg-white rounded-2xl lg:col-span-5">
                <ChartUse :chartExits="true" :newType="'polarArea'" chartId="chart4" class="w-full h-[500px] flex justify-center items-center"/>
            </div>
        </div>
        <!-- footer  -->
        <FooterUs class="mt-4"/>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import CardInfo from "@/components/card.vue";
import ChartUse from "@/components/charts.vue"
import FooterUs from "@/components/footer.vue";
import { inventoryStore } from "@/store/inventory.js";
import {exitStore} from "@/store/exits.js"
import { LoginStore } from "../store/login.js";



const storeInventory = inventoryStore();
const storeExits = exitStore();
const storeLogin = LoginStore();

let expanded=ref(false)
let TotalUnits=ref(0)
let TotalUnits2=ref(0)
let spent=ref(0)
let expiration=ref(0)

let names=ref()
let valores=ref()

async function InventoryGet() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  if (res && res.status < 299) {
    for (let i in res.data) {
        let units= res.data[i].SellingPrice
        TotalUnits.value += units
        if (res.data[i].State === "Agotado") {
            spent.value += 1; 
        }
        let expirationDate = res.data[i].ExpirationDate;
        if (expirationDate && expirationDate !== "NA") {
        expirationDate = new Date(expirationDate);
        let currentDate = new Date();
        if (expirationDate < currentDate) {
          expiration.value += 1;
        }
      }
    }
  }
}
async function ExitsGet() {
  const res = await storeExits.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    for (let i in res.data) {
        let units= res.data[i].Total
        TotalUnits2.value += units
    }
  } 
}


onMounted(() => {
  InventoryGet();
  ExitsGet()
});
</script>
