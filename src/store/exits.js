import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const exitStore = defineStore("exitStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetExits() {
    try {
      return await requestAxios.get("/exits/all", {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No fue posible obtener el Inventario");
    }
  }
  
  
  return {
    GetExits
  };
},
  {
    persist: true,
  }
);