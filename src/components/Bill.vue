<template>
  <div class="rounded-xl w-full">
    <!-- icon  -->
    <div class="flex  items-start justify-between mb-4">
      <div>
        <h5 class="text-center text-black font-bold  text-[20px]">
          Crear Factura
        </h5>
      </div>
      <div>
        <h5 class="text-center text-black font-bold p-2 text-xl">
          {{ currentDateFormatted }}
        </h5>
      </div>
    </div>

    <q-form ref="myForm" @submit.prevent.stop="getNumBill()">
      <div class="flex w-full justify-center"> 
        <div class="w-[48%] mr-4">
      <q-input v-model="nameSeller" type="text" label="Nombre vendedor"  lazy-rules 
      :rules="[ (val) => (val && val.trim().length > 0) || 'Digite nombre del operador', ]">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
       </q-input>
        </div> 

        <div class="w-[48%] ">
          <q-input type="text" v-model="nameCustomer" label="Nombre del cliente" lazy-rules :rules="[(val) => (val && val.trim().length > 0) || 'Digite el npmbre del cliente',
            ]">
          <template v-slot:prepend>
          <q-icon name="person" />
        </template>
        </q-input>
        </div>

       
      </div>

      <div class="flex items-start justify-between mb-4 mt-10">
        <div>
          <p class="text-center text-black font-bold  text-[18px]">Productos</p>
        </div>
      </div>

      <div class="flex ">

          <div class="w-[30%] mr-4 flex border-b border-black opacity-50">
            <div class=" left-0  flex w-[100%] ">
              <span class="material-symbols-outlined text-[24px]  mr-2 ">shopping_cart_checkout</span> 
            <select class="h-13  w-[80%] " filled v-model="nameProduct" :options="getProductName"  label="Seleccione el id del producto " @change="getValues()">
          <option disabled value="">Producto</option>
          <option v-for="option in getProductName" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
          </div>

          <div class="w-[30%] mr-4">
            <q-input
            type="number"
            v-model="amountProduct"
            label="cantidad">
          <template v-slot:prepend>
          <q-icon name="production_quantity_limits" />
        </template>
        </q-input>

          </div>
          <div class="w-[30%] mr-4">
            <q-input
            type="number"
            v-model="priceProduct"
            label="Precio">
           <template v-slot:prepend>
          <q-icon name="attach_money" />
        </template>
        </q-input>
          </div>  
        </div>
 
      <button @click="addProductList(r)"
        class="rounded-md relative w-[80px] h-10 mt-2  mb-4 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
      >
        <span
          class="text-gray-200 font-semibold ml-2 transform group-hover:translate-x-20 transition-all duration-300" 
          >Item</span
        >
        <span
          class="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
        >
          <svg
            class="svg w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>

      <ul  class="flex w-full mt-10 p-2 bg-[#04162d] text-center border-t border-black-0.4 text-white" >
          <li class="mr-1 w-[10%] ">#</li>
          <li class="mr-1 w-[20%] ">Nombre</li>
          <li class="mr-1 w-[20%] ">Cantidad</li>
          <li class="mr-1 w-[20%] ">Valor unidad</li>
          <li class="mr-1 w-[20%] ">Valor Total</li>
        </ul>
      <div v-for="(item, index) in listProduct" :key="index">
      
       <ul class="flex w-full p-2 text-center border-b border-t border-black-0.4" >
        <li class="mr-1 w-[10%] "> #{{ index + 1 }} </li>
        <li class="mr-1 w-[20%] "> {{ item.name }} </li>
        <li class="mr-1 w-[20%] "> #{{ item.cantidad }} </li>
        <li class="mr-1 w-[20%] "> ${{ item.precio }} </li>
        <li class="mr-1 w-[20%] ">${{ item.valueTotal }} </li>
       </ul> 
       
       </div>

      <div class="flex items-start justify-between mt-16" >
        <div>
          <h6 class="text-start text-black font-bold p-2 text-[15px]">
            Cantidad Total productos: {{ amountTotalProdut }}
          </h6>
          <h6 class="text-start text-black font-bold p-2 text-[15px]">
            Total: {{ totalPrice }}
          </h6>
        </div>
      </div>

      <hr class="border border-dashed border-gray-500/50 my-2" />

      <!-- div botones  -->
      <div class="flex justify-end items-center gap-4">
        <q-btn
          icon="save_as"
          label="Generar Factura"
          :loading="loading"
          type="submit"
          class="text-white bg-[#04162d] rounded-1xl"
        ></q-btn>
      </div>
      <!-- btn -->
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { bill } from "../store/billing.js";
import { inventoryStore } from "@/store/inventory.js";
const storeBilling = bill()
const storeInventory = inventoryStore();

