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
  async function Filter(filter) {
    console.log(filter);
    try {
      return await requestAxios.get(`/inventory/${filter}`, {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No Se Encuentra en el Inventario");
    }
  }

  // Function add, update and delete inventory
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
        await requestAxios.put(
          `/inventory/put/${id}`,
          {
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
  async function SalidaPost(
    serialInvent,
    idInvent2,
    categoriaS,
    modeloS,
    tipoSalida,
    nametecnico,
    oficinaS,
    municipioSalida,
    cliente,
    direccionCliente,
    cantidadSalida
  ) {
    console.log(cantidadSalida);
    try {
      return (
        await requestAxios.post(
          `/salidas/post`,
          {
            Serial: serialInvent,
            IdInvent: idInvent2,
            Categoria: categoriaS,
            Modelo: modeloS,
            TipoSalida: tipoSalida,
            NameTecnico: nametecnico,
            Oficina: oficinaS,
            MunicipioSalida: municipioSalida,
            Cliente: cliente,
            Direccion: direccionCliente,
            Unidades: cantidadSalida,
          },
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
    GetInventory,
    Filter,
    PostInventory,
    PutInventory,
    DeleteInventory,
  };
},
  {
    persist: true,
  }
);
