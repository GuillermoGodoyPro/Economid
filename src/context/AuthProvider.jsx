import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        // En el código original, si había un async también existía un await... Puede que esto genere problemas
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false)
                return
            }

            try {
                setAuth(token)
            } catch (error) {
                console.log(error)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()

    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >

            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext;