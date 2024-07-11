<template>
  <div class="rounded-xl w-full">
    <div class="flex items-start justify-between w-full bg-[#04162d]"> 
        <h5 class="text-center text-white font-bold text-[20px] p-4 w-full" > {{title}} </h5> 
    </div>
    <q-form ref="myForm" @submit.prevent.stop="formValidate()" class="pt-4 pb-16 px-6 " >

        <!-- Vendedor -->
        <div class="mr-4 w-full justify-center" v-show="selectForm == 1">
         <!-- Input vendedor -->
          <div class="mb-1">
            <label for="nameSeller" class="block text-sm font-medium text-gray-700">Nombre vendedor</label>
          <div class="relative ">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <i class="material-icons text-gray-500">supervisor_account</i>
            </span>
            <input id="nameSeller" type="text" v-model="nameSeller" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          </div>
            <div class="mb-1">
              <!-- Input Fecha de pago -->
            <label for="date" class="block text-sm font-medium text-gray-700 ">Fecha de pago</label>
                      <div class="relative ">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                          <i class="material-icons text-gray-500">date</i>
                        </span>
                        <input id="date" type="date" v-model="datePayBill"   class="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                      </div>
            </div>
            <div class="mb-2">
              <!-- Input impuesto -->
              <label for="Impuesto" class="block text-sm font-medium text-gray-700">Iva </label>
            <div class="relative ">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">account_balance</i>
        </span>
        <input id="Impuesto" type="number" v-model="impuesto" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
            </div>
              <div class="mb-2">
                <!-- Input tipo de descuento -->
                <label for="discountType" class="block text-sm font-medium text-gray-700">Tipo de descuento</label>
                <div class="relative mt-1">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i class="material-icons text-gray-500">percent</i>
                  </span>
                  <select id="discountType" v-model="valueDiscount" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option disabled value="">Seleccione una opción</option>
                    <option v-for="option in optionsType" :key="option" :value="option">{{ option }}</option>
                  </select>
                </div>
              </div>
              <!-- Input descuento -->
              <div class="mb-2">
                <label for="discount" class="block text-sm font-medium text-gray-700">Descuento</label>
                <div class="relative mt-1">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i class="material-icons text-gray-500">local_offer</i>
                  </span>
                  <input id="discount" type="number" v-model="discount" 
                    class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
              </div> 
              <div class="mb-2">
              <!-- Input impuesto -->
              <label for="Impuesto" class="block text-sm font-medium text-gray-700">Metodo de pago </label>
            <div class="relative ">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">credit_card</i>
        </span>
        <input id="Impuesto" type="text" v-model="MethodPay" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
            </div> 
        </div>     

       <!-- Cliente -->
        <!-- Input nombre del cliente -->
        <div class="col mr-2 " v-show="selectForm == 2">
          <label for="nameCustomer" class="block text-sm font-medium text-gray-700">Nombre del cliente</label>
          <div class="relative mt-1">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <i class="material-icons text-gray-500">badge</i>
            </span>
            <input id="nameCustomer" type="text" v-model="nameCustomer" class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <!-- Input email cliente -->
            <div class="col mr-2">
              <label for="emailCustomer" class="block text-sm font-medium text-gray-700">Correo Electronico</label>
              <div class="relative mt-1">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="material-icons text-gray-500">email</i>
                </span>
                <input id="emailCustomer" type="text" v-model="emailCustomer"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>
            <!-- Input numero de cliente -->
            <div class="col mr-0">
              <label for="numCustomer" class="block text-sm font-medium text-gray-700">Numero </label>
              <div class="relative mt-1">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="material-icons text-gray-500">phone</i>
                </span>
                <input id="numCustomer" type="number" v-model="numCustomer"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>
        </div>

      <!-- productos -->
      <div  v-show="selectForm == 3">
      <div class="flex items-start justify-between mb-4 mt-2">
        <div>
          <p class="text-center text-black font-bold text-[18px]">Productos</p>
        </div>
      </div>
      <div class="row mb-4">
        <!-- select producto -->
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
    <!-- Input cantidad producto -->
    <div class="col mr-2">
      <label for="amountProduct" class="block text-sm font-medium text-gray-700">Cantidad</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">production_quantity_limits</i>
        </span>
        <input id="amountProduct" @change=" typeDiscount" type="number" v-model="amountProduct"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
  </div>
    <div class="row mb-4">
      <!-- Input precio del producto -->
    <div class="col mr-2">
      <label for="priceProduct" class="block text-sm font-medium text-gray-700">Precio</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 ">
          <i class="material-icons text-gray-500">attach_money</i>
        </span>
        <input id="priceProduct" type="number" v-model="priceProduct"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
    <!-- Input valor total productos -->
 <div class="col mr-2">
      <label for="precioTotal" class="block text-sm font-medium text-gray-700">Valor Total</label>
      <div class="relative mt-1">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="material-icons text-gray-500">receipt_long</i>
        </span>
        <input id="precioTotal" type="number" v-model="valueProduct"  class="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
    </div>
  </div>
  <!-- boton agg productos -->
      <div  @click="addOrUpdateProductList()"    class="rounded-md relative w-[115px] h-10 mt-2 mb-4 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500">
        <span class="text-white font-semibold ml-2 transform group-hover:translate-x-20 transition-all duration-300">Agregar</span>
        <span class="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg class="svg w-8 text-white" fill="none" height="24" stroke="currentColor" stroke-linecap="round"  stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </div>
      <!-- tabla productos -->
      <div class="row w-full mt-8 p-2 bg-[#04162d] text-center border-t border-black-0.4 text-white" v-show="showTableProduct">
      <div class="col mr-1">#</div>
      <div class="col-2 mr-1">Nombre</div>
      <div class="col mr-1">Unidades</div>
      <div class="col mr-1">Valor unidad</div>
      <div class="col mr-1">Valor Total</div>
      <div v-show="valueEditCrea === 2" class="col mr-1">opciones</div></div>
      <div v-for="(item, index) in listProduct" :key="index">
        <div class="row w-full p-2 text-center border-b border-t border-black-0.4" > 
          <div class="col mr-1 ">#{{ index + 1 }}</div> 
          <div class="col-2 mr-1 "> {{ item.name }}</div>
           <div class="col mr-1 ">#{{ item.Unidades }}</div>
           <div class="col mr-1 ">${{ item.precio }}</div>
           <div class="col mr-1 ">${{ item.valueTotal.toLocaleString() }}</div>
           <div v-show="valueEditCrea === 2" class="col mr-1"> 
            <div  class="button w-8 h-8 cursor-pointer bg-white"  @click="goInfoExits(item)">
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </div>
           </div>
        </div>
      </div>
      <!-- valores factura -->
      <div class="flex items-start justify-between mt-8">
        <div>
          <h6 class="text-start text-black font-bold  text-[15px]">Descuento = {{ valorDescuento }} {{ discount }} = {{fixedDiscount}} </h6>
          <h6 class="text-start text-black font-bold  text-[15px]">Iva: % {{ impuesto }} =  {{ discountAmount.toLocaleString() }} </h6>
          <h6 class="text-start text-black font-bold  text-[15px]">Cantidad de productos = {{ amountTotalProdut }} </h6>
          <h6 class="text-start text-black font-bold  text-[15px]">Total = {{ totalPrice.toLocaleString() }}</h6>
        </div>
      </div>
      <hr class="border border-dashed border-gray-500/50 my-2" />
       
      <!-- div botones crear y editar -->
      <div class="flex justify-end items-center gap-4">
        <q-btn v-if="valueEditCrea == 1" @click="actulizar = true" :disabled="!isModified" icon="save_as" label="Generar Factura"   :loading="loading" type="submit" v-close-popup class="text-white bg-[#04162d] rounded-1xl" ></q-btn>
        <q-btn v-else icon="edit" @click="actulizar = true" label="Editar Factura" :loading="loading" type="submit" class="text-white bg-[#04162d] rounded-1xl" v-close-popup></q-btn>
      </div>
      </div>
      <!-- botones siguiente form -->
      <div id="textFormInvalidate" class="message text-red-800 mb-4" ></div>
        <q-btn v-show="selectForm == 1" icon="arrow_forward"  @click="selectNum = 2" type="submit" class="text-white bg-green-700 rounded-1xl m-2  float-end" >siguiente </q-btn>
        <q-btn v-show="selectForm == 2" icon="arrow_forward"  @click="selectNum = 3, typeDiscount()" type="submit" class="text-white bg-green-700 rounded-1xl m-2  float-end" >siguiente </q-btn>
        <!-- boton salir -->
        <q-btn icon="cancel"  type="button" class="text-white bg-red-700 rounded-1xl float-end  m-2" v-close-popup > cerrar</q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { billStore } from "../store/billing.js";
