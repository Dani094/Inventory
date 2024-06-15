import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const exitStore = defineStore("exitStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetExits(User) {
    try {
      return await requestAxios.get(`/exits/get/${User}`, {
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


  async function PutExits(id, data) {
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
        notifySuccess("Salida Actualizada Correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Actualizar la Salida Correctamente");
    }
  }


  
  async function DeleteExits(id) {
    try {
      return (
        await requestAxios.delete(`/exits/delete/${id}`),
        notifySuccess("Salida Eliminada Correctamente")
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  


  // get for date 
  async function GetForDate(fecha,User) {
    try {
      const response = await requestAxios.get(
        `/exits/getFechas/${fecha}/${User}`
      );
      if (response.data && response.data.length === 0) {
        notifyError("No Se Encuentran datos en esa Fecha");
      } else {
        return response;
      }
    } catch (error) {
      notifyError("No Se Encuentran Datos en esa Fecha");
    }
  }
  async function GetForDay(fecha,User) {
    try {
      const response = await requestAxios.get(`/exits/getDay/${fecha}/${User}`);
      if (response.data && response.data.length === 0) {
        notifyError("No Se Encuentran Datos en ese Día");
      } else {
        return response;
      }
    } catch (error) {
      notifyError("No Se Encuentra datos en esa Fecha");
    }
  }

  return {
    GetExits,
    PostExits,
    PutExits,
    DeleteExits,
    GetForDate,
    GetForDay,

  };
},
  {
    persist: true,
  }
);