<template>
  <div class="lg:p-20 p-6 bg-[#f8fafc] min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
<!-- --------------------------------------------------------------------------------------
      TITLE
-------------------------------------------------------------------------------------- -->
      <div>
        <h1 class="text-[#1a2332] text-4xl font-black tracking-tight flex items-center gap-2">
          <div class="w-2 h-8 bg-[#40d124] rounded-full"></div>
          INVENTARIO
        </h1>
        <p class="text-gray-400 text-sm mt-1 ml-4 italic">Gestión de activos y stock en tiempo real</p>
      </div>

<!-- --------------------------------------------------------------------------------------
      BUTTON
-------------------------------------------------------------------------------------- -->
      <div class="flex items-center gap-3">
        <Report :inventory="true" />
        <button 
          @click="(showModal = true), cleanForm()"
          class="flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-bold rounded-[10px] shadow-sm hover:bg-green-700 transition-all text-sm cursor-pointer"
               >
            <span class="material-icons text-base ">add</span>
          Agregar
          
        </button>
      </div>
    </div>

<!-- --------------------------------------------------------------------------------------
      cards info
-------------------------------------------------------------------------------------- -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-blue-50 p-4 rounded-2xl">
          <span class="material-icons text-blue-600">inventory_2</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total de productos</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ TotalUnits?.toLocaleString() }}</h3>
        </div>
      </div> 

      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-blue-50 p-4 rounded-2xl">
          <span class="material-icons text-red-600">running_with_errors</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Productos vencidos</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ expiredProducts?.toLocaleString() }}</h3>
        </div>
      </div>

      <div class="bg-white p-6 rounded-[1rem] border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="bg-blue-50 p-4 rounded-2xl">
          <span class="material-icons text-yellow-600">money</span>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Productos agotados</p>
          <h3 class="text-2xl font-black text-[#1a2332]">{{ outOfStockProducts?.toLocaleString() }}</h3>
        </div>
      </div>
    </div>



<!-- --------------------------------------------------------------------------------------
      TABLE