import { inventoryStore } from "@/store/inventory.js";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";

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
const storeLogin = LoginStore();

let numBill = ref();
let nameSeller = ref("");
let nameCustomer = ref("");
let currentDateFormatted = ref("");
let amountProduct = ref();
let getIdProduct = ref([]); 
let priceProduct = ref();
let totalPrice = ref(0);
let listProduct = ref([]);
let rows = ref([]);
let loading = ref(false);
let getProductName = ref([]);
let getProductId = ref([]);
let resProduct = ref();
let SerialProduct = ref();
let NameProduct = ref();
let totalPriceProduct = ref(0);
let amountTotalProdut = ref(0);
let user = ref(storeLogin.Email);
let UserUpdate = ref()
let discount = ref();
let valueDiscount = ref();
let optionsType = ref(["porcentaje", "valor fijo"]);
let dataGoInfo = ref()
let rowsExist = ref()
let valueEditCrea = ref()
let index = ref()
let idProductExist = ref()
let getIdExits = ref()
let impuesto = ref()
let emailCustomer = ref()
let numCustomer = ref()
let datePayBill = ref()
let showTableProduct = ref(false)
let selectForm = ref(1)
let selectNum = ref(0)
let  message = ref()
let valorDescuento = ref()
let MethodPay =  ref()
let editProduct = ref(false)
let discountAmount = ref(0)
let fixedDiscount = ref(0)
let actulizar =  ref(false)
let valueProduct = ref(0)
// bill
const getBill = async () => {
  const res = await storeBilling.GetIBill(storeLogin.Email);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
    valueEditCrea.value = props.value
    dataGoInfo.value = ""

    if (valueEditCrea.value == 1) {
      dataGoInfo.value = ""
      index.value = 0
    }
    else if(valueEditCrea.value == 2){
      index.value = props.ind
      dataGoInfo.value = props.dataEdit
      showTableProduct.value = true
      goInfoBill()
      ExitsGet()
    }
  }
};

