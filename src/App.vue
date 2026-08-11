<script setup>
import Sidebar from "@/components/sidebar.vue"
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#E7E8F3]">
    <Sidebar v-if="!$route.meta.hideSidebar"/>
    <!-- <Home /> -->
    <div class="flex-1 h-full overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<style>
body{
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));;
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
