import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { getUserToken } from "../../services/token/tokenService";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import useDark from "../../context/useDark";



const Header = () => {
    const user = getUserToken();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    const { dark , changeDarkMode } = useDark();

    /* Inicio código para darkmode */

    const darkMode = () => {
        // Llamamos a la función desde aca
        changeDarkMode();
    };

    const handleClick = () => {
        setCargando(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }, 1000);
    };

    return (
        <>
            <header className=' bg-violet-200 md:justify-between headerStyle'>

                <div className=' px-4 pt-2 flex items-center justify-between'>
                    <Link
                        to="index"
                        className=" text-violet-900 ml-2 overflow-hidden flex justify-center"
                    >
                        <i className="fa-solid fa-dragon"></i>
                    </Link>

                    <div className="flex headerButtons">
                        <NavLink
                            to="index"
                            className={({ isActive, isPending}) =>

                                isPending ? "text-violet-600 hover:text-violet-800 font-bold"
                                    :
                                    isActive ? (dark === "dark" ? "bg-gray-700 hover:text-violet-300 text-violet-400  " : "bg-gray-100 hover:text-violet-800 text-violet-600  ") + "rounded-md p-4 text-md font-bold"
                                        :
                                        "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className="fa-solid fa-house-chimney-window"></i>
                                <p>Dashboard</p>
                            </div>
                        </NavLink>

                        <NavLink
                            to="transacciones"
                            className={({ isActive, isPending }) =>
                                isPending ? "text-violet-600 hover:text-violet-800 font-bold"
                                    :
                                    isActive ? (dark === "dark" ? "bg-gray-700 hover:text-violet-300 text-violet-400  " : "bg-gray-100 hover:text-violet-800 text-violet-600  ") + "rounded-md p-4 text-md font-bold"
                                        :
                                        "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className="fa-solid fa-money-bill-trend-up"></i>
                                <p>Transacciones</p>
                            </div>
                        </NavLink>

                        <NavLink
                            to="metas"
                            className={({ isActive, isPending }) =>
                                isPending ? "text-violet-600 hover:text-violet-800 font-bold"
                                    :
                                    isActive ? (dark === "dark" ? "bg-gray-700 hover:text-violet-300 text-violet-400  " : "bg-gray-100 hover:text-violet-800 text-violet-600  ") + "rounded-md p-4 text-md font-bold"
                                        :
                                        "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className="fa-solid fa-piggy-bank"></i>
                                <p>Metas</p>
                            </div>
                        </NavLink>


                        <NavLink
                            to="balance"
                            className={({ isActive, isPending }) =>
                                isPending ? "text-violet-600 hover:text-violet-800 font-bold"
                                    :
                                    isActive ? (dark === "dark" ? "bg-gray-700 hover:text-violet-300 text-violet-400  " : "bg-gray-100 hover:text-violet-800 text-violet-600  ") + "rounded-md p-4 text-md font-bold"
                                        :
                                        "p-4 text-md text-violet-600 hover:text-violet-800 font-bold"
                            }
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className="fa-solid fa-scale-unbalanced"></i>
                                <p>Balance</p>
                            </div>
                        </NavLink>

                        <NavLink
                            to="ayuda"
                            className={({ isActive, isPending }) =>
                                isPending ? "text-violet-600 hover:text-violet-800 font-bold"
                                    :
                                    isActive ? (dark === "dark" ? "bg-gray-700 hover:text-violet-300 text-violet-400  " : "bg-gray-100 hover:text-violet-800 text-violet-600  ") + "rounded-md p-4 text-md font-bold"
                                        :
                                        "p-4 text-md text-violet-600 hover:text-violet-800 font-bold" }
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className="fa-solid fa-circle-question"></i>
                                <p>Ayuda</p>
                            </div>
                        </NavLink>
                    </div>

                    <div className="flex">
                        <button
                            type="button"
                            className='p-[0.56rem] pr-3 text-violet-800 rounded-xl transition ease-in-out delay-50 hover:-translate-y-1 duration-100'
                            onClick={darkMode}

                        >
                            { dark === "light" ?
                                <i
                                    className="fa-solid fa-moon"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Apariencia"
                                ></i>
                                :
                                <i
                                    className="fa-regular fa-sun"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Apariencia"
                                ></i>
                            }
                        </button>

                        <Link
                            to="usuario"
                            className='p-[0.9rem] mb-1 mr-2 text-violet-600 font-bold uppercase bg-gray-100  rounded-xl'
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Perfil"
                        >
                            <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                <i className={`fa-solid fa-${user.nombre ? user.nombre.charAt(0).toLowerCase() : "x"}`}></i>
                            </div>
                        </Link>

                        <button
                            type="button"
                            className='p-[0.56rem] mb-1 text-violet-600 font-bold uppercase bg-gray-100  rounded-xl'
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Cerrar Sesión"
                            onClick={handleClick}
                        >
                            {
                                cargando ?
                                    <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={8} />
                                    :
                                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 duration-100">
                                        <i className="fa-solid fa-power-off"></i>
                                    </div>
                            }
                        </button>
                        <Tooltip id="my-tooltip" />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;