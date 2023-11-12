import clienteAxios from "../config/clienteAxios";

export async function ObtenerTodasUsuario(config) { 
       
    const data = await clienteAxios(`/transaccion/ObtenerTodasUsuario`, config);
    return data;
}