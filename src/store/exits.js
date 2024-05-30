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
  async function PostExits(data) {
    try {
      return ( await requestAxios.post("/exits/post", data,
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Salida Exitosa")
      );
    } catch (error) {
      console.log(error);
      notifyError(
        "No fue posible registrar o el serial ya existen en la base de datos"
      );
    }
  }


  async function PutExists(id, data) {
    console.log(id, data);
    try {
      return (
        await requestAxios.put(`/exits/put/${id}`, data,
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Inventario Actualizado Correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Actualizar el Inventario Correctamente");
    }
  }
  
  return {
    GetExits,
    PostExits,
    PutExists
  };
},
  {
    persist: true,
  }
);