<template>
  <div class="rounded-xl w-full">
    <!-- icon  -->
    <div class="flex items-start justify-between mb-4">
      <div>
        <h5 class="text-center text-black font-bold text-[20px]"> {{title}} </h5></div>
      <div>
        <h5 class="text-center text-black font-bold p-2 text-xl"> {{ currentDateFormatted }} </h5>
      </div>
    </div>
    <q-form ref="myForm" @submit.prevent.stop="EditarCrearBill()">
      <div class="row w-full justify-center">
        <div class="col mr-4">
          <q-input  outlined color="#04162d" class="block w-full py-2  bg-white  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            v-model="nameSeller" type="text" label="Nombre vendedor" lazy-rules :rules="[(val) =>(val && val.trim().length > 0) || 'Digite nombre del operador',]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>


        <div class="col mr-4">
          <q-input  outlined color="#04162d" type="text" class="block w-full  py-2  bg-white rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="nameCustomer" label="Nombre del cliente" lazy-rules :rules="[(val) => (val && val.trim().length > 0) ||
                'Digite el npmbre del cliente', ]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="flex items-start justify-between mb-4 mt-10">
        <div>
          <p class="text-center text-black font-bold text-[18px]">Productos</p>
        </div>
      </div>

      <div class="row mb-4">
    <div class="col mr-2">
      <label for="productName" class="block text-sm font-medium text-gray-700">Producto</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">shopping_cart_checkout</i>
        </span>
        <select id="productName" v-model="getIdProduct"  @change="getValues()" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option disabled value="">Seleccione una opción</option>
          <option v-for="option in getProductName" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="col mr-2">
      <label for="amountProduct" class="block text-sm font-medium text-gray-700">Cantidad</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">production_quantity_limits</i>
        </span>
        <input id="amountProduct" type="number" v-model="amountProduct" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>

    <div class="col mr-2">
      <label for="priceProduct" class="block text-sm font-medium text-gray-700">Precio</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 ">
          <i class="material-icons text-gray-500">attach_money</i>
        </span>
        <input id="priceProduct" type="number" v-model="priceProduct"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
    <div class="col mr-2">
      <label for="discount" class="block text-sm font-medium text-gray-700">Descuento</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">local_offer</i>
        </span>
        <input id="discount" type="number" v-model="discount" @change="typeDiscount"
          class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
  </div>


  <div class="row w-[50%]">
    <div class="col mr-2">
      <label for="discountType" class="block text-sm font-medium text-gray-700">Tipo de descuento</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">local_offer</i>
        </span>
        <select id="discountType" v-model="valueDiscount" @change="typeDiscount" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option disabled value="">Seleccione una opción</option>
          <option v-for="option in optionsType" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <div class="col mr-4">
      <label for="precioTotal" class="block text-sm font-medium text-gray-700">Valor Total</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">local_offer</i>
        </span>
        <input id="precioTotal" type="number" v-model="totalPriceProduct"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
  </div>

      <div  @click="addOrUpdateProductList()"  class="rounded-md relative w-[80px] h-10 mt-2 mb-4 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500">
        <span class="text-gray-200 font-semibold ml-2 transform group-hover:translate-x-20 transition-all duration-300">Item</span>
        <span class="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg class="svg w-8 text-white" fill="none" height="24" stroke="currentColor" stroke-linecap="round"  stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </div>

      <div class="row w-full mt-10 p-2 bg-[#04162d] text-center border-t border-black-0.4 text-white">
      <div class="col mr-1">#</div>
      <div class="col-2 mr-1">Nombre</div>
      <div class="col mr-1">Unidades</div>
      <div class="col mr-1">Valor descuento</div>
      <div class="col mr-1">Tipo de descuento</div>
      <div class="col mr-1">Valor unidad</div>
      <div class="col mr-1">Valor Total</div>
      <div class="col mr-1">opciones</div></div>


      <div v-for="(item, index) in listProduct" :key="index">
        <div class="row w-full p-2 text-center border-b border-t border-black-0.4" > 
          <div class="col mr-1 ">#{{ index + 1 }}</div> 
          <div class="col-2 mr-1 "> {{ item.name }}</div>
           <div class="col mr-1 ">#{{ item.Unidades }}</div>
           <div class="col mr-1 "> #{{ item.descuento }}  </div>
           <div class="col mr-1 "> {{ item.tipoDescuento }}</div>
           <div class="col mr-1 ">${{ item.precio }}</div>
           <div class="col mr-1 ">${{ item.valueTotal }}</div>
           <div class="col mr-1"> 
            <div class="button cursor-pointer bg-white"  @click="goInfoExits(item)">
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </div>
           </div>
        </div>
      </div>

      <div class="flex items-start justify-between mt-16">
        <div>
          <h6 class="text-start text-black font-bold p-2 text-[15px]">Cantidad Total productos: {{ amountTotalProdut }} </h6>
          <h6 class="text-start text-black font-bold p-2 text-[15px]">Total: {{ totalPrice }}</h6>
        </div>
      </div>

      <hr class="border border-dashed border-gray-500/50 my-2" />

      <!-- div botones  -->
      <div class="flex justify-end items-center gap-4">
        <q-btn v-if="valueEditCrea == 1" icon="save_as" label="Generar Factura"  :loading="loading" type="submit" class="text-white bg-[#04162d] rounded-1xl" v-close-popup></q-btn>
        <q-btn v-else icon="edit" label="Editar Factura" :loading="loading" type="submit" class="text-white bg-[#04162d] rounded-1xl" v-close-popup></q-btn>


        <q-btn icon="cancel"  type="button" class="text-white bg-[#541b1b] rounded-1xl " v-close-popup >CERRAR </q-btn>
      </div>
      <!-- btn -->
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { billStore } from "../store/billing.js";
import { inventoryStore } from "@/store/inventory.js";
import billing from "@/views/Billing.vue";
import { exitStore } from "@/store/exits.js";

