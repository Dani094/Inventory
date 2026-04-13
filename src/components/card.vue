<template>
    <div class="bg-white p-8 rounded-2xl">
                <!-- icon  -->
                <div class="flex items-center justify-between mb-4">
                    <div>
                      <i :class="[ticketColors.icon, 'text-5xl', ticketColors.iconColor]"></i>
                    </div>
                </div>
                <!-- num  -->
                <div>
                    <h1 class="font-bold text-3xl">{{ signo +num.toLocaleString() }}</h1>
                    <p class="text-[#04162d] text-xl" :class="ticketColors.textColor">{{ title }}</p>
                </div>
                <hr class="border border-dashed border-gray-500/50 my-4">
                <!-- btn -->
                <router-link :to="newRoute"><q-btn class="rounded-2xl bg-[#04162d] text-white font-sans">Ver</q-btn></router-link>
            </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
let signo = ref("$")
const props = defineProps({
  num: Number,
  title: String,
  newRoute: String,

});


const getTicketColors = (title) => {
  let ticketColors = {
    icon: '',
    iconColor: '',
    textColor: ''
  };

  switch (title) {
    case "Total Inventario":
      ticketColors.icon = "fa-solid fa-boxes";
      ticketColors.iconColor = "text-green-500";
      ticketColors.textColor = "text-green-500";
      signo.value = "$ "
      break;
    case "Total Ventas":
      ticketColors.icon = "fa-solid fa-truck";
      ticketColors.iconColor = "text-blue-500";
      ticketColors.textColor = "text-blue-500";
      signo.value = "$ "
      break;
    case "Productos Agotados":
      ticketColors.icon = "fa-solid fa-exclamation-circle";
      ticketColors.iconColor = "text-pink-500";
      ticketColors.textColor = "text-pink-500";
      signo.value = "# "
      break;
    case "Productos Vencidos":
      ticketColors.icon = "fa-solid fa-calendar-times";
      ticketColors.iconColor = "text-yellow-500";
      ticketColors.textColor = "text-yellow-500";
      signo.value = "# "
      break;
    default:
      ticketColors.icon = "fa-solid fa-ticket";
      ticketColors.iconColor = "text-[#04162d]";
      ticketColors.textColor = "text-[04162d]";
      break;
  }
  return ticketColors;
};

const ticketColors = getTicketColors(props.title);


</script>

