import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const supplierStore = defineStore("supplierStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetSuppliers(User) {
    try {
      return await requestAxios.get(`/supplier/get/${User}`, {
    
      });
    } catch (error) {
      notifyError("No fue posible obtener los proveedores, intente nuevamente");
    }
  }

  async function CreateSupplier(data) {
    try {
      return await requestAxios.post(`/supplier/post`, data, {
      });
    } catch (error) {
      notifyError("No fue posible crear el proveedor, intente nuevamente");
    }
  }
 
  async function UpdateSupplier(id, data) {
    try {
      return await requestAxios.put(`/supplier/put/${id}`, data, {
      });
    } catch (error) {
      notifyError("No fue posible actualizar el proveedor, intente nuevamente");
    }
  }

  async function DeleteSupplier(id) {
    try {
      return await requestAxios.delete(`/supplier/delete/${id}`, {
      });
    } catch (error) {
      notifyError("No fue posible eliminar el proveedor, intente nuevamente");
    }
  }

  return {
    GetSuppliers,
    CreateSupplier,
    UpdateSupplier,
    DeleteSupplier


  };
},
  {
    persist: true,
  }
);