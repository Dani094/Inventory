import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const categoryStore = defineStore("categoryStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetCategories(User) {
    try {
      return await requestAxios.get(`/category/get/${User}`, {
    
      });
    } catch (error) {
      notifyError("No fue posible obtener las categorías, intente nuevamente");
    }
  }

  

  async function CreateCategory(data) {
    try {
      return await requestAxios.post(`/category/post`, data, {
      });
    } catch (error) {
      notifyError("No fue posible crear la categoría, intente nuevamente");
    }
  }

  async function UpdateCategory(id, data) {
    try {
      return await requestAxios.put(`/category/put/${id}`, data, {
      });
    } catch (error) {
      notifyError("No fue posible actualizar la categoría, intente nuevamente");
    }
  }

  async function DeleteCategory(id) {
    try {
      return await requestAxios.delete(`/category/delete/${id}`, {
      });
    } catch (error) {
      notifyError("No fue posible eliminar la categoría, intente nuevamente");
    }
  }



  return {
    GetCategories,
    CreateCategory,
    UpdateCategory,
    DeleteCategory
  };
},
  {
    persist: true,
  }
);