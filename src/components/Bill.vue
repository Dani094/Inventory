<template>
  <div>
    <div class=" w-[100%] xs:w-[100%]  p-4 bg-white m-auto rounded-md text-[11px] sm:text-[13px]" id="invoice" >
      <div class="row">
        <div class="col">
          <p class="text-[20px] sm:text-[30px] mt-2 w-[100%]  text-start "> FACTURA </p>
          <ul class="mt-5  text-[16px]">
            <li>Factura n°: 00{{numBill}}</li>
            <li>Fecha: {{date}}</li>
          </ul>
        </div>
        <div class="col">
          <div class=" w-40 h-36 pr-2 float-end">
            <!-- <img class="w-full h-full  " src="/logo.png" alt=""> -->
          </div>
        </div>
      </div>
      <div class="mt-8 mb-4">
        <ul>
          <li><strong>Informacion Cliente:</strong></li>
          <li>Nombre: {{nameCustomer}}</li>
          <li>Telefono: {{numberCustormer}} </li>
          <li>Correo Electronico: {{emailCustomer}}</li>
        </ul>
      </div>
      <div>
        <div class="border-t-2 font-sans border-black  py-2">
          <div class="row mt-2 text-center bg-[#000000] text-white p-2 w-[100%] ">
            <div class="col">Descripcion:</div>
            <div class="col">Cantidad:</div>
            <div class="col">Precio Unitario: </div>
            <div class="col">Total: </div>
          </div>
          <div v-for="(item, index) in listProduct" :key="index">
            <div class="row w-full p-2 text-center border-b border-t border-black-0.4">
              <div class="col mr-1 "> {{ item.name }}</div>
              <div class="col mr-1 "> {{ item.Unidades }} </div>
              <div class="col mr-1 ">$ {{ item.precio }} </div>
              <div class="col mr-1 ">$ {{ item.valueTotal }} </div>
            </div>
          </div>
          <div class="mt-2 bg-black w-full ">
            <ul class="float-end ">
              <li><strong class="text-1xl">Subtotal:</strong>  <strong class="font-normal ml-1 "> $ {{SubTotalBill}}</strong> </li>
              <div class="col mr-1 "> Descuento {{valorDescuento}} {{ descuento }} </div>
              <li>Iva: <strong class="font-normal ml-1"> % {{impuesto}}</strong></li>
              <li>Valor Iva: <strong class="font-normal ml-1"> $ {{valueIva}}</strong></li>
              <li><strong class="text-[15px]">Total:</strong> <strong class="font-bold ml-1"> $ {{totalBill}}</strong> </li>

            </ul>
          </div>
        </div>
      </div>
      <div class="mt-28 font-normal text-[15px]  sm:text-[14px] border-t-2 font-sans border-black  p-4 ">
        <div class="row">
          <div class="col">
            <ul>
              <li class="mb-4">¡Gracias por su compra!</li>
              <li>Informacion de pago: </li>
              <li>Nombre vendedor: {{nameSeller}} </li>
              <li>Empresa: {{nameCompany}}</li>
              <li>Fecha de pago: {{datePay}}</li>
              <li>Metodo de pago: {{MethodPay}}</li>

            </ul>
          </div>
          <div class="col">
            <ul class="float-right mt-8">
              <li>Contacto </li>
              <li>{{userCel}} </li>
              <li>{{userName}}</li>
              <li>{{userAddres}}</li>
              <li>{{userEmail}}</li>
              <li>{{userTown}}</li>
              <li>{{ sitioWeb }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row h-10 mt-20 text-center">
        <div class="col " >
          <hr class="bg-dark h-[1px] w-[80%] m-auto">
          <p>Elaborado por</p>
          
        </div>     
        <div class="col ">
          <hr class="bg-dark h-[1px] w-[80%] m-auto">
          <p>Aceptada, Firma o sello</p>
          
        </div>      
      </div>
      <div class="w-auto mt-8 mb-20 flex text-center justify-center items-center">
          <p class="mr-1 mt-[1px]">Sofware elaborado por Newxo </p> <img class="w-5 h-6" src="../../public/logoNewxo.png" alt="">
      </div>

      <div class="fixed float-end bottom-1  right-[3%] xs:right-[3%]  md:right-[17%] xl:right-[17%]" >
          <q-btn icon="download"   type="submit" @click="generateInvoice()"  class="w-[50px] text-white bg-[#04162d] rounded-1xl" ></q-btn>
      <q-btn icon="cancel"  type="button" class=" text-white bg-red-700 rounded-1xl m-2"  v-close-popup></q-btn>
      </div>
    
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, } from "vue";
  import { billStore } from "../store/billing.js";
  import { usersStore } from "../store/users.js";
  import { exitStore } from "@/store/exits.js";
  import { LoginStore } from "../store/login.js";
  import { jsPDF } from "jspdf";
  import "jspdf-autotable";

  const props = defineProps({
    title: String,
    dataBill: Object,
  })

  const user = usersStore();
  const storeExist = exitStore();
  const storeBilling = billStore();
  const storeLogin = LoginStore();

  let numBill = ref()
  let nameSeller = ref()
  let nameCustomer = ref()
  let emailCustomer = ref()
  let numberCustormer = ref()
  let impuesto = ref()
  let discount = ref()
  let amountTotalProdut = ref()
  let totalPrice = ref()
  let date = ref()
  let arrayShow = ref([])
  let rowsExist = ref()
  let listProduct = ref([])
  let SubTotalBill = ref(0)
  let userName = ref()
  let userDocument = ref()
  let userCel = ref()
  let userAddres = ref()
  let userEmail = ref()
  let userTown = ref()
  let descuento = ref()
  let valorDescuento = ref()
  let sitioWeb = ref()
  let data = ref(props.dataBill)
  let datePay = ref()
  let rows = ref([]);
  let nameCompany = ref("Natural")
  let MethodPay = ref()
  let totalBill = ref()
  let valueIva = ref()
  let img = ref('../../public/logoNewxo.png' )
