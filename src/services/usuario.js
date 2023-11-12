import clienteAxios from "../config/clienteAxios";

export async function UserLogin(payload) {    
    const data = await clienteAxios.post("/usuario/login", payload);       
    return data;
}

export async function UserRegister(payload) {
    const data = await clienteAxios.post("/usuario/registrousuario", payload);
    return data;
}