import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoparaMF from "../assets/logoparaMF.png";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";


const Header = () => {
    const { auth } = useAuth();
    const usuario = jwtDecode(auth);
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <header className='border border-t md:justify-between '>

                <div className='mt-1 px-4 py-5  flex items-center gap-3 justify-between'>

                    <Link
                        to=""
                        className=" mr-2 mt-1 overflow-hidden flex justify-center"
                    >
                        <img
                            src={logoparaMF}
                            className='rounded-2xl w-12'
                            alt="Logo"
                        />


                    </Link>

                    <Link
                        to="usuario"
                        className='text-violet-600 font-bold uppercase'
                    >
                        Ver Perfil ({usuario.nombre})
                    </Link>

                    <button
                        type="button"
                        className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
                        onClick={handleClick}
                    >
                        Cerrar Sesión
                    </button>
                </div>

            </header>
        </>
    );
};

export default Header;