//   const loadImage = (src) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => resolve(img);
//     img.onerror = (err) => reject(`Error cargando la imagen: ${src}, Error: ${err}`);
//   });
// };

const generateInvoice = async () => {
  try {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Añadir el encabezado con estilos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.text('FACTURA', 10, 30);
    // Añadir el número de factura y la fecha
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Factura n.º: ${numBill.value}`, 10, 40);
    doc.text(`Fecha: ${date.value}`, 10, 45);
    // Añadir la información del cliente
    doc.setFont('helvetica', 'bold');
    doc.text('Información Cliente:', 10, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${nameCustomer.value}`, 10, 65);
    doc.text(`Teléfono: ${numberCustormer.value}`, 10, 70);
    doc.text(`Correo Electrónico: ${emailCustomer.value}`, 10, 75);
    // Separador
    doc.setLineWidth(0.5);
    doc.line(10, 80, 200, 80);
    // Añadir la tabla de productos
    doc.autoTable({
      startY: 85,
      head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Total']],
      body: listProduct.value.map(product => [
        product.name,
        product.Unidades,
        `$${product.precio}`,
        `$${product.valueTotal}`
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
    const subtotal = listProduct.value.reduce((sum, product) => sum + product.valueTotal, 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: $${subtotal}`, 150, finalY);
    doc.text(`Descuento : (${valorDescuento.value}${discount.value})`, 150, finalY + 5);
    doc.text(`Iva : ($${impuesto.value})`, 150, finalY + 10);
    doc.text(`Valor Iva : ($${valueIva.value})`, 150, finalY + 15);
    doc.setFontSize(14);
    doc.text(`Total: $${totalBill.value}`, 150, finalY + 25);

    // Separador
    doc.setLineWidth(0.5);
    doc.line(10, finalY + 30, 200, finalY + 30);

    // Añadir información adicional
    doc.setFontSize(10);
    doc.text('¡Gracias por su compra!', 10, finalY + 40);
    doc.setFont('helvetica', 'normal');
    doc.text('Información de pago:', 10, finalY + 50);
    doc.text(`Nombre vendedor: ${nameSeller.value}`, 10, finalY + 55);
    doc.text(`Método de pago: ${MethodPay.value}`, 10, finalY + 60);
    doc.text(`Empresa: ${nameCompany.value}`, 10, finalY + 65);
    doc.text(`Fecha de pago: ${datePay.value.slice(0, 10)}`, 10, finalY + 70);

    doc.text('Contacto:', 150, finalY + 45);
    doc.text(userCel.value, 150, finalY + 50);
    doc.text(userEmail.value, 150, finalY + 55);
    doc.text(userTown.value, 150, finalY + 60);

    // Dibujar líneas para las firmas
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const lineY = finalY + 110; // Ajusta la posición vertical según sea necesario
    doc.setLineWidth(0.5);
    doc.line(10, lineY, 100, lineY); // Línea 1
    doc.text('Elaborado por', 40, lineY + 5);
    doc.line(115, lineY, 205, lineY); // Línea 2
    doc.text('Aceptada, Firma o sello', 140, lineY + 5);

    // Añadir el pie de página con el segundo logo
    doc.text('Software elaborado por Newxo', 80, lineY + 45);
    const imgData = await fetch(img.value).then(res => res.blob()).then(blob => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    });
    doc.addImage(imgData, 'PNG', 132, lineY + 41, 5, 5); // Posición y tamaño del segundo logo

    // Guardar el documento
    doc.save(`Factura_${numBill.value}.pdf`);
  } catch (error) {
    console.error('Error generando la factura:', error);
  }
};



  const getBill = async () => {
    const res = await storeBilling.GetIBill(storeLogin.Email);
    if (res.status < 299) {
      
      rows.value = res.data;
      rows.value.forEach((row, index) => {
        row.index = index + 1;
      })
    }
  };

  async function ExitsGet() {
    const res = await storeExist.GetExits(storeLogin.Email);
    if (res && res.status < 299) {
      rowsExist.value = res.data;
    }
    showBillFunc()
  }

  function showBillFunc() {
    listProduct.value = []
    arrayShow.value = data.value
    numBill.value = data.value.numFactura;
    nameSeller.value = data.value.vendedor;
    nameCustomer.value = data.value.cliente;
    emailCustomer.value = data.value.email
    numberCustormer.value = data.value.number
    descuento.value = data.value.descuento
    impuesto.value = data.value.impuesto
    amountTotalProdut.value = data.value.CantProduct;
    totalPrice.value = data.value.PrecioVenta;
    date.value = data.value.date.slice(0, 10)
    datePay.value = data.value.datePay.slice(0,10)
    MethodPay.value = data.value.MethodPay

    let descuentoBill = 0    
    getListProduct()
    SubTotalBill.value = listProduct.value.reduce((sum, product) => sum = product.Unidades  * product.precio, 0)
    valueIva.value = (SubTotalBill.value * impuesto.value) / 100; 
    
    
    if (data.value.tipoDescuento == "Porcentaje") {
        valorDescuento.value = "%"
        descuentoBill = (SubTotalBill.value * descuento.value) / 100; 
        totalBill.value =  parseFloat(valueIva.value + SubTotalBill.value - descuentoBill )
    }
    else{
       valorDescuento.value = "$"
       descuentoBill = descuento.value
       totalBill.value =  parseFloat(valueIva.value + SubTotalBill.value - descuentoBill )
    }
  }

  function getListProduct() {
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
          descuento: row.Discount,
          precio: row.Price,
          valueTotal: row.Total,
        });
       
       
      }
    }
    );
  }

  const getUser = async () => {
    const res = await user.GetUsers();
    if (res.status < 299) {
      const data = res.data;
      data.forEach((row, index) => {
        userName.value = row.Names
        userDocument.value = row.Document
        userCel.value = row.Cel
        userAddres.value = row.userAddress
        userEmail.value = row.Email
        userTown.value = row.Municipio
        row.index = index + 1;
      })
    }
  };
  onMounted(() => {
    getBill();
    ExitsGet()
    getUser()

  });
</script>

<style>
  @media (min-width: 600px) {
    .q-dialog__inner--minimized > div {
        max-width: 100%;
        padding: 0px;
    }


}
</style>