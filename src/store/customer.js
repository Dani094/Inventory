import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const customerStore = defineStore("customerStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetCustomers(User,params) {
    try {
      return await requestAxios.get(`/customer/get/${encodeURIComponent(User)}`, {
        params
      });
    } catch (error) {
      notifyError("No fue posible obtener los clientes, intente nuevamente");
    }
  }

  async function CreateCustomer(data) {
    try {
      return await requestAxios.post(`/customer/post`, data, {
      });
    } catch (error) {
      notifyError("No fue posible crear el cliente, intente nuevamente");
    }
  }
 
  async function UpdateCustomer(id, data) {
    try {
      return await requestAxios.put(`/customer/put/${id}`, data, {
      });
    } catch (error) {
      notifyError("No fue posible actualizar el cliente, intente nuevamente");
    }
  }

  async function DeleteCustomer(id) {
    try {
      return await requestAxios.delete(`/customer/delete/${id}`, {
      });
    } catch (error) {
      notifyError("No fue posible eliminar el cliente, intente nuevamente");
    }
  }

  return {
    GetCustomers,
    CreateCustomer,
    UpdateCustomer,
    DeleteCustomer
  };
},
  {
    persist: true,
  },
);