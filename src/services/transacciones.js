import clienteAxios from "../config/clienteAxios";

export async function ObtenerTodasUsuario(config) {

    const data = await clienteAxios("/transaccion/ObtenerTodasUsuario", config);
    return data;
}

export async function EliminarTransaccion(id) {

    const data = await clienteAxios.delete("/transaccion/ObtenerTodasUsuario", id);
    return data;
}

export async function FiltrarPorTipo(tipo, config) {

    const data = await clienteAxios(`/transaccion/FiltrarPorTipo/${tipo}`, config);
    return data;
}

export async function AltaTransaccion(payload, config) {

    const data = await clienteAxios.post("/transaccion/NuevaTransaccion", payload, config);
    return data;
}