-------------------------------------------------------------------------------------- -->
    <div class="bg-white rounded-[1rem] border border-gray-200 shadow-sm overflow-hidden">

      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div class="relative w-full md:w-80">
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            v-model="filter"
            type="text" 
            placeholder="Buscar"
            class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-[10px] outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500 transition-all text-sm"
          ></div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50/50 text-[10px] font-bold uppercase tracking-wider text-center text-gray-400">
              <th class="px-4 py-4">Proveedor</th>
              <th class="px-4 py-4">Nombre</th>
              <th class="px-4 py-4">Cantidad</th>
              <th class="px-4 py-4">Precio Unidad Compra</th>
              <th class="px-4 py-4">Precio Unidad Venta</th>
              <th class="px-4 py-4">Total Compra</th>
              <th class="px-4 py-4">Total venta</th>
              <th class="px-4 py-4">category</th>
              <th class="px-4 py-4">Estado</th>
              <th class="px-4 py-4">Opciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in filteredRows" :key="row._id" class="hover:bg-gray-50/50 transition-colors group text-center">
              <td class="px-1  py-4">
                <div class="flex flex-col">
                  <span class="font-bold text-[11px] text-black uppercase"> {{ row.Supplier?.Name || 'Sin porveedor' }}</span>
                  <span class="text-[12px] text-gray-400 italic">Vence: {{ row.ExpirationDate ? row.ExpirationDate.slice(0, 10) : 'N/A' }}</span>
                </div>
              </td>
              <td class="px-1  py-4">
                <div class="flex flex-col text-[12px] text-gray-600">
                  <span class="font-medium text-gray-700">{{ row.Name }}</span>
                  <span class="text-[12px] font-mono text-gray-400 uppercase tracking-tighter">{{ row.Serial || 'Sin Serial' }}</span>
                </div>
              </td>
              <td class="px-1  py-4">
                <div class="flex items-center justify-center gap-2">
                  <div :class="getStockColor(row.Units)" class="w-2.5 h-2.5 rounded-full"></div>
                  <span class="font-bold text-[#1a2332] text-[12px]">{{ row.Units.toLocaleString() }} {{ row.unit_measurement || 'unidades' }}</span>
                </div>
              </td>
              <td class="px-1  py-4 font-bold text-[#1a2332]">
                $ {{ Number(row.PriceBuy).toLocaleString()}}
              </td>
              <td class="px-1  py-4 font-bold text-[#1a2332]">
                $ {{ Number(row.PriceSale).toLocaleString()}}
              </td>
              <td class="px-1  py-4 ">
                <span class=" text-orange-500 bg-blue-50 px-3 py-1.5 rounded-xl text-[12px]">
                  $ {{ (row.PriceBuy * row.Units).toLocaleString() }}
                </span>
              </td>
              <td class="px-1  py-4">
                <span class=" text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl text-[12px]">
                  $ {{ (row.PriceSale * row.Units).toLocaleString() }}
                </span>
              </td>
              <td class="px-1  py-4">
                <span class="text-[12px] text-gray-600 font-bold">
                  {{ row.category_id?.name || 'Sin categoría' }}
                </span>
              </td>
              <td class="py-4">
                <span :class="getStateBadge(row.State)" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border">
                  {{ row.State }}
                </span>
              </td>
              <td class="px-1  py-4">
                <div class="flex justify-center items-center gap-2">
                  <button @click="inputStock(row)" class="p-2 hover:bg-green-50 text-green-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">add</span>
                  </button>
                  <button @click="openEdit(row)" class="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">edit</span>
                  </button>
                  <button @click="openExit(row)" class="p-2 hover:bg-orange-50 text-orange-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">sell</span>
                  </button>
                  <button @click="deleteItem(row)" class="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors">
                    <span class="material-icons text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 px-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
        
        <!-- Selector de cantidad por página e indicador -->
        <div class="flex items-center gap-3">
          <span>Mostrar:</span>
          <select 
            v-model="itemsPerPage" 
            @change="currentPage = 1"
            class="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 outline-none text-gray-700 font-bold focus:border-blue-500 cursor-pointer"
          >
            <option :value="4">4</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          <span>
            Mostrando {{ (currentPage - 1) * itemsPerPage + (rows.length ? 1 : 0) }} - 
            {{ Math.min(currentPage * itemsPerPage, totalRecords) }} 
            de {{ totalRecords }} registros
          </span>
        </div>

        <!-- Botones de Navegación -->
        <div class="flex items-center gap-2">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="flex items-center justify-center p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <span class="material-icons text-base">chevron_left</span>
          </button>

          <span class="px-3 font-bold text-[#1a2332]">
            Página {{ currentPage }} de {{ totalPages }}
          </span>

          <button 
            @click="nextPage" 
            :disabled="currentPage >= totalPages"
            class="flex items-center justify-center p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <span class="material-icons text-base">chevron_right</span>
          </button>
        </div>

      </div>
    </div>


<!-- --------------------------------------------------------------------------------------
      MODAL ADD
