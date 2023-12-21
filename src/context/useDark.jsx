import { useContext } from "react";
import DarkContext from "./DarkProvider";


/* Esta función será utilizada para acceder al contexto de autenticación */
const useDark = () => {

    // ** Acá identifica que es un context y permite extraer datos "AuthContext"
    return useContext(DarkContext);
};

export default useDark;
