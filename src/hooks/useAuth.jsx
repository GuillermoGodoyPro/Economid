import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


/* Esta función será utilizada para acceder al contexto de autenticación */
const useAuth = () => {

    // ** Acá identifica que es un context y permite extraer datos "AuthContext"
    return useContext(AuthContext)
}

export default useAuth;