-------------------------------------------------------------------------------------- -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="closeModal"></div>
    <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
      <div class="bg-[#1a2332] p-6 text-white flex justify-between text-xl items-center">
        <h3 class="font-black uppercase tracking-tight text-center">Agregar producto</h3>
        <button @click="showModal = false" class="hover:text-purple-400 transition-colors">
          <span class="material-icons">close</span>
        </button>
      </div>

      <form @submit.prevent="InventoryPost" novalidate class="p-8 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          
          <!-- Serial -->
          <div>
            <input 
              v-model="serial" 
              @input="errors.serial = ''"
              placeholder="Serial *" 
              type="text" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.serial ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.serial" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.serial }}</p>
          </div>

          <!-- Nombre -->
          <div>
            <input 
              v-model="name" 
              @input="errors.name = ''"
              placeholder="Nombre *" 
              type="text" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.name ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.name" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.name }}</p>
          </div>

          <!-- Stock Mínimo -->
          <div>
            <input 
              v-model.number="minStock" 
              @input="errors.minStock = ''"
              type="number" 
              placeholder="Stock mínimo *" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.minStock ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.minStock" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.minStock }}</p>
          </div>

          <!-- Unidades -->
          <div>
            <input 
              v-model.number="units" 
              @input="errors.units = ''"
              placeholder="Unidades *" 
              type="number" 
              step="any" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.units ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.units" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.units }}</p>
          </div>

          <!-- Unidad de Medida -->
          <div>
            <select 
              v-model="unit_measurement" 
              @change="errors.unit_measurement = ''"
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border text-gray-600', errors.unit_measurement ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
              <option value="" disabled>Unidad de medida *</option>
              <option v-for="opcion in opcionesUnidad" :key="opcion.value" :value="opcion.value">
                {{ opcion.label }}
              </option>
            </select>
            <p v-if="errors.unit_measurement" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.unit_measurement }}</p>
          </div>

          <!-- Categoría -->
          <div>
            <select 
              v-model="categoryId" 
              @change="errors.categoryId = ''"
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border text-gray-600 cursor-pointer', errors.categoryId ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
              <option value="" disabled>Seleccione categoría *</option>
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
            <p v-if="errors.categoryId" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.categoryId }}</p>
          </div>

          <!-- Precio Compra -->
          <div>
            <input 
              v-model.number="priceBuy" 
              @input="errors.priceBuy = ''"
              placeholder="Precio Compra *" 
              type="number" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.priceBuy ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.priceBuy" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.priceBuy }}</p>
          </div>

          <!-- Precio Venta -->
          <div>
            <input 
              v-model.number="priceSale" 
              @input="errors.priceSale = ''"
              placeholder="Precio Venta *" 
              type="number" 
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.priceSale ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.priceSale" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.priceSale }}</p>
          </div>

          <!-- Copias -->
          <div>
            <select v-model="copias" @change="errors.crearCopias = ''" class="w-full bg-gray-50 rounded-2xl p-3 border-none text-sm text-gray-600 outline-none">
              <option value="" disabled>¿Copias?</option>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>

          <!-- Cantidad Copias (Condicional) -->
          <div v-if="copias === 'Sí'">
            <input 
              v-model.number="crearCopias" 
              @input="errors.crearCopias = ''"
              placeholder="Cantidad de copias *" 
              type="number" 
              min="1"
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border', errors.crearCopias ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
            <p v-if="errors.crearCopias" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.crearCopias }}</p>
          </div>

          <!-- Proveedor -->
          <div>
            <select 
              v-model="supplier" 
              @change="errors.supplier = ''"
              :class="['w-full rounded-2xl p-3 text-sm outline-none transition-all border text-gray-600 cursor-pointer', errors.supplier ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent focus:ring-2 focus:ring-purple-500/20']"
            >
              <option value="" disabled>Seleccione proveedor *</option>
              <option v-for="item in suppliersList" :key="item._id" :value="item._id">
                {{ item.Name }}
              </option>
            </select>
            <p v-if="errors.supplier" class="text-red-500 text-[11px] mt-1 font-medium pl-2">{{ errors.supplier }}</p>
          </div>

          <!-- Fecha Vencimiento -->
          <div class="flex flex-col bg-gray-50 rounded-2xl p-2 justify-center border border-transparent">
            <span class="text-[10px] text-gray-400 pl-1 font-semibold uppercase tracking-wider">Fecha de Vencimiento</span>
            <input 
              v-model="expirationDate" 
              type="date" 
              class="bg-transparent border-none text-sm text-gray-600 p-0 focus:ring-0 w-full outline-none"
            >
          </div>  

          <!-- Descripción -->
          <div class="col-span-2">
            <textarea 
              v-model="description" 
              placeholder="Descripción del producto..." 
              class="w-full bg-gray-50 rounded-2xl p-3 border-none text-sm outline-none resize-none h-20"
            ></textarea>
          </div>

        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-[#1a2332] text-white font-bold py-3 rounded-2xl hover:bg-purple-600 transition-colors disabled:opacity-50 mt-4 cursor-pointer"
        >
          {{ loading ? 'GUARDANDO...' : 'GUARDAR' }}
        </button>
      </form>
    </div>
  </div>
  <!-- --------------------------------------------------------------------------------------
      MODAL EDIT
-------------------------------------------------------------------------------------- -->
    <div v-if="showModalEdit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalEdit = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-[#1a2332] p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Editar Producto</h3>
          <button @click="showModalEdit = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="InventoryPut" class="p-8 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input v-model="serial" placeholder="Serial" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="name" placeholder="Nombre" type="text" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="units" placeholder="Unidades" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="priceBuy" placeholder="Precio de Compra" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <input v-model="minStock" placeholder="stock minimo" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
             <select 
              v-model="categoryId" 
              class="bg-gray-50 rounded-2xl p-3 border-none text-sm text-gray-500 cursor-pointer focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="" disabled>Seleccione una categoría...</option>
              <option 
                v-for="cat in categories" 
                :key="cat._id" 
                :value="cat._id"
              >
                {{ cat.name }} <!-- O cat.nombre -->
              </option>
            </select>
               <select 
              v-model="supplier" 
              class="bg-gray-50 rounded-2xl p-3 border-none text-sm text-gray-500 cursor-pointer focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="" disabled>Seleccione un proveedor...</option>
              <option 
                v-for="item in suppliersList" 
                :key="item._id" 
                :value="item._id" 
              >
                {{ item.Name }} <!-- O item.company_name, dependiendo de cómo lo llame tu backend -->
              </option>
            </select>
            <input v-model="priceSale" placeholder="Precio de Venta" type="number" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <select v-model="unit_measurement" class="bg-gray-50 rounded-2xl p-3 border-none text-sm text-gray-500" >
              <option value="" disabled>Seleccione una unidad...</option>
              <option 
                v-for="opcion in opcionesUnidad" 
                :key="opcion.value" 
                :value="opcion.value"
              >
                {{ opcion.label }}
              </option>
            </select>
            <input v-model="expirationDate" placeholder="Fecha de Vencimiento" type="date" class="bg-gray-50 rounded-2xl p-3 border-none text-sm">
            <textarea v-model="description" placeholder="Descripción" class="bg-gray-50 rounded-2xl p-3 border-none text-sm"></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl">ACTUALIZAR</button>
        </form>
      </div>
    </div>

<!-- --------------------------------------------------------------------------------------
      MODAL add stock
-------------------------------------------------------------------------------------- -->    

    <div v-if="showModalInputStock" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalInputStock = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-orange-600 p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Registrar Entrada</h3>
          <button @click="showModalInputStock = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="StockPut" class="p-8 space-y-4">
          <div class="p-3 bg-orange-50 rounded-xl text-orange-700 text-xs font-bold mb-10">{{ nameProduct }}</div>
          <div class="grid grid-cols-2 gap-1 ">
            <label class="" for="">Cantidad:</label>
            <label class="" for="">Descripción:</label>
            <input step="any" v-model.number="unitsStock" placeholder="Cantidad" type="number" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">            
            <input  v-model="description" placeholder="Descripción" type="text" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
          </div>
          <div class="text-left bg-orange-600/10 p-3 rounded-xl text-orange-700 text-xs font-bold mb-10">
            <p>Stock Actual: {{ units2 + unitsStock }}</p>
        </div>
          <button type="submit" class="w-full bg-orange-600 text-white font-bold py-3 rounded-2xl">CONFIRMAR</button>
        </form>
      </div>
    </div>

<!-- --------------------------------------------------------------------------------------
      MODAL Exits
-------------------------------------------------------------------------------------- -->
    <div v-if="showModalExits" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#04162d]/40 backdrop-blur-sm" @click="showModalExits = false"></div>
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl z-10 overflow-hidden animate-modal">
        <div class="bg-orange-600 p-6 text-white flex justify-between">
          <h3 class="font-black uppercase tracking-tight">Registrar Salida</h3>
          <button @click="showModalExits = false"><span class="material-icons">close</span></button>
        </div>
        <form @submit.prevent="ExitsPost" class="p-8 space-y-4">
          <div class="p-3 bg-orange-50 rounded-xl text-orange-700 text-xs font-bold mb-10">{{ nameExit }}</div>
          <div class="grid grid-cols-3 gap-1 ">
            <label class="" for="">Cantidad:</label>
            <label class="" for="">Descuento:</label>
            <label class="" for="">Descripción:</label>
            <input step="any" v-model.number="unitsExit" placeholder="Cantidad" type="number" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
            <input step="any" v-model.number="discount" placeholder="Descuento" type="number" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
            
            <input v-model="descriptionExit" placeholder="Descripción" type="text" class="bg-gray-100 rounded-2xl p-3 border-none text-sm">
          </div>
          <div class="text-left bg-orange-600/10 p-3 rounded-xl text-orange-700 text-xs font-bold mb-10">
            <p>Stock Actual: {{ units2 - unitsExit }}</p>
            <p>Precio Unitario: $ {{ priceExit }}</p>
          <h4 class="text-xl font-black ">
            $ {{ Math.max(0, (unitsExit * priceExit) - discount).toLocaleString('es-CO') }}
          </h4>
        </div>
          <button type="submit" class="w-full bg-orange-600 text-white font-bold py-3 rounded-2xl">CONFIRMAR</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Report from "@/components/descargarExcel.vue";
import { inventoryStore } from "@/store/inventory.js";
import { LoginStore } from "../store/login.js";
import { exitStore } from "../store/exits.js";
import { categoryStore } from "../store/category.js";
import { supplierStore } from "../store/supplier.js";
import { sweetDelete } from "@/Global/notify";

// stores
const storeInventory = inventoryStore();
const storeLogin = LoginStore();
const storeExits = exitStore();
const storeCategory = categoryStore();
const storeSupplier = supplierStore();

// Visibilidad de Modales
let showModal = ref(false);
let showModalEdit = ref(false);
let showModalExits = ref(false);
let showModalInputStock = ref(false);
let loading = ref(false);
let filter = ref("");

// Listas reactivas para selects
const categories = ref([]);
const suppliersList = ref([]);

// Variables de Formulario
let index = ref();
let supplier = ref("");
let categoryId = ref("");
let name = ref("");
let serial = ref("");
let units = ref();
let priceBuy = ref();
let priceSale = ref();
let expirationDate = ref();
let description = ref("");
let state = ref("Disponible");
let user = ref(storeLogin.Email);
let copias = ref("");
let crearCopias = ref(0);
let unit_measurement = ref("");
let measurement_type = ref("");
let minStock = ref(0);

// Variables Salidas
let nameExit = ref("");
let serialExit = ref("");
let units2 = ref(0);
let unitsExit = ref(0);
let priceExit = ref(0);
let discount = ref(0);
let unit_measurementExit = ref("");
let descriptionExit = ref("");
let rows = ref([]);
let TotalUnits = ref(0);
let expiredProducts = ref(0);
let outOfStockProducts = ref(0);

// Variables Entrada de Stock
let nameProduct = ref("");
let serialProduct = ref("");
let unitsStock = ref(0);

// Variables paginación
const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalPages = ref(1);
const totalRecords = ref(0);


// Estado de Errores
const errors = ref({});


/**
 * Valida todos los campos antes de realizar el POST
 */
function validateForm() {
  const errs = {};

  if (!serial.value || !serial.value.trim()) errs.serial = 'Requerido';
  if (!name.value || !name.value.trim()) errs.name = 'Requerido';
  
  if (minStock.value === null || minStock.value < 0) {
    errs.minStock = 'Mínimo 0';
  }
  
  if (!units.value || units.value <= 0) {
    errs.units = 'Debe ser mayor a 0';
  }

  if (!unit_measurement.value) errs.unit_measurement = 'Seleccione una opción';
  if (!categoryId.value) errs.categoryId = 'Seleccione categoría';
  if (!supplier.value) errs.supplier = 'Seleccione proveedor';

  if (!priceBuy.value || priceBuy.value <= 0) {
    errs.priceBuy = 'Precio inválido';
  }

  if (!priceSale.value || priceSale.value <= 0) {
    errs.priceSale = 'Precio inválido';
  } else if (priceSale.value < priceBuy.value) {
    errs.priceSale = 'No debe ser menor a compra';
  }

  if (copias.value === 'Sí' && (!crearCopias.value || crearCopias.value < 1)) {
    errs.crearCopias = 'Mínimo 1 copia';
  }

  errors.value = errs;
  return Object.keys(errs).length === 0;
}




const opcionesUnidad = ref([
  { label: 'Unidades (und)', value: 'und', tipo: 'unidad' },
  { label: 'Kilogramos (kg)', value: 'kg', tipo: 'peso' },
  { label: 'Gramos (g)', value: 'g', tipo: 'peso' },
  { label: 'Litros (l)', value: 'l', tipo: 'volumen' },
  { label: 'Mililitros (ml)', value: 'ml', tipo: 'volumen' }
]);

const getMeasurementType = (unit) => {
  const map = {
    kg: 'peso',
    g: 'peso',
    l: 'volumen',
    ml: 'volumen',
    und: 'unidad',
    uni: 'unidad'
  };
  return map[unit] || 'unidad';
};

watch(
  () => unit_measurement.value,
  (newUnit) => {
    measurement_type.value = getMeasurementType(newUnit);
  }
);

const filteredRows = computed(() => rows.value);

// Funciones de Modales
function openEdit(row) {
  index.value = row._id;
  goInfo(row);
  showModalEdit.value = true;
}

function openExit(row) {
  index.value = row._id;
  goInfo2(row);  
  showModalExits.value = true;
}

function inputStock(row) {
  index.value = row._id;
  goInfo3(row);
  showModalInputStock.value = true;
}

const getStockColor = (u) => u <= 0 ? 'bg-rose-500 animate-pulse' : (u < 10 ? 'bg-amber-500' : 'bg-emerald-500');

const getStateBadge = (s) => s === 'Disponible' 
  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
  : 'bg-rose-50 text-rose-700 border-rose-100';

// API: Obtener Inventario con paginación
async function InventoryGet() {
  try {
    const res = await storeInventory.GetInventory(storeLogin.Email, {
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: filter.value
    });
    if (res?.status < 299) {
      rows.value = res.data.products;
     
      
      TotalUnits.value = res.data.statistics.totalProducts;
      expiredProducts.value = res.data.statistics.expiredProducts;
      outOfStockProducts.value = res.data.statistics.outOfStockProducts;

      if (res.data.pagination) {
        totalPages.value = res.data.pagination.totalPages;
        totalRecords.value = res.data.pagination.totalRecords;
      }
    }
  } catch (error) {
    console.error("Error al obtener inventario:", error);
  }
}

// API: Obtener Categorías reactivas
async function getCategories() {
  try {
    const res = await storeCategory.GetCategories(storeLogin.Email, {});
    categories.value = res.data?.categories || [];
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    categories.value = [];
  }
}

// API: Obtener Proveedores reactivos
async function getSuppliers() {
  try {
    const res = await storeSupplier.GetSuppliers(storeLogin.Email);
    suppliersList.value = res.data?.suppliers || [];
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
    suppliersList.value = [];
  }
}

// Carga inicial en paralelo optimizada
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    InventoryGet(),
    getCategories(),
    getSuppliers()
  ]);
  loading.value = false;
});

