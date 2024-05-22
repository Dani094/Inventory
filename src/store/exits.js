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
  async function PostExits(
    name,
    serial,
    units,
    price,
    discount,
    user,
  ) {
    try {
      return (
        await requestAxios.post(
          "/exits/post",
          {
            Name: name,
            Serial: serial,
            Units: units,
            Price: price,
            Discount: discount,
            UserEmail: user,
          },
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
  
  return {
    GetExits,
    PostExits
  };
},
  {
    persist: true,
  }
);