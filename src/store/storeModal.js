import { defineStore } from 'pinia';
import { notifyError, notifySuccess } from "../Global/notify.js";


export const useModalStore = defineStore("useModalStore", () => {
  async function modalsOption(data) {
    console.log(data);
    try {
      // Aquí puedes agregar la lógica necesaria para procesar los datos,
      // como enviar una solicitud a un servidor, etc.
      return data;
    } catch (error) {
      notifyError("No fue posible obtener el Inventario");
    }
  }

  return {
    modalsOption,
  };
});
