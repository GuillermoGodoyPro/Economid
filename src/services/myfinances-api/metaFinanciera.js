import clienteAxios from "../../config/clienteAxios";

export async function altaMetaFinanciera(payload, config) {
    const data = await clienteAxios.post("/MetaFinanciera/AltaMetaFinanciera", payload, config);
    return data;
}
export async function agregarMonto(payload, config) {
    const data = await clienteAxios.post("/MetaFinanciera/AgregarMonto", payload, config);
    return data;
}

export async function getAll(payload, page, pageSize, config) {
    const data = await clienteAxios.post(`/MetaFinanciera/ObtenerPorUserId?page=${page}&pageSize=${pageSize}`, payload, config);
    return data;
}

export async function getByState(payload, page, pageSize, config) {
    const data = await clienteAxios.post(`/MetaFinanciera/ObtenerPorEstado?page=${page}&pageSize=${pageSize}`, payload, config);
    return data;
}

export async function withdrawGoal(goalId, config) {
    const data = await clienteAxios.delete(`/MetaFinanciera/RetirarMeta/${goalId}`, config);
    return data;
}