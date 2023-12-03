import clienteAxios from "../../config/clienteAxios";

export async function getBalanceByUserId(userId, config) {
    const data = await clienteAxios(`/balance/GetBalanceByUserId/${userId}`, config);
    return data;
}