import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
            <header className='bg-violet-200 md:justify-between'>

                <div className=' px-4 pt-2  flex items-center justify-between'>
                    <Link
                        to="index"
                        className=" text-violet-900 ml-2 overflow-hidden flex justify-center"
                    >
                        <i className="fa-solid fa-dragon"></i>
                    </Link>

                    <div className="flex headerButtons">
                        <NavLink
                            to="index"
                            className={({ isActive, isPending }) =>
                                isPending ? "text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  rounded-md p-4 text-md text-violet-600 hover:text-violet-800 font-bold" : " p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-house-chimney-window"></i>
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink
                            to="transacciones"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  rounded-md p-4 text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            {/* <i className="fa-solid fa-piggy-bank"></i> */}
                            <i className="fa-solid fa-money-bill-trend-up"></i>
                            <p>Transacciones</p>
                        </NavLink>

                        <NavLink
                            to="perfil"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  rounded-md p-4 text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-piggy-bank"></i>
                            <p>Metas</p>
                        </NavLink>


                        <NavLink
                            to="balance"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "p-4 bg-gray-100 rounded-md text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-scale-unbalanced"></i>
                            <p>Balance</p>
                        </NavLink>

                        <NavLink
                            to="faq"
                            className={({ isActive, isPending }) =>
                                isPending ? " text-md text-violet-600 hover:text-violet-800 font-bold" : isActive ? "bg-gray-100  p-4 rounded-md text-md text-violet-600 hover:text-violet-800 font-bold" : "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <i className="fa-solid fa-circle-question"></i>
                            <p>Ayuda</p>
                        </NavLink>
                    </div>

                    <div className="flex">
                        <Link
                            to="usuario"
                            className='p-[0.9rem] mb-1 mr-2 text-violet-600 font-bold uppercase bg-gray-100  rounded-xl'
                        >
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Mi Perfil">
                                <i className={`fa-solid fa-${usuario.nombre ? usuario.nombre.charAt(0).toLowerCase() : "x"}`}></i>
                            </a>
                            <Tooltip id="my-tooltip" />
                        </Link>

                        <button
                            type="button"
                            className='p-[0.56rem] mb-1 text-violet-600 font-bold uppercase bg-gray-100  rounded-xl'
                            onClick={handleClick}
                        >
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Cerrar Sesión">
                                <i className="fa-solid fa-power-off"></i>
                            </a>
                            <Tooltip id="my-tooltip" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;