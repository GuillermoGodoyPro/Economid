import { createContext, useEffect, useState } from "react";
//creo el AuthContext y lo utilizo en otros lugares
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [hola, setHola] = useState('Hola Mundo!')

    /* este useEffect se ejecuta una sola vez para comprobar si hay token*/
    useEffect(() => {
        
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            
            if(!token){
                return
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