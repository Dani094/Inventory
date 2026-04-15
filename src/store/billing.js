import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const billStore = defineStore("billStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetIBill(User) {
    try {
      return await requestAxios.get(`/billing/all/${User}`, {
    
      });
    } catch (error) {
      notifyError("No hay datos de facturas");
    }
  }
  async function Filter(filter) {
    console.log(filter);
    try {
      return await requestAxios.get(`/billing/${filter}`, {
    
      });
    } catch (error) {
      notifyError("No Se Encuentra en el Inventario");
    }
  }

  // Function add, update and delete inventory
  async function NewBill(data) {
    console.log(data);
    try {
      return (
        await requestAxios.post( "/billing/post", data,
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
        await requestAxios.put(`/billing/put/${id}`, data,
          {
            
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
        await requestAxios.delete(`/billing/delete/${id}`),
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
