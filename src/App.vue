<script setup>
import Sidebar from "@/components/sidebar.vue"
</script>

<template>
  <div>
    <Sidebar/>
    <!-- <Home /> -->
    <router-view></router-view>
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
