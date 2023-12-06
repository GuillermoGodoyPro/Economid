import clienteAxios from "../../config/clienteAxios";

export async function getDollarExchangeRate() {
    const data = await clienteAxios("https://api.bluelytics.com.ar/v2/latest");
    return data;
}