import { Notify } from "quasar";
import Swal from "sweetalert2";
export const notifyError = (msg, position = "top") => {
  Notify.create({
    color: "negative",
    message: msg,
    icon: "error",
    position: position,
    timeout: 3000,
  });
};

export const notifySuccess = (msg, position = "top") => {
  Notify.create({
    color: "positive",
    message: msg,
    icon: "check",
    position: position,
    timeout: 3000,
  });
};

export const sweetDelete = (textDele, numBill, onDelete) => {
  Swal.fire({
    title: `¿Seguro que quieres eliminar ${textDele} ${numBill}?`,
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      onDelete();
      Swal.fire({
        title: "Deleted!",
        text: "Tu Producto se ha eliminado.",
        icon: "success",
        timer: 2000
      });
    }
  });
};

