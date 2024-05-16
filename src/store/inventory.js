import { defineStore } from 'pinia'
import {requestAxios} from "../Global/axios.js"
import { notifyError, notifySuccess } from "../Global/notify.js";
import {LoginStore} from "./login.js"


export const inventoryStore = defineStore('inventoryStore', () => {
  const useToken = LoginStore();

    async function GetInventory() {
        try {
          return await requestAxios.get("/inventory/all", {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener el Inventario');
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
            notifyError('No Se Encuentra en el Inventario');
        }
      }


      async function listInvenCharala() {
        try {
          return await requestAxios.get(`/inventario/all/charala`, {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener el Inventario');
        }
      }

      async function listInvenVilla() {
        try {
          return await requestAxios.get(`/inventario/all/villanueva`, {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener el Inventario');
        }
      }

      async function listInventarioEntradas() {
        try {
          return await requestAxios.get("/inventario/entradas", {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener las Entradas');
        }
      }

      async function listEntradasBarichara() {
        try {
          return await requestAxios.get("/inventario/entradas/barichara", {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener las Entradas');
        }
      }

      async function listEntradasVilla() {
        try {
          return await requestAxios.get("/inventario/entradas/villa", {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener las Entradas');
        }
      }

      async function listEntradasCharala() {
        try {
          return await requestAxios.get("/inventario/entradas/charalá", {
            headers: {
              token: useToken.token,
            },
        });
  
        } catch (error) {
          notifyError('No fue posible obtener las Entradas');
        }
      }

      async function listFiltro(filtro) {
        try {
          return await requestAxios.get(`/inventario/name/${filtro}`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en el Inventario');
        }
      }

      async function listFiltroBarichara(filtro) {
        try {
          return await requestAxios.get(`/inventario/name/${filtro}/barichara`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en el Inventario');
        }
      }

      async function listFiltroCharala(filtro) {
        try {
          return await requestAxios.get(`/inventario/name/${filtro}/charala`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en el Inventario');
        }
      }

      async function listFiltroVilla(filtro) {
        try {
          return await requestAxios.get(`/inventario/name/${filtro}/villa`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en el Inventario');
        }
      }

      async function FiltroEntradas(filtro) {
        try {
          return await requestAxios.get(`/inventario/entradas/${filtro}`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en las Entradas');
        }
      }

      async function FiltroEntradasBarichara(filtro) {
        try {
          return await requestAxios.get(`/inventario/entradas/${filtro}/barichara`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en las Entradas');
        }
      }

      async function FiltroEntradasCharala(filtro) {
        try {
          return await requestAxios.get(`/inventario/entradas/${filtro}/charala`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en las Entradas');
        }
      }

      async function FiltroEntradasVilla(filtro) {
        try {
          return await requestAxios.get(`/inventario/entradas/${filtro}/villa`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra en las Entradas');
        }
      }

      async function listarFecha(fecha) {
        try {
          return await requestAxios.get(`/inventario/getFechas/${fecha}`
         
           );
  
        } catch (error) {
          notifyError('No Se Encuentra datos en esa Fecha');
        }
      }


      async function listarForGrafica(proveedor,categoria,categoria2,filFecha) {

        try {
          return await requestAxios.get(`/inventario/filtroGrafica/${proveedor}/${categoria}/${categoria2}/${filFecha}`
         
           );
  
        } catch (error) {
          console.error(error);
          notifyError('No Se Encuentran Datos');
        }
      }


      async function PostInventory(supplier,name,serial,units, price, expirationDate, state, user) {
        try {
           return await requestAxios.post('/inventory/post',{
              Supplier: supplier,
              Name: name,
              Serial: serial,
              Units: units,
              Price: price,
              ExpirationDate: expirationDate,
              State: state,
              UserEmail: user
            },
            { headers: {
              token: useToken.token,
            },
          }
          ),
            notifySuccess('Registrado correctamente');
          } catch (error) {
            console.log(error);
            notifyError('No fue posible registrar o el serial ya existen en la base de datos');
          }
      }

      async function PutInventory(id,supplier,name,serial,units, price, expirationDate, state,user ) { 
        console.log(id);
        console.log(supplier);
        console.log(name);
        console.log(serial);
        console.log(units);
        console.log(price);
        console.log(expirationDate);
        console.log(state);
        console.log(user);
        try {
            return await requestAxios.put(`/inventory/put/${id}`,
            {
              Supplier: supplier,
              Name: name,
              Serial: serial,
              Units: units,
              Price: price,
              ExpirationDate: expirationDate,
              State: state,
              UserUpdate: user
            },
            { headers: {
              token: useToken.token,
            },
          }
          ),
            notifySuccess('Inventario Actualizado Correctamente');
          } catch (error) {
            console.log(error);
            notifyError('No se pudo Actualizar el Inventario Correctamente');
          }
      }


      async function SalidaPost(serialInvent,idInvent2,categoriaS,modeloS,tipoSalida,nametecnico,oficinaS,municipioSalida,cliente, direccionCliente,cantidadSalida )
      { 
        console.log(cantidadSalida);
        try {
            return await requestAxios.post(`/salidas/post`,
            {
              Serial:serialInvent,
              IdInvent:idInvent2,
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
            { headers: {
              token: useToken.token,
            },
          }
          ),
            notifySuccess('Salida Registrada Correctamente');
          } catch (error) {
            console.log(error);
            notifyError('No se pudo Registrar la Salida Correctamente');
          }
      }

      async function UnidadesPut(id, unidadesTotales,cantidadSalida) { 
        try {
            return await requestAxios.put(`/inventario/putUnidades/${id}`,
            {
              Unidades: unidadesTotales-cantidadSalida,  
            }
          ),
            notifySuccess('Cantidad Actualizada Correctamente');
          } catch (error) {
            console.log(error);
            notifyError('No se pudo Actualizar la Cantidad Correctamente');
          }
      }

      async function Inventariodelete(id) {
        try {
          return await requestAxios.delete(`/inventario/delete/${id}`
      ),
            notifySuccess('Articulo Eliminado Correctamente');
          }  catch (error) {
          console.error(error);
          return error;
        }
      }
      

    return {GetInventory,Filter,PostInventory,PutInventory }
  },
  {
    persist: true,
  }
  );