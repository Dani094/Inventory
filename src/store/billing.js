import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const billStore = defineStore("billStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetIBill() {
    try {
      return await requestAxios.get("/factura/all", {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No fue posible obtener el Inventario");
    }
  }
  async function Filter(filter) {
    console.log(filter);
    try {
      return await requestAxios.get(`/factura/${filter}`, {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No Se Encuentra en el Inventario");
    }
  }

  // Function add, update and delete inventory
  async function NewBill(data) {
    try {
      return (
        await requestAxios.post( "/factura/post", data,
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Registrado correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError(
        "No fue posible registrar o el serial ya existen en la base de datos"
      );
    }
  }
  async function PutBill(id, data) {
    console.log(id, data);
    try {
      return (
        await requestAxios.put(`/factura/put/${id}`, data,
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

  async function DeleteBill(id) {
    try {
      return (
        await requestAxios.delete(`/factura/delete/${id}`),
        notifySuccess("Articulo Eliminado Correctamente")
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // Funciones para manejar las salidas de inventario
  async function SalidaPost( ) {
    console.log(cantidadSalida);
    try {
      return (
        await requestAxios.post(`/salidas/post`,
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Salida Registrada Correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Registrar la Salida Correctamente");
    }
  }

  async function UnidadesPut(id, unidadesTotales, cantidadSalida) {
    try {
      return (
        await requestAxios.put(`/inventario/putUnidades/${id}`, {
          Unidades: unidadesTotales - cantidadSalida,
        }),
        notifySuccess("Cantidad Actualizada Correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Actualizar la Cantidad Correctamente");
    }
  }

  



  return { 
    GetIBill,
    Filter,
    PutBill,
    NewBill,
    DeleteBill,
  };
},
  {
    persist: true,
  }
);