async function postBill() {
  const bill = await storeBilling.NewBill({
    UserEmail: user.value,
    numFactura: numBill.value,
    vendedor: nameSeller.value,
    cliente: nameCustomer.value,
    tipoDescuento: valueDiscount.value,
    descuento: discount.value,
    CantProduct: amountTotalProdut.value,
    PrecioVenta: totalPrice.value,
    impuesto: impuesto.value,
    email: emailCustomer.value,
    number: numCustomer.value,
    datePay: datePayBill.value,
    MethodPay: MethodPay.value
  });
  await getBill()
  totalPriceProduct.value = 0
};

async function putInfoBill() {
  const res = await storeBilling.PutBill(index.value, {
    UserEmail: user.value,
    numFactura: numBill.value,
    vendedor: nameSeller.value,
    cliente: nameCustomer.value,
    tipoDescuento: valueDiscount.value,
    descuento: discount.value,
    CantProduct: amountTotalProdut.value,
    PrecioVenta: totalPriceProduct.value,
    impuesto: impuesto.value,
    email: emailCustomer.value,
    number: numCustomer.value,
    datePay: datePayBill.value,
    MethodPay: MethodPay.value
  });
  getBill();
  totalPriceProduct.value = 0
  
}

  function formValidate() {
    if (selectForm.value == 1) {  

    if (!nameSeller.value) {
      message.value = "Debe llenar el campo de vendedor";
    } else if (!datePayBill.value) {
      message.value = "Debe llenar el campo de fecha de pago";
    } else if (impuesto.value == null || impuesto.value === "") {
      message.value = "Debe llenar el campo de iva";
    } else if (valueDiscount.value == null || valueDiscount.value === "") {
      message.value = "Debe llenar el campo de valor del descuento";
    } else if (discount.value == null || discount.value === "") {
      message.value = "Debe llenar el campo del descuento";
    }
    else if (!MethodPay.value) {
      message.value = "Debe llenar el campo de metodo de pago";
    } else {
      message.value = "";
      selectForm.value = selectNum.value;
    }
    }
     else if (selectForm.value == 2) {  
      if (!nameCustomer.value) {
        message.value = "Debe llenar el campo de nombre del cliente";
      } else if (!emailCustomer.value) {
        
        message.value = "Debe llenar el campo de correo del cliente";
      } else if (!numCustomer.value) {
        message.value = "Debe llenar el campo numero del cliente";
      }
      else{
        message.value = ""
        selectForm.value = selectNum.value;
      }
    }
    else if (selectForm.value == 3) {  
      
      if (listProduct.value.length === 0) {
        message.value = "Debes agregar productos";
      }
      else{
        EditarCrearBill()
      }
    }
    if (message.value) {
        textFormInvalidate.textContent = message.value;
        textFormInvalidate.style.display = 'block';
        setTimeout(() => {
          textFormInvalidate.style.display = 'none';
        }, 3000);
        return false; 
      }
    }
    const isModified = computed(() => {
  return (
    listProduct.value.length !== 0
    
  );
});
    
 function EditarCrearBill() {
   if (valueEditCrea.value == 1) {
      getNumBill()

   }
  else if (valueEditCrea.value == 2){ 
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
    postBill();
    postExist();
  } else {
    postBill();
    postExist();
  }
}

