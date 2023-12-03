import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL_LOCAL}/api`
});

export default clienteAxios;