// Paginación y Watchers
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch([currentPage, itemsPerPage], () => {
  InventoryGet();
});

let filterTimeout;
watch(filter, () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    currentPage.value = 1;
    InventoryGet();
  }, 300);
});

async function InventoryPost() {
  if (!validateForm()) return;

  loading.value = true;
  await storeInventory.PostInventory(supplier.value, name.value, units.value, priceBuy.value, priceSale.value, expirationDate.value, user.value, unit_measurement.value, measurement_type.value, description.value, serial.value, minStock.value, categoryId.value); 
  
  if (crearCopias.value >= 1) {
    for (let i = 0; i < crearCopias.value; i++) {
      await storeInventory.PostInventory(supplier.value, name.value, units.value, priceBuy.value, priceSale.value, expirationDate.value, user.value, unit_measurement.value, measurement_type.value, description.value, serial.value, minStock.value, categoryId.value);
    }
  }
  showModal.value = false;
  errors.value = {};
  InventoryGet();
  loading.value = false;
}

async function InventoryPut() {
  console.log("Actualizando serial con ID:", serial.value);
  loading.value = true;
  await storeInventory.PutInventory(index.value, supplier.value, name.value, units.value, priceBuy.value, priceSale.value, expirationDate.value, user.value, unit_measurement.value, measurement_type.value, description.value, measurement_type.value, serial.value, minStock.value);
  showModalEdit.value = false;
  InventoryGet();
  loading.value = false;
}

