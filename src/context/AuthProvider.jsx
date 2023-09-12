import { createContext, useEffect, useState } from "react";
//creo el AuthContext y lo utilizo en otros lugares
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [hola, setHola] = useState('Hola Mundo!')

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