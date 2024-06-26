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
  async function PostUsers(
    document,
    name,
    lastName,
    cel,
    address,
    email,
    municipality,
    password,
    user
  ) {
    try {
      return (
        await requestAxios.post(
          "/users/post",
          {
            Document: document,
            Name: name,
            Cel: cel,
            LastName: lastName,
            Address: address,
            Email: email,
            Municipio: municipality,
            Password: password,
            UserEmail: user,
          },
          {
            headers: {
              token: useToken.token,
            },
          }
        ),
        notifySuccess("Cliente Registrado correctamente")
      );
    } catch (error) {
      console.log(error);
      notifyError(
        "No fue posible registrar o el Documento ya existen en la base de datos"
      );
    }
  }
  async function PutUser(
    id,
    document,
    name,
    lastName,
    cel,
    address,
    email,
    municipality,
    password,
    user
  ) {
    try {
      return (
        await requestAxios.put(
          `/users/put/${id}`,
          {
            Document: document,
            Names: name,
            LastName: lastName,
            Cel: cel,
            Municipio: municipality,
            Address: address,
            Email: email,
            Password: password,
            UserUpdate: user,
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
  async function DeleteUser(id) {
    try {
      return (
        await requestAxios.delete(`/users/delete/${id}`),
        notifySuccess("Usuario Eliminado Correctamente")
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  // update state
  async function UpdateState(id, estado) {
    try {
      await requestAxios.put(`/users/state/${id}`,
        { state: estado },
        {
          headers:
          {
            token: useToken.token,
          }
        }
      );
      notifySuccess('Estado cambiado correctamente');
    } catch (error) {
      console.log(error);
      return error
    }
  }

  return {
    GetUsers,
    GetUsersEmail,
    PostUsers,
    PutUser,
    DeleteUser,
    UpdateState,
  };
},
  {
    persist: true,
  }
);