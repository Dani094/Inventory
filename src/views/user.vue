<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- profile -->
        <div class="bg-white p-6 rounded-2xl mb-8">
            <!-- title  -->
            <h3 class="text-[#04162d] font-bold text-xl">PERFIL</h3>
            <hr class="my-4">
            <!-- info Name -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[15%]">
                    <p>Nombres<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="name">
                </div>
            </div>
            <!-- info Cel -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[15%]">
                    <p>Teléfono<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="cel">
                </div>
            </div>
                <!-- info Municipality -->
                <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div class="w-full md:w-[15%]">
                        <p>Municipio<span class="text-red-500">*</span></p>
                    </div>
                    <div class="flex-1">
                        <input type="text" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="municipality">
                    </div>
                </div>
                <!-- info Adrress -->
                <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div class="w-full md:w-[15%]">
                        <p>Dirección<span class="text-red-500">*</span></p>
                    </div>
                    <div class="flex-1">
                        <input type="text" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="adrress">
                    </div>
                </div>
                <hr class="my-4">
        </div>

        <!-- User  -->
        <div class="bg-white p-6 rounded-2xl mb-8">
            <!-- title  -->
            <h3 class="text-[#04162d] font-bold text-xl">USUARIO Y CONTRASEÑA</h3>
            <hr class="my-4">
            <!-- info Email -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[15%]">
                    <p>Correo<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="email" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="email">
                </div>
            </div>
                <!-- info Password -->
                <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div class="w-full md:w-[15%]">
                        <p>Contraseña<span class="text-red-500">*</span></p>
                    </div>
                    <div class="flex-1">
                        <input type="password" class="w-full py-2 px-4 outline-none rounded-lg bg-[#04162d] text-white" placeholder="Nombre(s)" v-model="password">
                    </div>
                </div>
                <hr class="my-4">
        </div>

        <!-- technical support -->
        <div class="bg-white p-6 rounded-2xl mb-[5rem]">
            <!-- title  -->
            <h3 class="text-[#04162d] font-bold text-xl">SOPORTE TÉCNICO</h3>
            <hr class="my-4">
            <!-- info -->
                <footerUs/>
            <hr class="my-4">
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import footerUs from "@/components/footer.vue"
let name = ref("Daniel Felipe Murillo Hernández")
let email = ref("admin@gmail.com")
let cel = ref("311 7457356")
let municipality = ref("San Gil")
let adrress = ref("Calle 67 B #20-43")
let password = ref("contraseña123")

</script>