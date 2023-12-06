import clienteAxios from "../../config/clienteAxios";

export async function altaMetaFinanciera(payload, config) {
    const data = await clienteAxios.post("/MetaFinanciera/AltaMetaFinanciera", payload, config);
    return data;
}
export async function agregarMonto(payload, config) {
    const data = await clienteAxios.post("/MetaFinanciera/AgregarMonto", payload, config);
    return data;
}

export async function getAll(userId, config) {
    const data = await clienteAxios(`/MetaFinanciera/ObtenerPorUserId/${userId}`, config);
    return data;
}