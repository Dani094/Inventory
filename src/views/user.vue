<template>
    <div class="lg:pl-40 lg:pr-20 p-4">
        <!-- profile -->
        <div class="bg-white p-6 rounded-2xl mb-8">
            <!-- title  -->
            <h3 class="text-[#04162d] font-bold text-xl">PERFIL</h3>
            <hr class="my-4">
            <!-- info Name -->
            <div class="flex flex-col md:flex-row md:items-center gap-2 mb-8">
                <div class="w-full md:w-[19.5%]">
                    <p>Nombres<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Nombre(s)" v-model="name">
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Apellido(s)" v-model="lastName">
                </div>
            </div>
            <!-- info Document -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Documento<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Documento" v-model="document">
                </div>
            </div>
            <!-- info Cel -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Teléfono<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Teléfono" v-model="cel">
                </div>
            </div>
            <!-- info Municipality -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Ciudad<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Ciudad" v-model="municipality">
                </div>
            </div>
            <!-- info Address -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Dirección<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="text" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Dirección" v-model="address">
                </div>
            </div>
            <hr class="my-4">
            <div class="flex justify-end">
                <q-btn @click="UserPut" :disabled="!isModified" class="rounded-2xl bg-[#16A34A] text-white">Guardar</q-btn>
            </div>
        </div>

        <!-- User -->
        <div class="bg-white p-6 rounded-2xl mb-8">
            <!-- title -->
            <h3 class="text-[#04162d] font-bold text-xl">USUARIO Y CONTRASEÑA</h3>
            <hr class="my-4">
            <!-- info Email -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Correo<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="email" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Correo" v-model="email">
                </div>
            </div>
            <!-- info Password -->
            <div class="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div class="w-full md:w-[20%]">
                    <p>Contraseña<span class="text-red-500">*</span></p>
                </div>
                <div class="flex-1">
                    <input type="password" class="w-full py-2 px-4 outline-none rounded-lg font-bold shadow bg-[#F7F7F7] text-black" placeholder="Contraseña" v-model="password">
                </div>
            </div>
            <hr class="my-4">
            <div class="flex justify-end">
                <q-btn @click="UserPut" :disabled="!isModified" class="rounded-2xl bg-[#16A34A] text-white">Guardar</q-btn>
            </div>
        </div>

        <!-- technical support -->
        <div class="bg-white p-6 rounded-2xl mb-[5rem]">
            <!-- title -->
            <h3 class="text-[#04162d] font-bold text-xl">SOPORTE TÉCNICO</h3>
            <hr class="my-4">
            <!-- info -->
            <footerUs />
            <hr class="my-4">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import footerUs from "@/components/footer.vue";
import { usersStore } from "../store/users.js";
import { LoginStore } from "../store/login.js";

const storeUsers = usersStore();
const storeLogin = LoginStore();

let id = ref();
let name = ref();
let lastName = ref();
let document = ref();
let email = ref();
let cel = ref();
let municipality = ref();
let address = ref();
let password = ref();
let user=ref(storeLogin.Email)

let originalData = ref({});

async function UsersGet() {
  const res = await storeUsers.GetUsersEmail(storeLogin.Email);
  if (res && res.status < 299) {
    for (let i in res.data) {
      id.value = res.data[i]._id;
      name.value = res.data[i].Name;
      lastName.value = res.data[i].LastName;
      document.value = res.data[i].Document;
      email.value = res.data[i].Email;
      cel.value = res.data[i].Cel;
      municipality.value = res.data[i].Municipio;
      address.value = res.data[i].Address;
      password.value = res.data[i].Password;
    }
    // Guardar datos originales
    originalData.value = {
      name: name.value,
      lastname: lastName.value,
      document: document.value,
      email: email.value,
      cel: cel.value,
      municipality: municipality.value,
      address: address.value,
      password: password.value
    };
  }
}

async function UserPut() {
  const res = await storeUsers.PutUser(
    id.value,
    document.value,
    name.value,
    lastName.value,
    cel.value,
    address.value,
    email.value,
    municipality.value,
    password.value,
    user.value
  );
  UsersGet();
}

const isModified = computed(() => {
  return (
    name.value !== originalData.value.name ||
    lastName.value !== originalData.value.lastName ||
    document.value !== originalData.value.document ||
    email.value !== originalData.value.email ||
    cel.value !== originalData.value.cel ||
    municipality.value !== originalData.value.municipality ||
    address.value !== originalData.value.address ||
    password.value !== originalData.value.password
  );
});

onMounted(() => {
  UsersGet();
});
</script>
