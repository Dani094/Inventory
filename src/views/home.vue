<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- title  -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    HOME
                </h1>
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
        <div class="bg-white rounded-2xl">
        </div>
        <!-- charts -->
        <div class="flex gap-4">
            <div class="w-[45%] bg-white rounded-2xl">
                <ChartUse :names="names" :valores="valores" :newType="'bar'" chartId="chart1" />
            </div>
            <div class="w-[53%] bg-white rounded-2xl">
                <ChartUse :names="names" :valores="valores" :newType="'line'" chartId="chart2" />
            </div>
            <div class="w-full bg-white rounded-2xl flex justify-center">
                <div class="w-[30%] bg-white rounded-2xl">
                    <ChartUse :names="names" :valores="valores" :newType="'pie'" chartId="chart3" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import CardInfo from "@/components/card.vue";
import ChartUse from "@/components/charts.vue"


</script>
