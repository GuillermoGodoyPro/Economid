import clienteAxios from "../config/clienteAxios";

export async function AltaPerfilEconomico(payload, config) {
    const data = await clienteAxios.post("/PerfilEconomico/AltaPerfilEconomico", payload, config);
    return data;
}