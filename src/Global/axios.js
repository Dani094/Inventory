import axios from "axios";

const requestAxios = axios.create({

    baseURL: "http://localhost:8500/api"    
    // http://localhost:7500/api
})
export {requestAxios}
