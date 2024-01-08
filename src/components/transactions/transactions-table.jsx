import { PulseLoader } from "react-spinners";
import { type } from "../../constants/myfinances-constants";
import { BorrarTransaccion } from "../pop-ups/ModalBorrarTransaccion";
import { useEffect, useState } from "react";
import { ModificarTransaccion } from "../pop-ups/ModalModificarTransaccion";
import useAuth from "../../context/useAuth";
import { getCategories } from "../../services/myfinances-api/categorias";
import useDark from "../../context/useDark";

export const TransactionsTable = ({ cargando, transacciones, setTransacciones, balance }) => {
    const { auth } = useAuth();
    const orderedTransactions = transacciones?.slice(0, 10);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [modifyModal, setModifyModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [transaccionId, setTransaccionId] = useState(0);
    const [toModifyTransact, setTransaccion] = useState({});
    const [categorias, setCategorias] = useState([""]);
    const { dark } = useDark();

    const handleModifyModal = (tId, t) => {
        setModifyModal(true);
        setTransaccionId(tId);
        setTransaccion(t);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };
    const handleDeletingModal = (tId) => {
        setDeleteModal(true);
        setTransaccionId(tId);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };
    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };
        const fetchCategorias = async () => {
            try {
                const { data: response } = await getCategories(config);
                setCategorias(response);
            } catch (error) {
                setError(error);
            }
        };
        fetchCategorias();
    }, []);
    return (
        <div className="t-table">
            {
                cargando ?
                    <div className="flex justify-center">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    <table className={(dark === "light" ?
                        "w-full border-collapse"
                        :
                        "bg-gray-600 rounded-lg w-full "
                    )}
                    >
                        <thead>
                            <tr>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Detalle</th>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Monto</th>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Fecha</th>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Tipo</th>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Estado</th>
                                <th className={(dark === "light" ?
                                    "text-left py-2 px-4 font-semibold text-violet-600"
                                    :
                                    "text-left py-2 px-4 font-semibold text-violet-400"
                                )}
                                >Operación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedTransactions?.map((transaccion, index) => {
                                return (
                                    <tr className={(dark === "light" ?
                                        "border-b border-gray-200 "
                                        :
                                        "border-b border-gray-500 "
                                    )}
                                    key={index}>

                                        <td className={(dark === "light" ?
                                            "py-2 px-4 text-gray-800 font-semibold"
                                            :
                                            "py-2 px-4 text-gray-200 font-semibold"
                                        )}
                                        >{transaccion.detalle}</td>
                                        {
                                            transaccion.tipoTransaccion === type.EGRESO
                                                ?
                                                !transaccion.estaActiva
                                                    ?
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                        :
                                                        "py-2 px-4 text-gray-300 font-semibold font-mono"
                                                    )}>
                                                        -${parseFloat(transaccion.monto).toFixed(2)}
                                                    </td>
                                                    :
                                                    <td className="py-2 px-4 text-red-500 font-semibold font-mono">
                                                        -${parseFloat(transaccion.monto).toFixed(2)}
                                                    </td>
                                                : transaccion.tipoTransaccion === type.INGRESO ?
                                                    !transaccion.estaActiva
                                                        ?
                                                        <td className="py-2 px-4 text-gray-400 font-semibold font-mono">
                                                            <div className="w-28 flex justify-center rounded-md bg-gray-200">
                                                                +${parseFloat(transaccion.monto).toFixed(2)}
                                                            </div>
                                                        </td>
                                                        :
                                                        <td className="py-2 px-4 text-green-500 font-semibold font-mono">
                                                            <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                                +${parseFloat(transaccion.monto).toFixed(2)}
                                                            </div>
                                                        </td>
                                                    :
                                                    transaccion.detalle?.includes("Retiro") ?
                                                        <td className="py-2 px-4 text-green-500 font-semibold font-mono">
                                                            <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                                +${parseFloat(transaccion.monto).toFixed(2)}
                                                            </div>
                                                        </td> :
                                                        <td className="py-2 px-4 text-red-500 font-semibold font-mono">
                                                            -${parseFloat(transaccion.monto).toFixed(2)}
                                                        </td>
                                        }
                                        {
                                            transaccion.fecha
                                                ?
                                                !transaccion.estaActiva
                                                    ?
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-4 text-gray-300  font-mono"
                                                        :
                                                        "py-2 px-4 text-gray-500  font-mono"
                                                    )}>{new Date(transaccion.fecha).toLocaleDateString()}</td>
                                                    :
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                        :
                                                        "py-2 px-4 text-gray-200 font-semibold font-mono"
                                                    )}>{new Date(transaccion.fecha).toLocaleDateString()}</td>
                                                :
                                                <td></td>
                                        }
                                        {
                                            transaccion.tipoTransaccion === type.EGRESO ?
                                                <td className="py-2 px-4 text-gray-400">
                                                    {transaccion.tipoTransaccion}
                                                    <span className="text-red-500 font-bold ml-2 pointer-events-none">
                                                        <i className="fa-solid fa-arrow-trend-down"></i>
                                                    </span>
                                                </td>
                                                :
                                                transaccion.tipoTransaccion === type.INGRESO ?
                                                    <td className="py-2 px-4 text-gray-400">
                                                        {transaccion.tipoTransaccion}
                                                        <span className="text-green-500 font-bold ml-2 pointer-events-none">
                                                            <i className="fa-solid fa-arrow-trend-up"></i>
                                                        </span>
                                                    </td> :
                                                    <td className="py-2 px-4 text-gray-400">
                                                        {transaccion.tipoTransaccion}
                                                        <i className="fa-solid fa-piggy-bank ml-2 pointer-events-none"></i>
                                                    </td>
                                        }
                                        {
                                            !transaccion.estaActiva ?
                                                <td className="py-2 px-4 text-orange-400 font-semibold">
                                                    <div className="w-24 text-center rounded-md bg-orange-200">
                                                        Anulada
                                                    </div>
                                                </td> :
                                                <td className="py-2 px-4 text-green-500 font-semibold">
                                                    <div className="w-24 text-center rounded-md bg-green-200">
                                                        Activa
                                                    </div>
                                                </td>
                                        }
                                        <td>
                                            <button disabled={!transaccion.estaActiva || transaccion.tipoTransaccion === type.RESERVA}>
                                                <i className={(dark === "light" ?
                                                    "fa-regular fa-pen-to-square text-gray-600 m-3"
                                                    :
                                                    "fa-regular fa-pen-to-square text-gray-200 m-3"
                                                )}
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Modificar"
                                                    onClick={e => handleModifyModal(transaccion.id, transaccion)}
                                                    style={!transaccion.estaActiva || transaccion.tipoTransaccion === type.RESERVA ?
                                                    { cursor: "not-allowed" } : { cursor: "pointer" }
                                                }>
                                                </i>
                                            </button>
                                            {
                                                modifyModal && <ModificarTransaccion
                                                    setAnimarModal={setAnimarModal}
                                                    setModal={setModifyModal}
                                                    animarModal={animarModal}
                                                    transaccionId={transaccionId}
                                                    transaccion={toModifyTransact}
                                                    setTransaccion={setTransaccion}
                                                    setTransacciones={setTransacciones}
                                                    balance={balance}
                                                    categorias={categorias}
                                                />
                                            }
                                            <button disabled={!transaccion.estaActiva || transaccion.tipoTransaccion === type.RESERVA}>
                                                <i className="fa-solid fa-ban pl-2 text-red-600"
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Anular"
                                                    onClick={e => handleDeletingModal(transaccion.id)}
                                                    style={!transaccion.estaActiva || transaccion.tipoTransaccion === type.RESERVA ?
                                                        { cursor: "not-allowed" } : { cursor: "pointer" }
                                                    }>
                                                </i>
                                            </button>
                                            {
                                                deleteModal && <BorrarTransaccion
                                                    setAnimarModal={setAnimarModal}
                                                    setModal={setDeleteModal}
                                                    animarModal={animarModal}
                                                    auth={auth}
                                                    transaccionId={transaccionId}
                                                    transacciones={transacciones}
                                                    setTransacciones={setTransacciones}
                                                />
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            }
        </div>
    );
};