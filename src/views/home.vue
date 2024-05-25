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
                    :label="storeLogin.Name"
                    :caption="storeLogin.Email"
                    >
                    <q-card class="fixed">
                        <q-card-section>
                            hola
                        </q-card-section>
                    </q-card>
                    </q-expansion-item>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-6">
            <!-- Card -->
            <CardInfo :num="20000" :title="'Total Inventario'" :newRoute="'/inventory'" />
            <CardInfo :num="80000" :title="'Total Salidas'" :newRoute="'/exits'" />
            <CardInfo :num="1300000" :title="'Total'" :newRoute="'/home'" />
            <CardInfo :num="300000" :title="'Total Todo'" :newRoute="'/inventory'" />
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
        <div class="flex gap-4">
            <div class="w-full lg:w-[45%] bg-white rounded-2xl">
                <ChartUse :names="names" :valores="valores" :newType="'bar'" chartId="chart1" />
            </div>
            <div class="w-full lg:w-[53.40%] bg-white rounded-2xl">
                <ChartUse :names="names" :valores="valores" :newType="'line'" chartId="chart2" />
            </div>
            <div class="w-full bg-white rounded-2xl flex justify-center">
                <div class="w-full lg:w-[30%] bg-white rounded-2xl">
                    <ChartUse :names="names" :valores="valores" :newType="'pie'" chartId="chart3" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue"
import CardInfo from "@/components/card.vue";
import ChartUse from "@/components/charts.vue"
import { LoginStore } from "../store/login.js";

const storeLogin = LoginStore();
let expanded=ref(false)

console.log(storeLogin.Email);
console.log(storeLogin.user);
console.log(storeLogin.Name);

let name=ref(storeLogin.Name)
</script>
