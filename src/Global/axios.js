import axios from "axios";

const requestAxios = axios.create({

    baseURL: "https://backend-inventory-wl06.onrender.com/api"    
    // http://localhost:7500/api
    // https://backend-inventory-wl06.onrender.com/api
})
export {requestAxios}
