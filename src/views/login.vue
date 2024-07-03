<template>
  <div class="grid grid-cols-12 h-[100vh] justify-center items-center bg-[#E7E8F3] fullscreen">
    <div class="col-span-1 lg:col-span-2"></div>
    <!-- container -->
    <div class="col-span-10 lg:col-span-8 flex shadow-2xl rounded-2xl">
      <!-- content login -->
       <div class="w-full lg:w-[40%]">
        <q-form @submit.prevent.stop="validar()" class="flex w-full">
        <!-- titulo -->
        <div class="bg-white w-full">
          <div
            class="mx-4 -mt-10 flex h-28 items-center justify-center rounded-xl bg-[#000000] shadow-lg shadow-[#04162d]">
            <h3 class="font-serif text-3xl font-semibold text-white">
              BIENVENIDO
            </h3>
          </div>
          <!-- inputs -->
          <div class="p-[3rem] lg:p-[5rem]">
            <div class="w-full mt-6">
              <h5 class="text-xl font-serif"><strong>Usuario</strong></h5>
              <q-input autocomplete="current-text" v-model="user" label="DIGITE SU CORREO" stack-label>
                <template v-slot:append>
                  <q-icon name="person" class="person text-[#04162d]" />
                </template>
              </q-input>
            </div>
            <div class="w-full mt-6">
              <h5 class="text-xl font-serif"><strong>Contraseña</strong></h5>
              <q-input class="input" autocomplete="new-password" :type="isPwd ? 'password' : 'text'" v-model="password"
                label="DIGITE SU CONTRASEÑA" stack-label>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-[#04162d]"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <div class="-ml-2.5">

              </div>
            </div>
            <!-- btn ingresar  -->
            <div class="p-6 pt-10">
              <q-btn type="submit" :loading="loading"
                class="w-full rounded-lg bg-[#000000] py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#04162d] ">
                Ingresar
              </q-btn>
              <p class="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                No tienes una cuenta?
                <a class="ml-1 block font-sans text-sm font-bold leading-normal text-[#04162d]" href="https://api.whatsapp.com/send?phone=573118048146&text=Hola,%20equipo%20de%20Newxo%20Dev.%20Me%20gustaría%20registrarme%20en%20su%20plataforma.%20%C2%A1Gracias%20por%20su%20asistencia!" target="_blank">
                  Registrarse
                </a>
              </p>
            </div>
          </div>

        </div>
      </q-form>
       </div>
      <!-- img login -->
      <div class="w-[0%] lg:w-[60%] lg:h-[598px] h-full" >
          <img src="../assets/_1ba30943-a6a2-451d-90c5-c5345685292e.jpeg" alt="imagen login" class="w-full h-full">
      </div>
    </div>
    <div class="col-span-1 lg:col-span-2"></div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { LoginStore } from "../store/login.js";

const store = LoginStore();

let user = ref("")
let password = ref("")
let isPwd = ref(true);
let router = useRouter();
let loading = ref(false);

async function validar() {
  try {
    loading.value = true;
    return await store.newLogin({
        user: user.value,
        password: password.value,
      })
      .then((res) => {
        pasarHome();
      });
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
  loading.value = false;
}

function pasarHome() {
  router.push("/home");
}

</script>