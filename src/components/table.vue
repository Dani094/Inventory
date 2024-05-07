<template>
  <q-table
    flat
    bordered
    :rows="rows"
    :columns="columns"
    row-key="index"
    virtual-scroll
    v-model:pagination="pagination"
    class="inventTable h-[550px] lg:h-[750px] rounded-2xl">
    <!-- opciones  -->
    <template v-slot:body-cell-options="props">
      <q-td :props="props">
        <div class="text-white">
          <q-btn
            round
            icon="edit"
            class="q-mx bg-[#04162d]"
            size="xs"
            title="Editar"
            @click="(index = props.row._id), goInfo(props.row), (promptEdit = true)">
          </q-btn>
          <q-btn
            round
            icon="remove_circle_outline"
            class="q-mx-md bg-[#FF0000]"
            size="xs"
            title="Salida"
            @click="
              (index = props.row._id),
                goInfo2(props.row),
                (promptSalida = true),
                limpiar()">
          </q-btn>
          <q-btn
            round
            icon="delete"
            class="q-mx bg-[#04162d]"
            size="xs"
            title="Borrar"
            @click="(promptEliminar = true), (inventarioId = props.row)"
          ></q-btn> 
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";

let pagination = ref({
  rowsPerPage: 50,
});

let rows = ref([]);
let columns=ref()
</script>

<style>
.inventTable tr th {
  position: sticky;
  background: #04162d;
  color: white;
}
.inventTable thead tr:first-child th {
  top: 0;
  z-index: 1;
}
</style>
