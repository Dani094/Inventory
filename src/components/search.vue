<template>
    <div class='w-full lg:w-80'>
        <div className="w-full relative">
            <span className="material-icons text-lg text-[#04162d] font-bold absolute left-3 top-1/2 -translate-y-1/2">
                search
            </span>
            <input type="text" placeholder='Buscar' v-model="filter" 
                className="bg-white w-full py-2 pl-10 pr-4 rounded-lg outline-none" />
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
// import { inventoryStore } from "@/store/inventory.js";

// const storeInventory = inventoryStore();

const props = defineProps({
  onSearch: Function,
  filter: String
});

let filter=ref("45")



onMounted(() => {
    // setInterval(
        
    // ) , 2000
});
</script>