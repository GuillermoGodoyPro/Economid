import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                if (!usuario) {
                    setUsuario(jwtDecode(token))
                }
            } catch(error) {
                console.error(error)
                setUsuario(null)
            }
        }
    }, [])

    const ctx = useMemo(() => ({
        usuario,
        setUsuario,
    }), [
        usuario,
        setUsuario,
    ])

    return (
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuthContext = () => useContext(AuthContext);
