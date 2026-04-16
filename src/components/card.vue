<template>
  <div class="bg-white p-4 sm:p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group">
    
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <div :class="[ticketColors.bgColor, 'p-3 sm:p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500']">
        <i :class="[ticketColors.icon, 'text-xl sm:text-2xl', ticketColors.iconColor]"></i>
      </div>
      <span class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Live</span>
    </div>

    <div class="space-y-1">
      <p class="text-[9px] sm:text-[10px] uppercase tracking-[2px] font-bold text-gray-400">
        {{ title }}
      </p>
      <h2 class="font-black text-2xl sm:text-3xl text-[#1a2332] tracking-tight truncate">
        <span class="text-xs sm:text-sm font-medium mr-1 opacity-50">{{ signo }}</span>{{ num.toLocaleString() }}
      </h2>
    </div>

    <div class="relative my-4 sm:my-6">
      <hr class="border-gray-100">
      <div class="absolute -top-[1px] left-0 w-8 h-[2px] bg-[#1a2332]"></div>
    </div>

    <div class="flex items-center justify-between gap-2">
      <p class="hidden xs:block text-[10px] sm:text-[11px] text-gray-400 font-medium italic">Actualizado ahora</p>
      <router-link :to="newRoute" class="ml-auto">
        <button class="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1a2332] hover:text-blue-600 transition-colors whitespace-nowrap">
          Detalles
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  num: Number,
  title: String,
  newRoute: String,
});

const signo = ref("$");

const ticketColors = computed(() => {
  let config = {
    icon: '',
    iconColor: '',
    bgColor: ''
  };

  switch (props.title) {
    case "Total Inventario":
      config.icon = "fa-solid fa-boxes-stacked";
      config.iconColor = "text-emerald-600";
      config.bgColor = "bg-emerald-50";
      signo.value = "$";
      break;
    case "Total Ventas":
      config.icon = "fa-solid fa-chart-line";
      config.iconColor = "text-blue-600";
      config.bgColor = "bg-blue-50";
      signo.value = "$";
      break;
    case "Productos Agotados":
      config.icon = "fa-solid fa-triangle-exclamation";
      config.iconColor = "text-rose-600";
      config.bgColor = "bg-rose-50";
      signo.value = "#";
      break;
    case "Productos Vencidos":
      config.icon = "fa-solid fa-clock-rotate-left";
      config.iconColor = "text-amber-600";
      config.bgColor = "bg-amber-50";
      signo.value = "#";
      break;
    default:
      config.icon = "fa-solid fa-layer-group";
      config.iconColor = "text-slate-600";
      config.bgColor = "bg-slate-50";
      signo.value = "";
      break;
  }
  return config;
});
</script>