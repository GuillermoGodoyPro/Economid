import clienteAxios from "../../config/clienteAxios";

export async function getAll(payload, page, pageSize, config) {
    const data = await clienteAxios.post(`/transaccion/ObtenerTodasUsuario?page=${page}&pageSize=${pageSize}`, payload, config);
    return data;
}

export async function filterTransactions(payload, page, pageSize, config) {
    const data = await clienteAxios.post(`/transaccion/GetFilteredTransactions?page=${page}&pageSize=${pageSize}`, payload, config);
    return data;
}

export async function filterByType(payload, page, pageSize, config) {
    const data = await clienteAxios.post(`/transaccion/FiltrarPorTipo?page=${page}&pageSize=${pageSize}`, payload, config);
    return data;
}

export async function newTransaction(payload, config) {
    const data = await clienteAxios.post("/transaccion/NuevaTransaccion", payload, config);
    return data;
}

export async function deleteTransaction(id, config) {
    const data = await clienteAxios.delete(`/transaccion/BorrarTransaccion/${id}`, config);
    return data;
}

export async function modifyTransaction(id, payload, config) {
    const data = await clienteAxios.put(`/transaccion/ModificarTransaccion/${id}`, payload, config);
    return data;
}