import clienteAxios from "../config/clienteAxios";

export async function ObtenerTodasUsuario(peid, config) {

    const data = await clienteAxios("/transaccion/ObtenerTodasUsuario/" + peid, config);
    return data;
}

export async function FiltrarPorTipo(tipo, peid, config) {

    const data = await clienteAxios(`/transaccion/FiltrarPorTipo/${tipo}/${peid}`, config);
    return data;
}

export async function AltaTransaccion(payload, config) {

    const data = await clienteAxios.post("/transaccion/NuevaTransaccion", payload, config);
    return data;
}