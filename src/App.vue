<script setup>
import Sidebar from "@/components/sidebar.vue"
import Home from "@/views/home.vue"
</script>

<template>
  <router-view></router-view>
  <div>
    <Sidebar/>
    <Home />
  </div>
  
</template>

<style>
body{
  background-color: #E7E8F3;
}
</style>
