<template>
  <q-table
    flat
    :separator="'cell'"
    bordered
    :rows="rows"
    :columns="columns"
    row-key="index"
    virtual-scroll
    v-model:pagination="pagination"
    class="inventTable h-[550px] lg:h-[750px] rounded-2xl"
    :filter="filter"
    @focusin="activateNavigation"
    @focusout="deactivateNavigation"
    @keydown="onKey"
  >
    <template v-slot:top-left>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Buscar"
        class="bg-[#E7E8F3] w-full pl-4 pr-4 rounded-lg outline-none">
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>
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
            @click="
              (index = props.row._id), goInfo(props.row), (promptEdit = true)">
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
import { ref, nextTick, toRaw } from "vue";

let pagination = { rowsPerPage: 50 };
let rows = ref([]);
let columns = ref();
let filter = ref("");
const tableRef = ref(null);
const navigationActive = ref(false);
const selected = ref([]);

const activateNavigation = () => {
  navigationActive.value = true;
};

const deactivateNavigation = () => {
  navigationActive.value = false;
};

const onKey = (evt) => {
  if (
    navigationActive.value !== true ||
    [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
    tableRef.value === null
  ) {
    return;
  }

  evt.preventDefault();

  const { computedRowsNumber, computedRows } = tableRef.value;

  if (computedRows.length === 0) {
    return;
  }

  const currentIndex =
    selected.value.length > 0
      ? computedRows.indexOf(toRaw(selected.value[0]))
      : -1;
  const currentPage = pagination.value.page;
  const rowsPerPage =
    pagination.value.rowsPerPage === 0
      ? computedRowsNumber
      : pagination.value.rowsPerPage;
  const lastIndex = computedRows.length - 1;
  const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

  let index = currentIndex;
  let page = currentPage;

  switch (evt.keyCode) {
    case 36: // Home
      page = 1;
      index = 0;
      break;
    case 35: // End
      page = lastPage;
      index = rowsPerPage - 1;
      break;
    case 33: // PageUp
      page = currentPage <= 1 ? lastPage : currentPage - 1;
      if (index < 0) {
        index = 0;
      }
      break;
    case 34: // PageDown
      page = currentPage >= lastPage ? 1 : currentPage + 1;
      if (index < 0) {
        index = rowsPerPage - 1;
      }
      break;
    case 38: // ArrowUp
      if (currentIndex <= 0) {
        page = currentPage <= 1 ? lastPage : currentPage - 1;
        index = rowsPerPage - 1;
      } else {
        index = currentIndex - 1;
      }
      break;
    case 40: // ArrowDown
      if (currentIndex >= lastIndex) {
        page = currentPage >= lastPage ? 1 : currentPage + 1;
        index = 0;
      } else {
        index = currentIndex + 1;
      }
      break;
  }

  if (page !== pagination.value.page) {
    pagination.value.page = page;

    nextTick(() => {
      const { computedRows } = tableRef.value;
      selected.value = [computedRows[Math.min(index, computedRows.length - 1)]];
      tableRef.value.$el.focus();
    });
  }
};
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
