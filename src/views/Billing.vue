<template>
        <div class="lg:pl-40 lg:pr-20 p-4 ">
          
        <!-- title -->
            <div class="mb-4 ">
                <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl">
                    Facturación
                </h1>
            </div>
        <!-- btns y search-->
        <div class="flex justify-between py-4 ">
            <div class="flex items-center ">
                <div class="bg-[#04162d] px-4 p-2 rounded-2xl">
                  <h4 class="text-xl text-white font-bold">Cantidad de Facturas: {{ TotalUnits }}</h4>
                </div>
            </div>
            <q-btn icon="add" class="rounded-xl bg-[#04162d] text-white " @click="dialog = true"></q-btn>
        </div>

            <q-dialog v-model="dialog" class="p-0 ">
               <div class="mr-2 w-[70%] min-h-[70vh] rounded-[20px] bg-white p-6 ">
                  <billing />
            </div>  
            </q-dialog>
           
                   
          
          <!-- tables -->
            <div class="mr-2 w-full mt-6" >
             <Tables :rows="rows" :columns="columns"  /> 
          </div>
          
          <!-- tables -->
   
        
        

        </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import billing from   "@/components/Bill.vue";
import Tables from "@/components/table.vue";
import Modal from "@/components/modals.vue"
import { bill } from "../store/billing.js";
const storeBilling = bill()

let TotalUnits = ref()
let loading = ref(false)
let dialog = ref(false)
let index = ref()

let columns = ref([
    { name: "index", label: "N°", field: "index", align: "center" },
    {
        name: "numero",
        align: "center",
        label: "numero de Factura",
        field: "numFactura",
    },
   
   
    {
        name: "vendedor",
        align: "center",
        label: "vendedor",
        field: "vendedor",
    },
    {
        name: "Cliente",
        align: "center",
        label: "Cliente",
        field: "cliente",
    }, 
    {
        name: "cantidad",
        align: "center",
        label: "Cantidad de productos",
        field: "CantProduct",
    },
    {
        name: "Total",
        align: "center",
        label: "Total",
        field: "PrecioVenta",
    },
    {
        name: "fecha",
        align: "center",
        label: "fecha",
        field: (row) => row.date.slice(0, 10),
    },
               
    {
        name: "options",
        align: "center",
        label: "OPCIONES",
    },
]);

let rows = ref([]);




const getBill = async () => {
  const res = await storeBilling.GetIBill();
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
   row.index = index + 1;
    
});
     
  }
};

onMounted(() => {
getBill()
}) 

</script>


<style>
    @media (min-width: 600px) {
    .q-dialog__inner--minimized > div {
        max-width: none;
    }
    
    .q-dialog__inner--minimized > div {
    max-height:none;
}

}



</style>