import clienteAxios from "../config/clienteAxios";

export async function ObtenerTodasUsuario(config) {

    const data = await clienteAxios("/transaccion/ObtenerTodasUsuario", config);
    return data;
}

export async function FiltrarPorTipo(tipo, config) {

    const data = await clienteAxios(`/transaccion/FiltrarPorTipo/${tipo}`, config);
    return data;
}