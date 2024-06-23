<template>
  <div>
    <div class=" w-[70%] xs:w-[100%] min-h-[90vh] pt-4 px-2 bg-white m-auto" @click=" printPage()">
      <div class="row">
        <div class="col">
          <p class="text-[20px] sm:text-[40px] mt-4 w-[100%]  text-start "> FACTURA </p>
          <ul class="mt-5  text-[16px]">
            <li>Factura n°: 00{{numBill}}</li>
            <li>Fecha: {{date}}</li>
          </ul>
        </div>
        <div class="col">
          <div class=" w-22 h-28 pr-8 float-end">
            <img class="w-full h-full " src="../assets/logoNewxo.png" alt="">
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
          <div class="row mt-2 text-center bg-[#000000] text-white p-2 w-[100%]  ">
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
              <div class="col mr-1 "> Tipo Descuento {{ tipoDescuento }} </div>
              <div class="col mr-1 "> Descuento {{ descuento }} </div>
              <li>Iva: <strong class="font-normal ml-1"> $ {{impuesto}}</strong></li>
              <li>Subtotal: <strong class="font-normal ml-1"> $ {{SubTotalBill}}</strong> </li>
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
            <ul class="float-right mt-8">
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
      <div class="row h-10 mt-20 text-center">
        <div class="col " >
          <hr class="bg-dark h-[1px] w-[80%] m-auto">
          <p>Firma Encargado</p>
          
        </div>     
        <div class="col ">
          <hr class="bg-dark h-[1px] w-[80%] m-auto">
          <p>Firma Cliente</p>
          
        </div>      
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, } from "vue";
  import { billStore } from "../store/billing.js";
  import { useModalStore } from "../store/storeModal.js"
  import { sweetDelete } from "@/Global/notify"
  import { usersStore } from "../store/users.js";
  import { exitStore } from "@/store/exits.js";
  import { LoginStore } from "../store/login.js";

  const props = defineProps({
    title: String,
    dataBill: Object,
  })

  const user = usersStore();
  const storeExist = exitStore();
  const storeM = useModalStore()
  const storeBilling = billStore();
  const storeLogin = LoginStore();

  let arrayEdit = ref()
  let valEditCrea = ref()
  let modalTitle = ref()
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

  let rows = ref([]);
  function printPage() {
    window.print();

  }
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
    impuesto.value = data.value.impuesto
    amountTotalProdut.value = data.value.CantProduct;
    totalPrice.value = data.value.PrecioVenta;
    date.value = data.value.date.slice(0, 10)
    getListProduct()
    console.log(totalPrice.value, discount.value);
    SubTotalBill.value = parseFloat(totalPrice.value - discount.value)
    console.log(SubTotalBill.value);
  }

  function getListProduct() {
    console.log(rowsExist.value);
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
      console.log(data);
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
    }
}
</style>