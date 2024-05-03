import axios from "axios";

const requestAxios = axios.create({

    baseURL: "https://backeninventario.onrender.com/api"    
    // http://localhost:7500/api
})
export {requestAxios}
