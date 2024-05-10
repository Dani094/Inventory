<template>
    <div class="bg-white p-8 rounded-2xl">
                <!-- icon  -->
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <i class="fa-solid fa-ticket text-5xl text-[#04162d]" :class="ticketColors.iconColor"></i>
                    </div>
                </div>
                <!-- num  -->
                <div>
                    <h1 class="font-bold text-3xl">{{ "$"+num.toLocaleString() }}</h1>
                    <p class="text-[#04162d] text-xl" :class="ticketColors.textColor">{{ title }}</p>
                </div>
                <hr class="border border-dashed border-gray-500/50 my-4">
                <!-- btn -->
                <q-btn class="rounded-2xl bg-[#04162d] text-white font-sans"><router-link :to="newRoute">Ver</router-link></q-btn>
            </div>
</template>

<script setup>
const props = defineProps({
  num: Number,
  title: String,
  newRoute: String
});

const getTicketColors = (title) => {
  let ticketColors = {
    iconColor: '',
    textColor: ''
  };

  switch (title) {
    case "Total Inventario":
      ticketColors.iconColor = "text-yellow-500";
      ticketColors.textColor = "text-yellow-500";
      break;
    case "Total Salidas":
      ticketColors.iconColor = "text-blue-500";
      ticketColors.textColor = "text-blue-500";
      break;
    case "Total":
      ticketColors.iconColor = "text-pink-500";
      ticketColors.textColor = "text-pink-500";
      break;
    default:
      ticketColors.iconColor = "text-[#04162d]"; // Color por defecto
      ticketColors.textColor = "text-[04162d]"; // Color por defecto
      break;
  }
  return ticketColors;
};

const ticketColors = getTicketColors(props.title);


</script>

