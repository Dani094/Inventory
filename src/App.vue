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
</style>
