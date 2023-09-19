import { createContext, useEffect, useState } from "react";
//creo el AuthContext y lo utilizo en otros lugares
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})

    /* este useEffect se ejecuta una sola vez para comprobar si hay token*/
    useEffect(() => {
        
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            
            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                //TODO: ESPERAR EL HOOK DE EMILIO
                //const { data } = await clienteAxios('/usuarios/perfil', config)
                
                //setAuth(data)
            } catch (error) {
                
            }
        }        
        autenticarUsuario()

    }, [])

    return(
        <AuthContext.Provider
            value={{

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