function goInfoBill() {
    const data = dataGoInfo.value
    console.log(data);
      numBill.value = data.numFactura;
      nameSeller.value = data.vendedor;
      nameCustomer.value = data.cliente;
      discount.value = data.descuento;
      valueDiscount.value = data.tipoDescuento;
      amountTotalProdut.value = data.CantProduct;
      totalPrice.value = data.PrecioVenta;
      impuesto.value = data.impuesto;
      emailCustomer.value = data.email;
      numCustomer.value = data.number;
      datePayBill.value = data.datePay.slice(0,10)
      MethodPay.value = data.MethodPay
      console.log(MethodPay.value);


}

// Exist
async function ExitsGet() {
  const res = await storeExist.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    rowsExist.value = res.data;
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
      }
    );
   if (actulizar.value == true) {
     reloadPage()
   }
  } 
}

const postExist = async () => {
  try {

    listProduct.value.forEach(async (product) => {
      restCant(product)
      const bill = {
        NumBill: numBill.value,
        Name: product.name,
        Serial: product.serial,
        Units: product.Unidades,
        Price: product.precio,
        Discount: discount.value,      
        UserEmail: user.value,
      };
      const response = await storeExist.PostExits(bill);
      
    });
  } catch (error) {
    console.error("Error al enviar los datos de la factura:", error);
  }
  ExitsGet()
};

async function putInfoExist() { 
  console.log( "list", listProduct.value );
  listProduct.value.forEach(async (product) => {
    idProductExist.value = product.Id
      const bill = {
        NumBill: numBill.value,
        Name: product.name,
        Serial: product.serial,
        Units: product.Unidades,
        Price: product.precio,
        Discount: discount.value,    
        UserEmail: user.value,
      };
      const response = await storeExist.PutExits(idProductExist.value, bill);
    });
}

function goInfoExits(i) {    
  editProduct.value = true
    SerialProduct.value = i.serial
    getIdExits.value = i.Id;
    totalPriceProduct.value  = i.valueTotal;
    priceProduct.value = i.precio
    impuesto.value = impuesto.value
    amountProduct.value = i.Unidades
    getValues()
  }

// Product
async function getProduct() {
  const res = await storeInventory.GetInventory(storeLogin.Email);
  resProduct.value = res;
  if (res.status < 299) {
    const uniqueNames = new Set();
    for (let i in res.data) {
      const name = res.data[i].Name;
      if (!uniqueNames.has(name)) {
        uniqueNames.add(name);
        let object = { label: name, value: res.data[i]._id };
        let object1 = { label: res.data[i].Serial, value: res.data[i]._id };
        let object2 = { label: res.data[i].Price, value: res.data[i]._id };
        getProductName.value.push(object);
        getProductId.value.push(object1);
      }
    }
  }
}