const props = defineProps({
  title: String,
  value: Number,
  dataEdit: Object,
  dataDelete: Object,
  ind: String
});


const storeBilling = billStore();
const storeInventory = inventoryStore();
const storeExist = exitStore();

let numBill = ref();
let nameSeller = ref("");
let nameCustomer = ref("");
let currentDateFormatted = ref("");
let amountProduct = ref();
let getIdProduct = ref([]); 
let priceProduct = ref();
let totalPrice = ref(0);
let listProduct = ref([]);
let addProduct = ref(0);
let rows = ref();
let loading = ref(false);
let getProductName = ref([]);
let getProductId = ref([]);
let resProduct = ref();
let SerialProduct = ref();
let NameProduct = ref();
let totalPriceProduct = ref(0);
let amountTotalProdut = ref(0);
let dateExpiration = ref();
let UserUpdate = ref();
let UserEmail = ref();
let discount = ref();
let valueDiscount = ref();
let optionsType = ref(["Porcentaje", "valor fijo"]);
let dataGoInfo = ref()
let rowsExist = ref()
let valueEditCrea = ref()
let index = ref()
let idProductExist = ref()
let getIdExits = ref()

// bill

const getBill = async () => {
  const res = await storeBilling.GetIBill();
  if (res.status < 299) {
    rows.value = res.data;
 
    valueEditCrea.value = props.value
    dataGoInfo.value = ""
    if (valueEditCrea.value == 1) {
      dataGoInfo.value = ""
      index.value = 0
    }
    else{

      index.value = props.ind
     console.log(index.value);
      dataGoInfo.value = props.dataEdit
      console.log(dataGoInfo.value);
      goInfoBill()
      ExitsGet()
    }
  }
};

const postBill = async () => {
  const bill = await storeBilling.NewBill({
    UserEmail: "UserEmail",
    numFactura: numBill.value,
    vendedor: nameSeller.value,
    cliente: nameCustomer.value,
    Discount: discount.value,
    CantProduct: amountTotalProdut.value,
    PrecioVenta: totalPrice.value,
  });

  getBill()
  
};

async function putInfoBill() {
  console.log(index.value);
  const res = await storeBilling.PutBill(index.value, {
    UserEmail: "UserEmail",
    numFactura: numBill.value,
    vendedor: nameSeller.value,
    cliente: nameCustomer.value,
    Discount: discount.value,
    CantProduct: amountTotalProdut.value,
    PrecioVenta: totalPrice.value,
  });
  getBill();
  
}

 function EditarCrearBill() {
   if (valueEditCrea.value == 1) {
      getNumBill()
   }
    else{ 
      putInfoBill()
      putInfoExist()
    }
 }