async function StockPut() {
  loading.value = true;
  await storeInventory.PutStockInventory(index.value, unitsStock.value, user.value);
  showModalInputStock.value = false;
  InventoryGet();
  loading.value = false;
}

async function ExitsPost() {
  const cantSalida = Number(unitsExit.value);
  const stockActual = Number(units2.value);

  if (cantSalida <= 0 || cantSalida > stockActual) {
    alert("Cantidad no válida o stock insuficiente");
    return;
  }

  loading.value = true;
  try {
    await storeExits.PostExits({
      IdProduct: index.value,
      NumBill: null,
      Name: nameExit.value,
      Units: parseFloat(unitsExit.value),
      Price: parseFloat(priceExit.value),
      description: descriptionExit.value,
      Discount: parseFloat(discount.value),
      UserEmail: user.value,
      Serial: serialExit.value,
      unit_measurement: unit_measurementExit.value
    });
    await storeInventory.PutUnits(index.value, -cantSalida);
    showModalExits.value = false;     
    await InventoryGet(); 
    cleanForm();
  } catch (error) {
    console.error("Error en el proceso de salida:", error);
    alert("Hubo un error al descontar del inventario");
  } finally {
    loading.value = false;
  }
}

async function deleteItem(data) {
  sweetDelete(data, async () => {
    await storeInventory.DeleteInventory(data._id);
    InventoryGet();
  });
}

