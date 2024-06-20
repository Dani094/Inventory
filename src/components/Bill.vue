<template>
  <div>
    <div v-show="typeBill == 0"> 
      <div class="text-[25px] text-center"><p>Escoge la factura</p></div> 
     <div class="flex w-[60%] mt-36 m-auto">
       <q-card class="my-card w-[35%]  m-auto rounded-xl"  bordered>
       <img   src="../assets/factura.PNG">
       <q-list>
         <q-item clickable>
           <q-item-section avatar class="text-[20px] text-blue-500">
             <i class="fas fa-file-invoice"></i>
           </q-item-section>

           <q-item-section @click="typeBill = 1" >
             <q-item-label>Factura</q-item-label>
             <q-item-label caption>Formato Grande</q-item-label>
           </q-item-section>
         </q-item>
       </q-list>
     </q-card>

     <q-card class="my-card w-[35%]  m-auto rounded-xl"  bordered>
       <img  src="../assets/recibo.PNG">

       <q-list>
         <q-item clickable>
           <q-item-section avatar class="text-[20px] text-blue-500">
             <i class="fas fa-file-invoice"></i>
           </q-item-section>

           <q-item-section @click="typeBill = 2">
             <q-item-label>Recibo</q-item-label>
             <q-item-label caption>Formato pequeño</q-item-label>
           </q-item-section>
         </q-item>
       </q-list>
     </q-card>
     </div>
   </div>

<div  >
    <div v-show="typeBill == 1" class=" w-[100%] xs:w-[100%] min-h-[80vh]  bg-white ">
          <div class="row">
            <div class="col">
                <p class="text-[40px] mt-4 w-[80%]  text-start "> FACTURA </p>
           <ul class="mt-5  text-[16px]">
             <li >Factura n°: 00{{numBill}}</li>
             <li >Fecha: {{date}}</li>
           </ul> 
            </div>
            <div class="col">
              <div class=" w-22 h-28 pr-8 float-end">
                <img class="w-full h-full " src="../assets/logoNewxo.png" alt="">
              </div>
            </div>
          </div>
        

         <div class="mt-8 ">
           <ul>
             <li>{{nameCustomer}}</li>
             <li>Telefono: {{numberCustormer}}  </li>
             <li>Correo Electronico: {{emailCustomer}}</li>
           </ul>

         </div>
         <div>

         <div class="border-t-2 font-sans border-black mt-4">
             <div class="row mt-8 text-center bg-[#000000] text-white p-2 w-[100%]  ">
             <div class="col">Descripcion:</div>
             <div class="col">Cantidad:</div>
             <div class="col mr-1 "> descuento </div>
             <div class="col mr-1 "> Tipo Descuento </div>
             <div class="col">Precio Unitario: </div>
             <div class="col">Total: </div>
           </div>

           <div v-for="(item, index) in listProduct" :key="index">
            <div class="row w-full p-2 text-center border-b border-t border-black-0.4" > 
              <div class="col-2 mr-1 "> {{ item.name }}</div>
               <div class="col mr-1 ">  {{ item.Unidades }} </div>
               <div class="col mr-1 ">  {{ item.descuento }}   </div>
               <div class="col mr-1 ">  {{ item.tipoDescuento }} </div>
               <div class="col mr-1 ">$ {{ item.precio }} </div>
               <div class="col mr-1 ">$ {{ item.valueTotal }} </div>
            </div>
          </div>
       
      

          <div class="mt-2 bg-black w-full ">
            <ul class="float-end ">
              <li>Iva: <strong class="font-normal ml-1"> $ {{impuesto}}</strong></li>
              <li>Subtotal: <strong class="font-normal ml-1"> $ {{SubTotalBill}}</strong>  </li>
              <li>Total: <strong class="font-normal ml-1">$ {{totalPrice}}</strong> </li>
            </ul>
        </div>
        
          </div>
</div>
        

          <div class="mt-28 font-normal text-[15px] border-t-2 font-sans border-black  p-4 ">
            <div class="row">
              <div class="col">
                <ul>
              <li class="mb-4">¡Gracias por su compra!</li>
              <li>Informacion de pago: </li>
              <li>{{nameSeller}} </li>
              <li>Naturista</li>
              <li>Fecha de pago: {{}}</li>
            </ul>
          </div>
              <div class="col">
                <ul class="float-right mt-8" >
              <li>Contacto </li>
              <li>{{userCel}} </li>
              <li>{{userName}}</li>
              <li>{{userAddres}}</li>
              <li>{{userEmail}}</li>
              <li>{{userTown}}</li>
              <li>www.naturistas.com</li>

            </ul>
              </div>
            </div>
           

            
        </div>
          <button v-show="typeBill !== 3"  class="text-black bg-white mt-10 w-32 h-10 right-2 float-end rounded-xs" @click=" printPage()">
           <!-- Icono de Descarga -->
          <i class="fas fa-download"></i>
          </button>
        </div>
      </div>

    <div v-show="typeBill == 2">
        <div  class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
    <div class="font-mono text-sm text-gray-800">
      <div class="text-center">
        <div class="font-bold text-lg">NEWXO</div>
        <div class="mt-2">DIC 09 2020 17:20:17 RMBDES 8.51</div>
      </div>
      <div class="mt-4">
        <div>CORRESPONSAL BANCOLOMBIA</div>
        <div>PARQUE PRINCIPAL SAN R</div>
        <div>CLL 29 30-10 PARQUE PR</div>
        <div class="mt-2">C. UNICO: 3007016810</div>
        <div>MAESTRO **6614 RECIBO: 019680</div>
        <div>TER: 1232373</div>
        <div>RRN: 021173</div>
      </div>
      <div class="mt-4">
        <div>CTA ORIGEN: **************3434</div>
        <div>CTA DESTINO: **************3434</div>
        <div class="mt-2">ARQC: 2B6D2155C6196BC</div>
        <div>AID: A0000000043060</div>
        <div>AP LABEL: MAESTRO</div>
      </div>
      <div class="mt-4 font-bold">TRANSFERENCIA</div>
      <div class="mt-2">
        <div>APRO: 823199</div>
        <div class="font-bold">VALOR $ 2.000.000</div>
      </div>
      <div class="mt-4 text-justify text-xs">
        Bancolombia es responsable por los servicios prestados por el CB. El CB no puede prestar servicios financieros por su cuenta. Verifique que la información en este documento sea correcta. Para reclamos comuníquese al 018000972345. Conserve esta tirilla como soporte.
      </div>
      <div class="mt-4 text-center font-bold">*** CLIENTE ***</div>
    </div>
  </div>

  <button v-show="typeBill !== 3"  class="text-black bg-white mt-10 w-32 h-10 right-2 float-end rounded-xs" @click=" printPage()">
    <i class="fas fa-download"></i>
  </button>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted,  } from "vue";
