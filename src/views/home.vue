<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- title  -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    <span class="material-icons text-5xl">
                        arrow_right
                    </span>
                    HOME</h1>
            </div>
            <!-- search  -->
           <Search />
        </div>
        <!-- graficas  -->
        <div class="bg-white rounded-2xl">
            <img class="rounded-2xl" src="https://apiumhub.com/wp-content/uploads/2020/03/Attract-new-software-developers.png" alt="grafica">
        </div>
    </div>
</template>

<script setup>
import Search from "@/components/search.vue"
</script>