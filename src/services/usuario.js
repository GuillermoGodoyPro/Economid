import clienteAxios from "../config/clienteAxios";

export async function UserLogin(payload) {
    const data = await clienteAxios.post("/usuario/login", payload);
    return data;
}

export async function UserRegister(payload) {
    const data = await clienteAxios.post("/usuario/registrousuario", payload);
    return data;
}

export async function GetById(id, config) {
    const data = await clienteAxios("/usuario/obtenerporid/" + id, config);
    return data;
}

export async function ModificarPerfil(id, payload, config) {
    const data = await clienteAxios.put("/usuario/Modificar/" + id , payload, config);
    return data;
}