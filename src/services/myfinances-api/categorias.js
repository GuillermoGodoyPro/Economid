import clienteAxios from "../../config/clienteAxios";

export async function getCategories(config) {
    const data = await clienteAxios("/categoria/ObtenerTodas", config);
    return data;
}