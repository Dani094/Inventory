import Login from "@/views/login.vue"
import Home from "@/views/home.vue";
import Inventory from "@/views/inventory.vue";
import Exits from "@/views/exits.vue";
import Quotation from "@/views/quotation.vue";
import Reports from "@/views/reports.vue";
import { LoginStore } from "../src/store/login.js";

const checkAuth = () => {
  const userStore = LoginStore();
  const token = userStore.token;

  if (userStore.dateLogin == "" || userStore.dateLogin == undefined)
    return false;
  const dateLogin = userStore.dateLogin.split("T")[0];
  const dateNow = new Date().toISOString().split("T")[0];

  if (dateLogin !== dateNow || !token) return false;
  return true;
};

const auth = (to, from, next) => {
  if (checkAuth()) {
    const userStore = LoginStore();
    const userRole = userStore.rol;
    if (!to.meta.rol.includes(userRole)) {
      userStore.logoutUser();
      return next({ name: "Home" }); 
    }
    next();
  } else {
    return next({ name: 'Login'});
  }
};


export const routes = [
    {
        path:"/",
        name: "Login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (checkAuth()) {
              next({ name: "Home" });
            } else {
              next();
            }
          },
    },
    {
      path:"/home",
      name:"Home",
      component: Home,
      meta: {
        rol: ["Admin", "Cliente"],
        },
        beforeEnter: auth,
    },
    {
      path:"/inventory",
      name:"Inventory",
      component: Inventory,
      meta: {
        rol: ["Admin", "Cliente"],
        },
        beforeEnter: auth,
    },
    {
      path:"/exits",
      name:"Exits",
      component: Exits,
      meta: {
        rol: ["Admin", "Cliente"],
        },
        beforeEnter: auth,
    },
    {
      path:"/quotation",
      name:"Quotation",
      component:Quotation,
      meta: {
        rol: ["Admin", "Cliente"],
        },
        beforeEnter: auth,
    },
    {
      path:"/reports",
      name:"Reports",
      component: Reports,
      meta: {
        rol: ["Admin", "Cliente"],
        },
        beforeEnter: auth,
    },
  ]