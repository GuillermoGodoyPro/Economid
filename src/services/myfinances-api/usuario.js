import clienteAxios from "../../config/clienteAxios";

export async function login(payload) {
    const data = await clienteAxios.post("/usuario/login", payload);
    return data;
}

export async function register(payload) {
    const data = await clienteAxios.post("/usuario/registrousuario", payload);
    return data;
}

export async function modifyProfile(userId, payload, config) {
    const data = await clienteAxios.put(`/usuario/Modificar/${userId}`, payload, config);
    return data;
}

export async function deleteUser(userId, config) {
    console.log(userId);
    const data = await clienteAxios.delete(`usuario/eliminar/${userId}`, config);
    return data;
}