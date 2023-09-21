import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


/* Esta función será utilizada para acceder al contexto de autenticación */
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;