function getNumBill() {
  numBill.value = rows.value.length + 1;

  var estaRegistrado = rows.value.some(function (venta) {
    return venta.numberVenta === numBill.value;
  });
  if (estaRegistrado) {
    var numeroMaximoRegistrado = Math.max.apply(
      Math,
      rows.value.map(function (venta) {
        return venta.numberVenta;
      })
    );
    numBill.value = numeroMaximoRegistrado + 1;
    console.log(numBill.value);
    postBill();
    postExist();
  } else {
    console.log(numBill.value);
    postBill();
    postExist();
  }
}

function goInfoBill() {
  console.log(dataGoInfo.value);
    const data = dataGoInfo.value
      // Asignar valores a las referencias reactivas
      numBill.value = data.numFactura;
      console.log( data.numFactura);
      nameSeller.value = data.vendedor;
      nameCustomer.value = data.cliente;
      discount.value = data.Discount;
      valueDiscount.value , data.typeDiscount
      amountTotalProdut.value = data.CantProduct;
      totalPrice.value = data.PrecioVenta;
}


// Exist

async function ExitsGet() {
  const res = await storeExist.GetExits();
 
  if (res && res.status < 299) {
    rowsExist.value = res.data;
    console.log(rowsExist.value);
    rowsExist.value.forEach((row, index) => {
      if (row.NumBill == dataGoInfo.value.numFactura) {
      numBill.value = row.NumBill
      listProduct.value.push({
       Id: row._id,
       serial: row.Serial,
       name: row.Name,
       Unidades: row.Units,
       tipoDescuento: row.typeDiscount,
       descuento: row.Discount ,
       precio: row.Price,
       valueTotal: row.Total,
  }); 
      }
      console.log(rowsExist.value);
      console.log(listProduct.value);
      }
    );
  } 
}

const postExist = async () => {
  try {
    listProduct.value.forEach(async (product) => {
      const bill = {
        NumBill: numBill.value,
        Name: product.name,
        Serial: product.serial,
        Units: product.Unidades,
        Price: product.precio,
        Discount: product.descuento,
        typeDiscount: product.tipoDescuento,
        UserEmail: "usuario@example.com",
      };
      console.log(bill);
      const response = await storeExist.PostExits(bill);
    });
  } catch (error) {
    console.error("Error al enviar los datos de la factura:", error);
  }
};

async function putInfoExist() {
  console.log( listProduct.value);
  
  listProduct.value.forEach(async (product) => {
    console.log(product);
    console.log(product.Id);
    idProductExist.value = product.Id
    console.log( idProductExist.value);
    console.log(numBill.value);
      const bill = {
        NumBill: numBill.value,
        Name: product.name,
        Serial: product.serial,
        Units: product.Unidades,
        Price: product.precio,
        Discount: product.descuento,
        typeDiscount: product.tipoDescuento,
        UserEmail: "usuario@example.com",
      };
   
      console.log(bill);
      const response = await storeExist.PutExits(idProductExist.value, bill);
    });
 
}
function goInfoExits(i) {
  
    console.log(i);
    SerialProduct.value = i.serial
    getIdExits.value = i.Id;
    totalPriceProduct.value  = i.valueTotal;
    priceProduct.value = i.precio
    valueDiscount.value = i.tipoDescuento
    discount.value = i.descuento
    amountProduct.value = i.Unidades

    getValues()
    
  }


// Product

async function getProduct() {
  const res = await storeInventory.GetInventory();
  resProduct.value = res;
  console.log( resProduct.value.data.length);
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].Name, value: res.data[i]._id };
      let object1 = { label: res.data[i].Serial, value: res.data[i]._id };
      let object2 = { label: res.data[i].Price, value: res.data[i]._id };
      getProductName.value.push(object);
      console.log(object);
      getProductId.value.push(object1);
      
    }
  }
}

  function getValues() {
  console.log("1", getIdProduct.value);
  resProduct.value.data.forEach((producto) => {
    const idProducto = producto._id;
    const serial = producto.Serial
    
    if ( valueEditCrea.value === 1) {
       if (getIdProduct.value ===  idProducto ) {
      console.log("sias");
      SerialProduct.value = producto.Serial;
      NameProduct.value = producto.Name;
      priceProduct.value = producto.Price;
      UserUpdate.value = producto.UserUpdate;
      UserEmail.value = producto.UserEmail;
    }
    else {
      console.log("El ID no ", getIdProduct.value);
    }
    }
    else if( valueEditCrea.value === 2){
      if(serial ==  SerialProduct.value ){
      getIdProduct.value = producto._id
      NameProduct.value = producto.Name;
    }
    else{
      console.log("El serial no ", SerialProduct.value);
    }
    }    
  });
}

