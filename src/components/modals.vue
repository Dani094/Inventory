<template>
  <q-card class="w-[400px]">
    <q-card-section class="bg-[#04162d]">
      <h5 class="text-center text-white font-bold p-2 text-xl">
        INGRESA LOS DATOS
      </h5>
    </q-card-section>
    <div class="p-4">
      <q-form ref="myForm" @submit.prevent.stop="InventarioPost()">
        <div class="flex w-full justify-center">
          <div class="w-[45%]">
            <q-input
              type="text"
              v-model="proveedor"
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
              v-model="unidades"
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
              v-model="Copias"
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
              v-if="crearCopias == 'Si'"
              type="number"
              v-model="copias"
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

<script>
import { ref } from "vue";
import { defineProps } from 'vue';

let InventarioPost=ref()

let proveedor=ref('');
let name=ref('');
let serial=ref('');
let unidades=ref(0);
let price=ref(0);
let expirationDate=ref('');
let state=ref('');
let Copias =ref('');
let opCopias=ref(["Sí", "No"])

const props = defineProps({
  proveedor: String,
  name: String,
  serial: String,
  unidades: Number,
  price: Number,
  expirationDate: String,
  state: String,
  copias: Number,
  opcionesCopias: Array,
});
</script>
