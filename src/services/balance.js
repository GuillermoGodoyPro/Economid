import clienteAxios from "../config/clienteAxios";

export async function GetBalanceByPEId(PEId, config) { 
       
    const data = await clienteAxios(`/balance/GetBalanceByPEId/${PEId}`, config);
    return data;
}