import { billStore } from "../store/billing.js";
import {useModalStore} from "../store/storeModal.js"
import {sweetDelete} from "@/Global/notify"
import { usersStore } from "../store/users.js";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";

const props = defineProps({
  title: String,
  dataBill: Object,
}) 



const user = usersStore();
const storeExist = exitStore();
const storeM =  useModalStore()
const storeBilling = billStore();
const storeLogin = LoginStore();

let arrayEdit = ref()
let valEditCrea = ref()
let  modalTitle = ref()
let state = ref(false)
let TotalUnits = ref();
let loading = ref(false);
let dialog = ref(false);
let index = ref();
let filtroDay = ref();
let numBill = ref()
let nameSeller = ref()
let nameCustomer = ref()
let emailCustomer = ref()
let numberCustormer = ref()
let impuesto = ref()
let discount = ref()
let amountTotalProdut = ref()
let totalPrice = ref()
let nameModel = ref()
let crearEditar = ref()
let date = ref()
let filter = ref("");
let showBill = ref(false)
let arrayShow = ref([])
let rowsExist = ref()
let listProduct = ref([])
let arrayDel = ref()
let SubTotalBill = ref(0)
let userName = ref()
let userDocument = ref()
let userCel = ref()
let userAddres = ref()
let userEmail = ref()
let userTown = ref()
let data = ref(props.dataBill)
let typeBill = ref(0)

let rows = ref([]);

function printPage() {
      window.print();
    }

  

const getBill = async () => {
  const res = await storeBilling.GetIBill(storeLogin.Email);
    console.log(typeBill.value);
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
        row.index = index + 1;     
})}
};



async function ExitsGet() {
  const res = await storeExist.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    rowsExist.value = res.data;
  } 
  showBillFunc()
}


function goInfo(data) {
  arrayEdit.value = data
 
}

function showBillFunc() {
  console.log(data.value);

  listProduct.value = []
  arrayShow.value = data.value
  numBill.value = data.value.numFactura;
  nameSeller.value = data.value.vendedor;
  nameCustomer.value = data.value.cliente;
  emailCustomer.value = data.value.email
  numberCustormer.value = data.value.number
  impuesto.value = data.value.impuesto
  amountTotalProdut.value = data.value.CantProduct;
  totalPrice.value = data.value.PrecioVenta;
  date.value = data.value.date.slice(0,10)
  getListProduct()
  console.log(totalPrice.value, discount.value);

  SubTotalBill.value =  parseFloat(totalPrice.value -  discount.value)
  console.log(SubTotalBill.value);
}


function getListProduct() {
  console.log( rowsExist.value);
  rowsExist.value.forEach((row, index) => {
      if (row.NumBill == numBill.value) {
      numBill.value = row.NumBill
      discount.value = row.Discount
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
}

async function deleteBill(data) {  
  sweetDelete(data, async () => { 
    try {
    const res = await storeBilling.DeleteBill(data._id);
    deleteExist(data)
    getBill(); 
  } catch (error) {
    console.error("Error al eliminar el producto:", error); 
  }})
}

async function deleteExist(data) {
  try {
    for (const element of rowsExist.value) {
      if (element.NumBill == data.numFactura) {
        const res = await storeExist.DeleteExits(element._id);
      }
    }
    getBill();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}


const getUser = async () => {
  const res = await user.GetUsers();
  if (res.status < 299) {
    const data = res.data;
    console.log(data);
    data.forEach((row, index) => {
      userName.value = row.Names
      userDocument.value = row.Document
      userCel.value = row.Cel 
      userAddres.value = row.userAddress
      userEmail.value = row.Email
      userTown.value = row.Municipio


        row.index = index + 1;     
})}
};






async function modalCreaEdit(p) {
  showBill.value = p

  if (p === 1) {
    dialog.value = true
    modalTitle.value = "CREAR FACTURA"
    valEditCrea.value = p
  } 
  else if(p === 2){
   dialog.value = true
    modalTitle.value =  "EDITAR FACTURA"
    valEditCrea.value = p
  }
  else {
    dialog.value = true
  }
}



onMounted(() => {
  getBill();
  ExitsGet()
  getUser()

});
</script>