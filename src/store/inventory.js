import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const inventoryStore = defineStore("inventoryStore", () => {
  const useToken = LoginStore();

  // Function Get inventory
  async function GetInventory() {
    try {
      return await requestAxios.get("/inventory/all", {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No fue posible obtener el Inventario");
    }
  }
  // Function post, put and delete inventory
  async function PostInventory(
    supplier,
    name,
    serial,
    units,
    price,
    expirationDate,
    state,
    user
  ) {
    try {
      return (
        await requestAxios.post(
          "/inventory/post",
          {
            Supplier: supplier,
            Name: name,
            Serial: serial,
            Units: units,
            Price: price,
            ExpirationDate: expirationDate,
            State: state,
            UserEmail: user,
          },
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
  async function PutInventory(
    id,
    supplier,
    name,
    serial,
    units,
    price,
    expirationDate,
    state,
    user
  ) {
    try {
      return (
        await requestAxios.put(`/inventory/put/${id}`,       {
            Supplier: supplier,
            Name: name,
            Serial: serial,
            Units: units,
            Price: price,
            ExpirationDate: expirationDate,
            State: state,
            UserUpdate: user,
          },
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
  async function DeleteInventory(id) {
    try {
      return (
        await requestAxios.delete(`/inventory/delete/${id}`),
        notifySuccess("Articulo Eliminado Correctamente")
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // Funciones para manejar las salidas de inventario
  async function PutUnits(id, units2, unitsExit) {
    try {
      return (
        await requestAxios.put(`/inventory/putUnits/${id}`, {
          Units: units2 - unitsExit,
        }),
        notifySuccess("Cantidad Actualizada")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Actualizar la Cantidad");
    }
  }

  // get for date 
  async function GetForDate(fecha) {
    try {
      const response = await requestAxios.get(
        `/inventory/getFechas/${fecha}`
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
  async function GetForDay(fecha) {
    try {
      const response = await requestAxios.get(`/inventory/getDia/${fecha}`);
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
    GetInventory,
    PostInventory,
    PutInventory,
    DeleteInventory,
    PutUnits,
    GetForDate,
    GetForDay
  };
},
  {
    persist: true,
  }
);
