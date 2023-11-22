import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
            <header className='bg-violet-200 border-t md:justify-between'>

                <div className=' px-4 pt-2  flex items-center gap-3 justify-between'>

                    <Link
                        /* to="" tiene que quedar vacío para redirigir correctamente al dashboard (index de protected path) */
                        to="index"
                        className=" text-violet-900 ml-2 overflow-hidden flex justify-center"
                    >
                        {/*  <img
                            src={logoparaMF}
                            className='rounded-2xl w-12'
                            alt="Logo"
                        /> */}

                        <i className="fa-solid fa-dragon"></i> 
                        


                    </Link>

                    <div className="flex">

                        <NavLink
                            /* to="" tiene que quedar vacío para redirigir correctamente al dashboard (index de protected path) */
                            to="index"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  rounded-md p-4 text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-house-chimney-window"></i>
                            {/* <p > home</p> */}
                        </NavLink>



                        <NavLink
                            to="perfil"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  rounded-md p-4 text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }

                        >
                            <i className="fa-solid fa-piggy-bank"></i>
                        </NavLink>


                        <NavLink
                            to="balance"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "p-4 bg-gray-100 rounded-md text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-scale-unbalanced"></i>
                        </NavLink>

                        <NavLink
                            to="faq"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  p-4 rounded-md text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }

                        >
                            <i className="fa-solid fa-circle-question"></i>

                        </NavLink>
                    </div>

                    <Link
                        to="usuario"
                        className='p-[0.8rem] mb-1 text-violet-600 font-bold uppercase bg-gray-100 rounded-xl'
                    >
                        <i className={`fa-solid fa-${usuario.nombre ? usuario.nombre.charAt(0).toLowerCase() : "x"}`}></i>
                    </Link>
                    {/*
                    <button
                        type="button"
                        className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
                        onClick={handleClick}
                    >
                        Cerrar Sesión
                    </button> */}
                </div>

            </header>
        </>
    );
};

export default Header;