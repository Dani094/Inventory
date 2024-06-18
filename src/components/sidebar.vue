<template>
  <div
    class="bg-[#04162d] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-3 rounded-tr-xl rounded-br-xl text-white z-10 transition-all"
    :class="{ 'left-0': showSidebar, '-left-full': !showSidebar }"
  >
    <ul class="pl-1">
      <!-- logo  -->
      <li>
        <img class="w-[40%] m-8" src="../assets/logoNewxo.png" alt="">
      </li>
      <!-- options  -->
      <router-link to="/home">
        <li
          :class="[
            $route.path == '/home'
              ? 'text-[#04162d] bg-[#E7E8F3]'
              : 'text-default',
          ]"
          class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
        >
          <span class="material-icons text-2xl"> home </span>
        </li>
      </router-link>

      <router-link to="/inventory">
        <li
          :class="[
            $route.path == '/inventory'
              ? 'text-[#04162d] bg-[#E7E8F3]'
              : 'text-default',
          ]"
          class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
        >
          <span class="material-icons text-2xl"> inventory </span>
        </li>
      </router-link>

      <router-link to="/exits">
        <li
          :class="[
            $route.path == '/exits'
              ? 'text-[#04162d] bg-[#E7E8F3]'
              : 'text-default',
          ]"
          class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
        >
          <span class="material-icons text-2xl">
            production_quantity_limits
          </span>
        </li>
      </router-link>

      <router-link to="/bill">
        <li
          :class="[
            $route.path == '/bill'
              ? 'text-[#04162d] bg-[#E7E8F3]'
              : 'text-default',
          ]"
          class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
        >
          <span class="material-icons text-2xl"> attach_money </span>
        </li>
      </router-link>

      <router-link to="/user">
        <li
          :class="[
            $route.path == '/user'
              ? 'text-[#04162d] bg-[#E7E8F3]'
              : 'text-default',
          ]"
          class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
        >
          <span class="material-icons text-2xl"> person </span>
        </li>
      </router-link>
    </ul>
    <!-- div logout  -->
    <div>
      <ul class="pl-4 mb-10 lg:mb-0">
        <li
          class="hover:bg-[#E7E8F3] hover:text-[#04162d]  rounded-tl-xl rounded-bl-xl p-4 text-center transition"
        >
          <router-link to="/" @click="logout()">
            <span class="material-icons text-2xl"> logout </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <!-- menu movil  -->
  <nav
    class="bg-[#04162d] lg:hidden fixed w-full mb-0 bottom-[0] left-0 text-2xl text-white py-2 px-8 flex items-center justify-between rounded-tl-md rounded-tr-md z-50"
  >
    <router-link to="/user">
      <button class="p-2">
        <span class="material-icons"> person </span>
      </button>
    </router-link>
    <router-link to="/home">
      <button class="p-2">
        <span class="material-icons"> home </span>
      </button>
    </router-link>
    <router-link to="/inventory">
      <button class="p-2">
        <span class="material-icons"> inventory </span>
      </button>
    </router-link>
    <button @click="toggleSidebar()" class="p-2">
      <span class="material-icons">
        {{ showSidebar ? "close" : "menu" }}
      </span>
    </button>
  </nav>
  <!-- color 1 #3f55ff  -->
</template>

<script setup>
import { ref } from "vue";
import { LoginStore } from "../store/login.js";
import { useRouter } from "vue-router";

const storelogin = LoginStore();
const router = useRouter();

let showSidebar = ref(false);
function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

const logout = () => {
    storelogin.logoutUser();
    router.push("/");
};

const currentDate = new Date();
const dateLogin = new Date(storelogin.dateLogin);

//si la fecha actual es mayor a la fecha de inicio de sesion + 1 dia
if (currentDate > dateLogin.setDate(dateLogin.getDate() + 1)) {
  logout();
}
</script>