let numBill = ref()
let nameSeller = ref("");
let nameCustomer = ref("");
let currentDateFormatted = ref("");
let amountProduct = ref();
let nameProduct = ref("");
let priceProduct = ref();
let totalPrice = ref(0);
let listProduct = ref([])
let addProduct = ref(0)
let rows = ref()
let loading = ref(false)
let getProductName = ref([])
let getProductId = ref([])
let resProduct = ref()
let SerialProducto = ref()
let NameProducto = ref()
let Proveedor = ref()
let modifiCant = ref()
let totalPriceProduct = ref(0)
let amountTotalProdut = ref(0)

function getValues() {
  resProduct.value.data.forEach((producto) => {
    const idProducto = producto._id;
    if (idProducto == nameProduct.value) {
      const productoEncontrado = producto;
      SerialProducto.value = productoEncontrado.Serial;
      NameProducto.value = productoEncontrado.Name;
      Proveedor.value = productoEncontrado.Proveedor;
      priceProduct.value = productoEncontrado.Price;
      
    } else {
      console.log("El ID no ");
    }
  });
}

function getNumBill() {
  console.log("entro");
  console.log();
  numBill.value = rows.value.length + 1;
  console.log("psao");
var estaRegistrado = rows.value.some(function (venta) {
  return venta.numberVenta === numBill.value;
});
if (estaRegistrado) {
  var numeroMaximoRegistrado = Math.max.apply( Math,rows.value.map(function (venta) {
      return venta.numberVenta;
    })
  );
  numBill.value = numeroMaximoRegistrado + 1;
  console.log(numBill.value);
  postBill();
} else {
  console.log(numBill.value);
  postBill();
}
}


const addProductList = () => { 
  totalPriceProduct.value = priceProduct.value * parseInt(amountProduct.value)


  listProduct.value.push(
    {
      name: NameProducto.value,
      cantidad: amountProduct.value,
      precio: priceProduct.value, 
      valueTotal: totalPriceProduct.value 
    }
  )

  totalPrice.value += parseInt(totalPriceProduct.value)
  amountTotalProdut.value +=  parseInt(amountProduct.value)
  console.log(amountProduct.value);
  console.log(amountTotalProdut.value);
  clean()
  
};


function DateNow() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentMonthFormatted =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
  const currentDayFormatted =
    currentDay < 10 ? `0${currentDay}` : `${currentDay}`;
  currentDateFormatted.value = `${currentDate.getFullYear()}-${currentMonthFormatted}-${currentDayFormatted}`;
  console.log(currentDateFormatted.value);
}



const getBill = async () => {
  const res = await storeBilling.GetIBill();
  if (res.status < 299) {
    rows.value = res.data;
    
  }
};


async function getProduct() {
  const res = await storeInventory.GetInventory();
  
  resProduct.value = res;
  if (res.status < 299) {
    for (let i in res.data) {

      let object = { label: res.data[i].Name, value: res.data[i]._id, };
      let object1 = { label: res.data[i].Serial, value: res.data[i]._id };
      let object2 = { label: res.data[i].Price, value: res.data[i]._id };
      getProductName.value.push(object);
      getProductId.value.push(object1)
  
    }
  }
}



const postBill = async () => {
    console.log( numBill.value);
    console.log("Perro triple hp",numBill.value, amountTotalProdut.value, nameProduct.value, nameCustomer.value, nameSeller.value);
    const bill = await storeBilling.NewBill({
      UserEmail: "UserEmail",
      numFactura: numBill.value,
      vendedor: nameSeller.value,
      cliente: nameCustomer.value ,
      CantProduct: amountTotalProdut.value,
      PrecioVenta: totalPrice.value
    });

  };


  function clean() {
  nameProduct.value = "";
  amountProduct.value = "";
  priceProduct.value = ""  
}


  onBeforeMount(() => {
    getBill();
    getProduct()

  })

onMounted(DateNow, console.log(addProduct.value));
</script>