function goInfo(data) {
  console.log(data);
  
  supplier.value = typeof data.Supplier === 'object' ? data.Supplier?._id : data.Supplier; 
  categoryId.value = typeof data.category_id === 'object' ? data.category_id?._id : data.category_id;
  name.value = data.Name; 
  serial.value = data.Serial;
  units.value = data.Units; 
  priceBuy.value = data.PriceBuy; 
  priceSale.value = data.PriceSale; 
  expirationDate.value = data.ExpirationDate ? data.ExpirationDate.slice(0, 10) : ""; 
  state.value = data.State;
  description.value = data.description;
  unit_measurement.value = data.unit_measurement; 
  minStock.value = data.MinStock
;
}

function goInfo2(data) {
  console.log(data);
  nameExit.value = data.Name; 
  serialExit.value = data.Serial;
  units2.value = data.Units; 
  priceExit.value = data.PriceSale;
   unit_measurementExit.value = data.unit_measurement; 
}

function goInfo3(data) {
  nameProduct.value = data.Name; 
  serialProduct.value = data.Serial;
  units2.value = data.Units; 
  priceExit.value = data.PriceBuy; 
}

function cleanForm() {
  supplier.value = "";
  name.value = "";
  units.value = null;
  priceBuy.value = null;
  priceSale.value = null;
  expirationDate.value = null;
  copias.value = "";
  crearCopias.value = null;
  unitsExit.value = 0;
  discount.value = 0;
  description.value = "";
  serial.value = "";
  descriptionExit.value = "";
  unit_measurement.value = "";
  minStock.value = null;
}
</script>

<!-- <style scoped>
.animate-modal { animation: pop 0.25s ease-out; }
@keyframes pop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style> -->