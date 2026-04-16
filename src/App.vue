<script setup>
import Sidebar from "@/components/sidebar.vue"
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#E7E8F3]">
    <Sidebar/>
    <!-- <Home /> -->
    <div class="flex-1 h-full overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<style>
body{
  background-color: #E7E8F3;
}
.inventTable tr th {
  position: sticky;
  background: #04162d;
  color: white;
}

.inventTable thead tr:first-child th {
  top: 0;
  z-index: 1;
}
</style>
