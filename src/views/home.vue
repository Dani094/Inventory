<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- title  -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl"> arrow_right </span>
                    HOME
                </h1>
            </div>
            <!-- search  -->
            <Search />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-6">
            <!-- Card -->
            <CardInfo :iconColor="'#04162d'" :num="prueba" :title="'Total Inventario'" :newRoute="'/inventory'"/>
            <CardInfo :num="80000" :title="'Total Salidas'" :newRoute="'/exits'"/>
            <CardInfo :num="1300000" :title="'Total'" :newRoute="'/home'"/>
            <CardInfo :num="300000" :title="'Total Todo'" :newRoute="'/inventory'"/>
        </div>
        <!-- graficas  -->
        <div class="bg-white rounded-2xl">
            <img class="rounded-2xl"
                src="https://apiumhub.com/wp-content/uploads/2020/03/Attract-new-software-developers.png"
                alt="grafica" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Search from "@/components/search.vue";
import CardInfo from "@/components/card.vue";


let prueba=ref(200000)
</script>
