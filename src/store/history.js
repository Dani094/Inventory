import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const historyStore = defineStore("historyStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function Gethistory(User) {
    try {
      return await requestAxios.get(`/history/get/${User}`, {
    
      });
    } catch (error) {
      notifyError("No fue posible obtener las Ventas");
    }
  }
 

  return {
    Gethistory,
   

  };
},
  {
    persist: true,
  }
);