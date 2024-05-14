<template>
  <q-card class="w-[400px]">
    <q-card-section class="bg-[#04162d]">
      <h5 class="text-center text-white font-bold p-2 text-xl">
        INGRESA LOS DATOS
      </h5>
    </q-card-section>
    <div class="p-4">
      <q-form ref="myForm" @submit.prevent.stop="InventoryPost()">
        <div class="flex w-full justify-center">
          <div class="w-[45%]">
            <q-input
              type="text"
              v-model="supplier"
              label="Proveedor"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Digite el Proveedor',
              ]"
            />
            <q-input
              type="text"
              v-model="name"
              label="Nombre del Producto"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Digite el Nombre',
              ]"
            />
            <q-input
              type="text"
              v-model="serial"
              label="Serial"
              class="mb-5"
            />
            <q-input
              type="number"
              v-model="units"
              label="Unidades"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Digite las Unidades',
              ]"
            />
          </div>
          <div class="w-[45%] ml-4">
            <q-input
              type="number"
              v-model="price"
              label="Precio Unitario"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Digite el Precio',
              ]"
            />
            <q-input
              type="date"
              v-model="expirationDate"
              label="Fecha de Vencimiento"
              class="mb-5"
            />
            <q-select
              v-model="state"
              :options="states"
              label="Estado"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Escoja el Estado',
              ]"
            />
            <q-select
              v-model="copias"
              :options="opCopias"
              label="¿Copias?"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Escoja la opcion',
              ]"
            />
            <q-input
              v-if="copias == 'Sí'"
              type="number"
              v-model="crearCopias"
              label="Copias"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) ||
                  'Digite la Cantidad de Copias',
              ]"
            />
          </div>
        </div>
        <!-- div botones  -->
        <div class="flex justify-center items-center gap-4">
          <q-btn
            icon="save_as"
            label="GUARDAR"
            :loading="loading"
            type="submit"
            class="text-white bg-green-800 rounded-2xl"
          ></q-btn>
          <q-btn
            icon="cancel"
            type="button"
            class="text-white bg-red-700 rounded-2xl"
            v-close-popup
            >CERRAR
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-card>        
</template>

<script setup>
import { ref,onMounted } from "vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";


const storeInventory = inventoryStore();
const storeLogin = LoginStore();

let loading=ref()

const showModal = ref(false); // Cambiado a ref(false) para que pueda ser modificado desde fuera

const props= defineProps({
  showModal: Boolean
})

let supplier=ref('');
let name=ref('');
let serial=ref('');
let units=ref();
let price=ref();
let expirationDate=ref('');
let state=ref('Disponible');
let states=ref(["Disponible","Agotado", "Oferta"])
let copias =ref('');
let opCopias=ref(["Sí", "No"])
let crearCopias=ref()
let user=ref(storeLogin.Email)


function handleSubmit() {
  // Ejecutar la función que se pasa por prop (en este caso, `inventoryPost`)
  inventoryPost();
}


async function InventoryPost() {
  loading.value = true;
  await storeInventory.PostInventory(
    supplier.value,
    name.value,
    serial.value,
    units.value,
    price.value,
    expirationDate.value,
    state.value,
    user.value
  );
  if (crearCopias.value >= 1) {
    // Crea una copia del elemento sin duplicar el serial
    const itemToDuplicate = {
      Supplier: supplier.value,
      Name: name.value,
      Serial: serial.value,
      Units: units.value,
      Price: price.value,
      ExpirationDate: expirationDate.value,
      State: state.value,
      UserEmail: user.value
    };
    for (let i = 0; i < crearCopias.value; i++) {
      const duplicatedItem = {
        ...itemToDuplicate,
      };
      // Realiza la petición al servidor para guardar la duplicación
      await storeInventory.PostInventory(
        duplicatedItem.Supplier,
        duplicatedItem.Name,
        duplicatedItem.Serial,
        duplicatedItem.Units,
        duplicatedItem.Price,
        duplicatedItem.ExpirationDate,
        duplicatedItem.State,
        duplicatedItem.UserEmail
      );
    }
  }
  showModal.value = false;
  // search();
  loading.value = false;
}



onMounted(() => {
  // setInterval(() => {
  //   console.log(showModal.value);
  // }, 2000);
});
</script>
