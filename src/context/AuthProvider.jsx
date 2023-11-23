import { createContext, useEffect, useState } from "react";
/* import { useNavigate } from "react-router-dom"; */

import jwtDecode from "jwt-decode";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState("");
    const [cargando, setCargando] = useState(true);

    /*     const navigate = useNavigate()
 */


    useEffect(() => {


        // En el código original, si había un async también existía un await... Puede que esto genere problemas
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setCargando(false);
                return;
            }

            /*   const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };    */

            try {

                const usuario = await jwtDecode(token);
                setAuth(usuario);
                // navigate('/dasboard')

            } catch (error) {
                console.log(error);
                setAuth({});
            }

            setCargando(false);
        };
        autenticarUsuario();

    }, []);

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

    );
};

export {
    AuthProvider
};

export default AuthContext;