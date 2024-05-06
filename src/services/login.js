import { defineStore } from 'pinia'
import {ref} from "vue"
import { jwtDecode } from 'jwt-decode';
import {requestAxios} from "../Global/axios.js"
import { notifyError, notifySuccess } from "../Global/notify.js";


export const LoginStore = defineStore('LoginStore', () => {
  const login = ref("")
  const token = ref(null)
  const rol = ref(null)
  const user = ref(null)
  const Email = ref(null)
  const dateLogin = ref(null)
  
  async function newLogin(dataUser) {
      try {
          const response =  await requestAxios.post(`/login`,dataUser)
          const decoded = jwtDecode(response.data.token);
          token.value = response.data.token
          dateLogin.value = new Date().toISOString();
          rol.value = decoded.rol 
          user.value = decoded.user
          Email.value = decoded.Email
          notifySuccess('BIENVENIDO');
          return response

        } catch (error) {
          console.log('errrrr',error);
          notifyError(error.response.data.msg);
          throw new Error(error)
        }
    }

    async function newContraseña(dataUser) {
      try {
          const response =  await requestAxios.post(`/login/olvido`,dataUser)
          user.value = decoded.user
          Email.value = decoded.Email
          notifySuccess('Contraseña Restablecida');
          return response

        } catch (error) {
          notifyError('Usuario Invalido');
          throw new Error(error)
        }
    }


const logoutUser= ()=>{
  token.value = ""
  rol.value = ""
  user.value = ""
  dateLogin.value = ""
  Email.value = ""
  notifySuccess('Sesión Cerrada');
}



  return {  newLogin, newContraseña, logoutUser ,login, token,rol, Email, user, dateLogin } },
  {
    persist: true,
  },);
