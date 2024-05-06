<template>
  <div className="grid grid-cols-12 h-[100vh] justify-center items-center bg-[#E7E8F3] fullscreen">
    <div className="col-span-1 lg:col-span-2"></div>
    <!-- container -->
    <div className="col-span-10 lg:col-span-8 flex justify-center items-center">
      <!-- content login -->
      <q-form @submit.prevent.stop="validar()" class="flex w-full lg:w-[40%] justify-center items-center shadow-md">
        <!-- titulo -->
        <div class="bg-white rounded-xl w-full">
          <div
            class="mx-4 -mt-10 mb-4 flex h-28 items-center justify-center rounded-xl bg-[#04162d] shadow-lg shadow-[#04162d]">
            <h3 class="font-sans text-3xl font-semibold text-white">
              BIENVENIDO
            </h3>
          </div>
          <!-- inputs -->
          <div class="p-10">
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
                class="w-full rounded-lg bg-[#04162d] py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#04162d] ">
                Ingresar
              </q-btn>
              <p class="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                No tienes una cuenta?
                <a class="ml-1 block font-sans text-sm font-bold leading-normal text-[#04162d] antialiased"
                  href="#signup">
                  Registrarse
                </a>
              </p>
            </div>
          </div>

        </div>
      </q-form>
      <!-- img login -->
      <div class="w-[60%] hidden lg:block  border-t border-r border-b rounded-tr-lg rounded-br-lg">
        <img src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg"
          class="w-full h-full" />
      </div>
    </div>
    <div className="col-span-1 lg:col-span-2"></div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { LoginStore } from "../services/login.js";

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