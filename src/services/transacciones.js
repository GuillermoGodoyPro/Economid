import clienteAxios from "../config/clienteAxios";

export async function GetTransaccionesPorId(PEId, config) { 
       
    const data = await clienteAxios(`/transaccion/ObtenerTodasPorPEId/${PEId}`, config);
    return data;
}