function typeDiscount() {
  console.log(valueDiscount.value);
  totalPriceProduct.value = priceProduct.value * parseInt(amountProduct.value);

  if (valueDiscount.value === "Porcentaje") {
    // Descuento en porcentaje
    const percentage = discount.value; 
    const discountAmount = (totalPriceProduct.value * percentage) / 100; 
    totalPriceProduct.value -= discountAmount; // Aplicar el descuento al valor total
  } else if (valueDiscount.value === "valor fijo") {
    // Descuento en valor fijo
    const fixedDiscount = discount.value;
    console.log(discount.value);
    console.log(totalPriceProduct.value);
    totalPriceProduct.value -= fixedDiscount; 
  } else {
    console.error("Tipo de descuento no válido");
  }
}
 
const addOrUpdateProductList = () => {
  console.log( listProduct.value);
  console.log(NameProduct.value);
  const productIndex = listProduct.value.findIndex(product => product.serial === SerialProduct.value);
 
  if (valueEditCrea.value == 2) {
      listProduct.value.forEach((producto) => {
      if (producto.serial == SerialProduct.value) {
        console.log(producto);
      listProduct.value[productIndex] = {
            Id: producto.Id,
            serial: SerialProduct.value,
            name: NameProduct.value,
            Unidades: parseInt(amountProduct.value),
            tipoDescuento: valueDiscount.value,
            descuento: parseFloat(discount.value),
            precio: parseFloat(priceProduct.value),
            valueTotal: parseFloat(totalPriceProduct.value),
          };
      }
    })
  } else {
    // Si el producto no existe, agregarlo
    listProduct.value.push({
      serial: SerialProduct.value,
      name: NameProduct.value,
      Unidades: parseInt(amountProduct.value),
      tipoDescuento: valueDiscount.value,
      descuento: parseFloat(discount.value),
      precio: parseFloat(priceProduct.value),
      valueTotal: parseFloat(totalPriceProduct.value),
    });
  }

  // Actualizar el totalPrice y amountTotalProdut
  totalPrice.value += parseFloat(totalPriceProduct.value);
  amountTotalProdut.value += parseInt(amountProduct.value);

  console.log(amountProduct.value);
  console.log(amountTotalProdut.value);

  // Limpiar los campos después de agregar o actualizar
  clean();
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

function clean() {
  NameProduct.value = "";
  amountProduct.value = "";
  priceProduct.value = "";
  getIdProduct.value = "";
  discount.value = "";
  totalPriceProduct.value = "";
  valueDiscount.value = ""

}


async function deleteBill(data) {
  try {
    const res = await store.deleteVentas(data._id);
    totalVenta.value -= data.precio;

    getVentas(); // Vuelve a cargar los productos después de eliminar uno
  } catch (error) {
    console.error("Error al eliminar el producto:", error); // Maneja cualquier error que ocurra
  }
}


function SumCant(dataI) {
  console.log(dataI);
  // resProduct.value.data.forEach((producto) => {
  //   const idProducto = producto._id;
  //   if (idProducto == dataI.IdProducto) {
  //     modifiCant.value = producto.cantidad += dataI.cantidad;
  //     id.value = dataI.IdProducto;
  //     putInfoProduct();
  //     deleteBill(dataI);
  //   } else {
  //     console.log("no se pudo sumar la cantidad del producto");
  //   }
  // });
}

async function putInfoProduct() {
  const res = await store.putProductCant(id.value, {
    cantidad: modifiCant.value,
  });
}


onBeforeMount(() => {
  getBill();
  getProduct();

});

onMounted(
  DateNow
  );
</script>
