import clienteAxios from "../../config/clienteAxios";

export async function getAll(userId, page, rows, config) {
    const data = await clienteAxios(`/transaccion/ObtenerTodasUsuario/${userId}?page=${page}&rows=${rows}`, config);
    return data;
}

export async function filterByType(tipo, peid, config) {
    const data = await clienteAxios(`/transaccion/FiltrarPorTipo/${tipo}/${peid}`, config);
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