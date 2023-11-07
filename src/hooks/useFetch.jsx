import clienteAxios from "../config/clienteAxios"

const useFetch = async (
    url = null,
    method = 'GET',
    data = null,
    auth = false,
) => {
    const token = auth ? localStorage.getItem('token') : null;
    const usedMethod = method.toUpperCase();

    const config = usedMethod == 'GET'
        ?
        {
            method: usedMethod,
            url: url,
            responseType: 'json',
            auth: auth ? `Bearer ${token}` : '',
        }
        :
        {
            method: usedMethod,
            url: url,
            responseType: 'json',
            auth: auth ? `Bearer ${token}` : '',
            data: data ? data : {},
        }

    if(url) {
        try {
            const response = await clienteAxios(config);
            return [response.data, null];
        } catch (error) {
            console.error('Request failed', error);
            return [null, error];
        }
    }else {
        console.error('url not defined', url);
        return [null, 'url not defined']
    }
}

export default useFetch;