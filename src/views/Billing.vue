<template>
  <div class="lg:pl-40 lg:pr-20 p-4 ">
    <!-- title -->
    <div class="mb-4">
      <h1 class="text-[#04162d] text-3xl font-bold pt-4 "> Facturación</h1>
    </div>
    <!-- btns y search-->
    <div class="flex justify-between py-4">
      <div class="flex items-center">
        <div class="bg-[#04162d] px-4 p-2 rounded-2xl flex">
          <span class="material-symbols-outlined text-white text-2xl mr-2">format_list_numbered</span>
         <h4 class="text-white font-bold text-[18px]"> N° de Facturas: {{ rows.length }} </h4>
        </div>
        </div>
       <div> 
         <q-btn icon="refresh" class="rounded-xl ml-2 bg-[#04162d] text-white" @click="getBill()"></q-btn>
         <q-btn icon="add" class="rounded-xl ml-2 bg-[#04162d] text-white" @click="modalCreaEdit(1)"></q-btn>
       </div>
    </div>
    <q-dialog v-model="dialog" class="py-5 px-0 mx-0 ">
      <div v-if="showBill == 3" class=" w-[100%] sm:w-[100%] md:w-[70%] xl:w-[70%] min-h-[70vh] font-sans font-bold ">
        <bill  :dataBill="arrayBill"/>
      </div>
      <div v-else class="mr-2 xs:w-[100%] w-auto  rounded-[20px] bg-white  " >
      <createbill :title="modalTitle" :ind="index" :value="valEditCrea"  :dataEdit="arrayEdit"   />
      </div>
    </q-dialog>
    <!-- table -->
    <div class="w-[100%] mt-6">           
        <q-table flat bordered :visible-columns="visibleColumns" title="Facturas" :rows="rows" :columns="columns" row-key="index"
          virtual-scroll class="inventTable h-[450px] lg:h-[680px] rounded-2xl" v-model:pagination="pagination" :rows-per-page-options="[0]">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                <q-icon v-if="col.icon" :name="col.icon" size="22px" color="white" style="margin-right: 8px"/>
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
         <template v-slot:top>
            <div  class="row w-full">
              <div class="col">
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar"class="bg-[#E7E8F3] w-[270px] pl-4 pr-4 rounded-lg outline-none">
                  <template v-slot:prepend>
                    <q-icon name="search" class="text-[#04162d]" />
                  </template>
                </q-input> 
                <div class="flex m-4 ">
                  <p class="mt-2">Dia</p>
                  <q-checkbox v-model="filtroDay" color="blue" @click="getBill()"/>
                </div>
              </div>
              <div class="col">
                <div class="absolute right-14">
                  <q-select class="w-0 text-white text-[0px] " v-model="visibleColumns"  multiple dense label="Campos" options-dense :display-value="$q.lang.table.columns" emit-value map-options
                  :options="columns" option-value="name" options-cover />
                </div>
                </div>
            </div>
           </template> 
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div class="flex flex-row justify-center "> 
                <!-- edit -->
                <button class="button w-[40px] h-[37px] editBtn bg-white" @click="(index = props.row._id), arrayEdit = props.row, modalCreaEdit(2)">
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                    ></path>
                  </svg>
                </button>
                <!-- delet -->
                <button class="button w-[40px] h-[37px] bg-black" id="delet" @click="deleteBill(props.row) " >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
                    <g clip-path="url(#clip0_35_24)">
                     <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                      ></path>
                    </g>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
                    <g clip-path="url(#clip0_35_22)">
                      <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_35_22">
                        <rect fill="white" height="57" width="69"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </button>      
                <!-- visualizar -->
                <button class="button w-[40px] h-[37px] bg-[#04162d]" @click="modalCreaEdit(3), arrayBill = props.row">
                  <i class="fas fa-file-invoice"></i>
                </button>
               </div>
            </q-td>
          </template>
        </q-table>
    <!-- tables -->
  </div>
</div>
</template>

<script setup>
import { ref, onMounted,  } from "vue";
import createbill from "@/components/createBill.vue";
import bill from "@/components/Bill.vue"
import { billStore } from "../store/billing.js";
import {useModalStore} from "../store/storeModal.js"
import {sweetDelete} from "@/Global/notify"
import { usersStore } from "../store/users.js";
import { exitStore } from "@/store/exits.js";
import { LoginStore } from "../store/login.js";


const user = usersStore();
const storeExist = exitStore();
const storeM =  useModalStore()
const storeBilling = billStore();
const storeLogin = LoginStore();

let arrayEdit = ref()
let valEditCrea = ref()
let  modalTitle = ref()
let dialog = ref(false);
let index = ref();
let filtroDay = ref(true);
let numBill = ref()
let typeBill = ref(0)
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
let  arrayDel = ref()
let SubTotalBill = ref(0)
let userName = ref()
let userDocument = ref()
let userCel = ref()
let userAddres = ref()
let userEmail = ref()
let userTown = ref()
let arrayBill = ref()
let pagination = ref({ rowsPerPage: 0 });
const visibleColumns = ref(["numero","vendedor", "Cliente", "Cantidad de productos", "Total", "Fecha", "options"]);
let columns = ref([
  { name: "index", label: "N°", field: "index", align: "center",  sortable: true,  icon: "format_list_numbered", },
  { name: "numero", align: "center", label: "Factura", field: "numFactura", sortable: true,icon: "receipt", },
  { name: "vendedor", align: "center", label: "Vendedor", field: "vendedor", sortable: true, icon: "store",},
  { name: "Cliente", align: "center", label: "Cliente", field: "cliente", sortable: true, icon: "person", },
  { name: "Cantidad de productos", align: "center", label: "Cantidad", field: "CantProduct", sortable: true, icon: "inventory", },
  { name: "Total", align: "center", label: "Total", field: "PrecioVenta", sortable: true, icon: "attach_money",},
  { name: "Fecha", align: "center", label: "Fecha", field: (row) => row.date.slice(0, 10), sortable: true, icon: "event",},
  { name: "options", align: "center", label: "Opciones", sortable: true,icon: "settings",
  },
]);
let rows = ref([]);

const getBill = async () => {
  const res = await storeBilling.GetIBill(storeLogin.Email);
  if (res.status < 299) {
    let resBill = res.data;
    if (filtroDay.value === true) {

    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0"); 
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");  
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    console.log(resBill)
    resBill = resBill.filter((fecha) => fecha.date.slice(0, 10) === fechaFormateada );
    rows.value = resBill;
}


} else {
  rows.value = res.data;
}


rows.value.forEach((row, index) => {
  row.index = index + 1;

})
}

async function ExitsGet() {
  const res = await storeExist.GetExits(storeLogin.Email);
  if (res && res.status < 299) {
    rowsExist.value = res.data;
  } 
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
});
</script>
<style>


/* button delete */

.button {
  margin-left: 10px;
  border-radius: 30%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  gap: 2px;
  color: white;
}
.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}
.svgIcon path {
  fill: white;
}
#delet:hover {
  transition-duration: 0.3s;
  background-color: rgb(193, 9, 9);
  align-items: center;
  gap: 0;
}
.bin-top {
  transform-origin: bottom right;
}
#delet:hover .bin-top {
  transition-duration: 0.5s;
  transform: rotate(160deg);
}

  .q-dialog__inner--minimized {
    padding: 0px;
}


</style>