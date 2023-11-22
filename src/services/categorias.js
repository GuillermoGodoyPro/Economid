import clienteAxios from "../config/clienteAxios";

export async function GetCategorias(config) {

    const data = await clienteAxios("/categoria/ObtenerTodas", config);
    return data;
}