<template>
  <q-card class="w-[400px]">
    <q-card-section class="bg-[#04162d]">
      <h5 class="text-center text-white font-bold p-2 text-xl">
        DILIGENCIA LA INFORMACIÓN
      </h5>
    </q-card-section>
    <div class="py-4">
      <q-form ref="myForm" @submit.prevent.stop="InventarioPost()">
        <div class="flex justify-center">
          <div class="">
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
            <q-select
              v-model="categoria"
              :options="categorias"
              label="Categoria"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Escoja La Categoria',
              ]"
            />
            <q-input
              type="text"
              v-model="modelo"
              label="Modelo"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Digite el Modelo',
              ]"
            />
            <q-input
              type="text"
              v-model="serial"
              label="Serial"
              style="margin-bottom: 20px"
            />
            <q-input
              type="number"
              v-model="idInvent"
              label="ID"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Dijite el ID',
              ]"
            />
          </div>
          <div>
            <q-select
              v-model="estadoFisico"
              :options="estadosFisico"
              label="Estado Físico"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Escoja el Estado Físico',
              ]"
            />
            <q-input
              type="number"
              v-model="unidades"
              label="Unidades"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Digite las Unidades',
              ]"
            />
            <q-input
              type="number"
              v-model="precio"
              label="Precio Unitario"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Digite el Precio',
              ]"
            />
            <q-select
              v-model="estado"
              :options="estados"
              label="Estado"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'Escoja el Estado',
              ]"
            />
            <q-select
              v-model="crearCopias"
              :options="opExiste"
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
              v-model="existencias"
              label="Copias"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) ||
                  'Digite la Cantidad de Existencias',
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

let showModal = ref(false);
let InventarioPost=ref()
</script>
