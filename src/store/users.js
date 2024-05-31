import { defineStore } from "pinia";
import { requestAxios } from "../Global/axios.js";
import { notifyError, notifySuccess } from "../Global/notify.js";
import { LoginStore } from "./login.js";

export const usersStore = defineStore("usersStore", () => {
  const useToken = LoginStore();

  // Function Get users
  async function GetUsers() {
    try {
      return await requestAxios.get("/users/all", {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No fue posible obtener los Usuarios");
    }
  }
  async function GetUsersEmail(Email) {
    try {
      return await requestAxios.get(`/users/get/${Email}`, {
        headers: {
          token: useToken.token,
        },
      });
    } catch (error) {
      notifyError("No fue posible obtener el Usuario");
    }
  }
  // Function post, put and delete users
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
  async function PutUser(
    id,
    name,
    lastname,
    document,
    email,
    cel,
    municipality,
    address,
    password
  ) {
    try {
      return (
        await requestAxios.put(
          `/users/put/${id}`,
          {
            Names: name,
            LastName:lastname,
            Document: document,
            Email: email,
            Cel: cel,
            Municipio:municipality,
            Address: address,
            Password: password
          },
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Usuario Actualizado Correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError("No se pudo Actualizar el Usuario Correctamente");
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

  return {
    GetUsers,
    GetUsersEmail,
    PostInventory,
    PutUser,
    DeleteInventory,
  };
},
  {
    persist: true,
  }
);