// obtiene los valores del producto con el serial o el id 
  function getValues() {
  resProduct.value.data.forEach((producto) => {
    const idProducto = producto._id;
    const serial = producto.Serial
    if ( editProduct.value === false) {
       if (getIdProduct.value ===  idProducto ) {
      SerialProduct.value = producto.Serial;
      NameProduct.value = producto.Name;
      priceProduct.value = producto.Price;
    }
    else {
      console.log("El ID no ", getIdProduct.value);
    }
    }
    else if( editProduct.value === true){
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

// funcion para array de productos ya sea para crear o editar
const addOrUpdateProductList = () => {
  const productIndex = listProduct.value.findIndex(product => product.Id === getIdExits.value);
  if (editProduct.value == true) {
      listProduct.value.forEach((producto) => {
      if (producto.Id == getIdExits.value) {
      listProduct.value[productIndex] = {
            Id: producto.Id,
            serial: SerialProduct.value,
            name: NameProduct.value,
            Unidades: parseInt(amountProduct.value),
            precio: parseFloat(priceProduct.value),
            valueTotal: parseFloat(valueProduct.value),
          };
      }
    }) 
  } else {
    listProduct.value.push({
      serial: SerialProduct.value,
      name: NameProduct.value,
      Unidades: parseInt(amountProduct.value),
      precio: parseFloat(priceProduct.value),
      valueTotal: parseFloat(totalPriceProduct.value),
    });
  }
  editProduct.value = false
  showTableProduct.value = true 
  typeDiscount()
  cleanProduct()
};


// Valor total a partir de los productos
function valueTotal(descuento) {
  console.log("tripe"); 
  totalPriceProduct.value = 0
  amountTotalProdut.value = 0
  totalPrice.value = 0
  let totalWithoutIva =  0
  if (valueEditCrea.value == 1) {
     valueProduct.value = priceProduct.value * parseInt(amountProduct.value) 
     totalPriceProduct.value = valueProduct.value
  }
  else{
    valueProduct.value = priceProduct.value * parseInt(amountProduct.value)
    totalPriceProduct.value = listProduct.value.reduce((sum, product) => sum + (product.Unidades * product.precio), 0);
    
  }
  

  const percentage = impuesto.value; 
    listProduct.value.forEach((producto) => {
    amountTotalProdut.value += parseInt(producto.Unidades);
    totalWithoutIva +=  parseInt(producto.valueTotal) 
    discountAmount.value = (totalWithoutIva * percentage) / 100; 
    console.log(discountAmount.value, totalWithoutIva);
    totalPrice.value =  discountAmount.value + totalWithoutIva - descuento
  })
}


// El tipo de descuento ya se valor fijo o por porcentaje
function typeDiscount() {
  
  if (valueDiscount.value === "Porcentaje") {
    const percentage = parseInt(discount.value); 
    console.log(percentage);
    fixedDiscount.value = (totalPriceProduct.value * percentage) / 100;
    valueTotal(fixedDiscount.value)
  } else if (valueDiscount.value === "valor fijo") {
    fixedDiscount.value = discount.value;
    valueTotal(fixedDiscount.value)
  }

  if (valueDiscount.value == "Porcentaje") {
        valorDescuento.value = "%"
    }
    else if (valueDiscount.value == "valor fijo"){
       valorDescuento.value = "$"
    }
    
}

function DateNow() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentMonthFormatted =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
  const currentDayFormatted =
    currentDay < 10 ? `0${currentDay}` : `${currentDay}`;
  currentDateFormatted.value = `${currentDate.getFullYear()}-${currentMonthFormatted}-${currentDayFormatted}`;
}

  function cleanProduct() {
  NameProduct.value = "";
  amountProduct.value = "";
  priceProduct.value = "";
  getIdProduct.value = "";          
}

function SumCant(dataI) {
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

function restCant(data) {
   resProduct.value.data.forEach((producto) => {
    const serial = producto.Serial;
    if (serial == data.serial) { 
      const unitsExit  = data.Unidades;
      const units2 = producto.Units
      if (units2 - unitsExit  == 0) {
        const state = "Agotado"
      const id = producto._id;
      putInfoProduct(id, units2, unitsExit, state);
    }
    else{
      const state = "Disponible"
      const id = producto._id;
      putInfoProduct(id, units2, unitsExit, state);
    }
    } else {
      console.log("no se pudo sumar la cantidad del producto");
    }
  });
}
async function putInfoProduct(id, units2, unitsExit, state) {
  const res = await storeInventory.PutUnits(id, units2, unitsExit, state);
}

const reloadPage = () => {
  location.reload();
}

onBeforeMount(() => {
  getBill();
  getProduct();
});
onMounted(
  DateNow
  );
</script>
