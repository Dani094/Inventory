<template>
  <div class="lg:pl-40 lg:pr-20 p-4 ">
    <!-- title -->
    <div class="mb-4">
      <h1 class="text-[#04162d] text-3xl font-bold pt-4 rounded-xl"> Facturación</h1>
    </div>
    <!-- btns y search-->
    <div class="flex justify-between py-4">
      <div class="flex items-center">
        <div class="bg-[#04162d] px-4 p-2 rounded-2xl">
         <h4 class="text-xl text-white font-bold"> Cantidad de Facturas: {{ rows.length }} </h4>
                </div>
            </div>
         <div> 
        <q-btn icon="refresh" class="rounded-xl ml-2 bg-[#04162d] text-white" @click="getBill()"></q-btn>
      <q-btn icon="add" class="rounded-xl ml-2 bg-[#04162d] text-white" @click="modalCreaEdit(1)"></q-btn>
      </div>
      </div>
     
    <q-dialog v-model="dialog">
      <div v-if="showBill == 3" class="mr-2 w-[70%] xs:w-[90%] min-h-[70vh] bg-white p-10 font-serif">
        <div class=" w-[100%] xs:w-[100%] min-h-[80vh] rounded-[20px] bg-white p-6">
          <h3 class="text-[35px] w-[80%] font-bold text-start absolute"> {{nameEmpresa}} </h3>
       <div class="row mt-24">
         <div class="col">
           <ul>
             <li class="mt-2">{{nameSeller}}</li>
             <li class="mt-2 ">Fecha: {{date}}</li>
             <li class="mt-2">N° factura: 0{{numBill}}</li>
             <li class="mt-2">Nombre vendedor: {{nameSeller}}</li>
           </ul> 
         </div>
         <div class="col">
           <ul>
             <li class="mt-2">Ciudad: San Gil</li>
             <li class="mt-2">Dirrecion: Carrera 10 #3 - 1</li>
             <li class="mt-2">Telefono: 3156273485</li> 
             <li class="mt-2">Correo electronico: novaSystems@gmail.com</li> 
            </ul>
         </div>
             <li class="mt-2">Nombre vendedor: {{nameSeller}}</li>
         <div class="col flex justify-center items-center">
            <img src="/logo.png" alt="logo de la Empresa" class="w-[40%]">
         </div>
       </div>

       <div class="row mt-10">
         <div class="col">
           <ul>
             <li class="mt-2">Facturar a: {{nameCustomer}}</li>
             <li class="mt-2">Telefono: {{}}</li>
             <li class="mt-2">Correo Electronico: {{}}</li>
           </ul>

          </div> 
         </div>

         <div class="row mt-8 text-center bg-[#04162d] text-white p-2 w-[100%]">
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
               <div class="col mr-1 ">#{{ item.Unidades }}</div>
               <div class="col mr-1 "> {{ item.descuento }}  </div>
               <div class="col mr-1 "> {{ item.tipoDescuento }}</div>
               <div class="col mr-1 ">${{ item.precio }}</div>
               <div class="col mr-1 ">${{ item.valueTotal }}</div>
            </div>
          </div>

          <button class="button bg-[#04162d] mt-20 right-2 float-end" @click="generateInvoice()">
           <!-- Icono de Descarga -->
          <i class="fas fa-download"></i>
          </button>
        </div>
      </div>
 
      <div v-else class="mr-2 xs:w-[100%] min-h-[80vh] rounded-[20px] bg-white p-6 " >
      <bill :title="modalTitle" :ind="index" :value="valEditCrea" :dataEdit="arrayEdit"   />
       
      </div>
    </q-dialog>

 

    <!-- table -->
    <div class="w-[100%] mt-6">           
          
          <!-- tables -->
   
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
            <div class="w-[70%]">
               <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar"class="bg-[#E7E8F3] w-[270px] pl-4 pr-4 rounded-lg outline-none">
              <template v-slot:prepend>
                <q-icon name="search" class="text-[#04162d]" />
              </template>
            </q-input> 
            
            <div class="flex m-4 ">
              <p class="mt-2">Dia</p>
              <q-checkbox v-model="filtroDay" color="blue" @click="getVentas()"/>
            </div>
            </div>
           

           

            <div class="w-[10%] mr-4  absolute right-0 top-4">
              <q-select  v-model="visibleColumns"  multiple dense label="Campos" options-dense :display-value="$q.lang.table.columns" emit-value map-options
                :options="columns" option-value="name" options-cover />
            </div>
          </template>


          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div class="flex flex-row justify-center "> 
                <!-- edit -->
                <button class="button editBtn bg-white" @click="(index = props.row._id), goInfo(props.row), modalCreaEdit(2)">
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                    ></path>
                  </svg>
                </button>
           

                <!-- delet -->
                <button class="button bg-black" id="delet" @click="Delete(props.row)" >
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
                <button class="button bg-[#04162d]" @click="modalCreaEdit(3), showBillFunc(props.row), cleanVarShow()">
                  <i class="fas fa-eye"></i>

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
import { ref, onMounted } from "vue";
import bill from "@/components/Bill.vue";
import Tables from "@/components/table.vue";
import Modal from "@/components/modals.vue";
import { billStore } from "../store/billing.js";
import {useModalStore} from "../store/storeModal.js"
import { exitStore } from "@/store/exits.js";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const storeExist = exitStore();
const storeM =  useModalStore()
const storeBilling = billStore();
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
let discount = ref()
let amountTotalProdut = ref()
let totalPrice = ref()
let nameModel = ref()
let crearEditar = ref()
let date = ref()
let filter = ref("");
let nameEmpresa = ref("Naturistas")
let showBill = ref(false)
let arrayShow = ref([])
let rowsExist = ref()
let listProduct = ref([])
let pagination = ref({
    rowsPerPage: 0,
  });

const visibleColumns = ref(["numero", "Cantidad de productos", "Total", "Fecha", "options"]);
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


// Default export is a4 paper, portrait, using millimeters for units



const invoiceData = ref({
  customerName: "Juan Pérez",
  customerAddress:"calle 4 #43-56",
  customerPhone:"+57 311 8048146",
  date: "01/06/2024",
  invoiceNumber: "001",
  products: [
    { name: "Producto A", quantity: 2, unitPrice: 50.00 },
    { name: "Producto B", quantity: 1, unitPrice: 30.00 },
    { name: "Producto C", quantity: 3, unitPrice: 20.00 },
  ]
});
function generateInvoice() {
  const doc = new jsPDF();

  // Añadir el logotipo
  const img = new Image();
  img.src = 'logo.png';  // Reemplaza con la ruta de tu logotipo
  doc.addImage(img, 'PNG', 150, 10, 50, 30);  // Ajusta la posición y el tamaño según sea necesario

  // Añadir el encabezado
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURA", 10, 30);

  // Añadir el número de factura y la fecha
  doc.setFontSize(12);
  doc.text(`Factura n.º: ${invoiceData.value.invoiceNumber}`, 10, 40);
  doc.text(`Fecha: ${invoiceData.value.date}`, 10, 45);

  // Añadir la información del cliente
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`${invoiceData.value.customerName}`, 10, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`${invoiceData.value.customerPhone}`, 10, 65);
  doc.text(`${invoiceData.value.customerAddress}`, 10, 70);

  // Separador
  doc.setLineWidth(0.5);
  doc.line(10, 75, 200, 75);

  // Añadir la tabla de productos
  autoTable(doc, {
    startY: 80,
    head: [['Artículo', 'Cantidad', 'Precio', 'Total']],
    body: invoiceData.value.products.map(product => [
      product.name,
      product.quantity,
      `$${product.unitPrice.toFixed(2)}`,
      `$${(product.quantity * product.unitPrice).toFixed(2)}`
    ]),
    styles: { 
      halign: 'center', 
      fontSize: 10,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [230, 230, 230]
    }
  });

  // Calcular el total
  const subtotal = invoiceData.value.products.reduce((sum, product) => sum + (product.quantity * product.unitPrice), 0).toFixed(2);
  const taxes = (subtotal * 0).toFixed(2); // Ajusta la tasa de impuestos según sea necesario
  const total = (parseFloat(subtotal) + parseFloat(taxes)).toFixed(2);

  // Añadir el subtotal, impuestos y total
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal: $${subtotal}`, 150, finalY);
  doc.text(`Impuestos (0%): $${taxes}`, 150, finalY + 5);
  doc.setFontSize(14);
  doc.text(`Total: $${total}`, 150, finalY + 15);

  // Separador
  doc.setLineWidth(0.5);
  doc.line(10, finalY + 25, 200, finalY + 25);

  // Añadir información adicional
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("¡Gracias por su compra!", 10, finalY + 35);
  doc.text("Información de pago:", 10, finalY + 45);
  doc.text("Isabel Mercado", 10, finalY + 50);
  doc.text("El Banquito", 10, finalY + 55);
  doc.text("Cuenta: 0123 4567 89012345", 10, finalY + 60);
  doc.text("Fecha de pago: 2 de junio 2025", 10, finalY + 65);

  doc.text("Contacto:", 150, finalY + 45);
  doc.text("(55)1234-5678", 150, finalY + 50);
  doc.text("hola@sitioincreible.com", 150, finalY + 55);
  doc.text("Calle Cualquiera 123, Cualquier Lugar, CP: 12345", 150, finalY + 60);
  doc.text("www.sitioincreible.com", 150, finalY + 65);

  // Guardar el documento
  doc.save(`Factura_${invoiceData.value.invoiceNumber}.pdf`);
}



const getBill = async () => {
  const res = await storeBilling.GetIBill();
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
        row.index = index + 1;
        
});
     
  }
};



async function ExitsGet() {
  
  const res = await storeExist.GetExits();
 
  if (res && res.status < 299) {
    rowsExist.value = res.data;
    rowsExist.value.forEach((row, index) => {
      if (row.NumBill == numBill.value) {
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
  } 
}


function goInfo(data) {
  arrayEdit.value = data
 
}

function showBillFunc(data) {
  listProduct.value = []
  arrayShow.value = data
  numBill.value = data.numFactura;
  nameSeller.value = data.vendedor;
  nameCustomer.value = data.cliente;
  discount.value = data.Discount;
  amountTotalProdut.value = data.CantProduct;
  totalPrice.value = data.PrecioVenta;
  date.value = data.date.slice(0,10)
  ExitsGet()
}





async function Delete(p) {
  console.log(p);
  
}


async function modalCreaEdit(p) {
  showBill.value = p

  if (p === 1) {
    dialog.value = true
    modalTitle.value = "Crear Factura"
    valEditCrea.value = p
  } 
  else if(p === 2){
   dialog.value = true
    modalTitle.value =  "Editar Factura"
    valEditCrea.value = p
  }
  else {
    dialog.value = true
  }
}

async function activarDesactivar(data) {
  let res = "";
  if (data.state == 1) {
    res = await store.active(data._id, 0);
    getVentas();
  } else {
    res = await store.active(data._id, 1);
    getVentas();
  }
}

onMounted(() => {
  getBill();

});
</script>






<style>
@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: none;
  }

}

/* button delete */

.button {
  width: 43px;
  height: 40px;
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


/* see */




</style>
