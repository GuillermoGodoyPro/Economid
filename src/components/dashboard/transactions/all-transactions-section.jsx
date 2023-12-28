import { PulseLoader } from "react-spinners";
import { type } from "../../../constants/myfinances-constants";
import useDark from "../../../context/useDark";

export const AllTransactionsSection = ({ transacciones, cargando }) => {
    const { dark } = useDark();

    const orderedTransactions = transacciones?.slice(0, 5);
    return (
        <div className={(dark === "light" ?
            "bg-inherit p-4 rounded-lg shadow-md hover:shadow-violet-400 border"
            :
            "bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-violet-400 "
        )}
        >
            <div className="flex justify-center mb-5">
                <h3 className={(dark === "light" ?
                    "font-bold text-violet-600"
                    :
                    "font-bold text-violet-400"
                )}
                >Ultimas Transacciones</h3>
            </div>
            {
                cargando ?
                    <div className="flex justify-center">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    <div className="flex justify-center">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-20 font-semibold text-violet-600"
                                        :
                                        "bg-gray-600 text-left py-2 px-20 font-semibold text-violet-400"
                                    )}
                                    >Detalle</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-20 font-semibold text-violet-600"
                                        :
                                        "bg-gray-600 text-left py-2 px-20 font-semibold text-violet-400"
                                    )}
                                    >Monto</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-20 font-semibold text-violet-600"
                                        :
                                        "bg-gray-600 text-left py-2 px-20 font-semibold text-violet-400"
                                    )}
                                    >Fecha</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-20 font-semibold text-violet-600"
                                        :
                                        "bg-gray-600 text-left py-2 px-20 font-semibold text-violet-400"
                                    )}
                                    >Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedTransactions.map((transaccion, index) => {
                                        return (
                                            <tr className={(dark === "light" ?
                                                "border-b border-gray-200"
                                                :
                                                "bg-gray-600 border-b border-gray-500"
                                            )}
                                                key={index}
                                            >
                                                <td className={(dark === "light" ?
                                                    "text-gray-600 py-2 px-20 font-semibold"
                                                    :
                                                    "text-gray-300 py-2 px-20 font-semibold"
                                                )}
                                                >{transaccion.detalle}</td>
                                                {
                                                    transaccion.tipoTransaccion === type.EGRESO ?
                                                        <td className="py-2 px-20 text-red-500 font-semibold font-mono">
                                                            -${parseFloat(transaccion.monto).toFixed(2)}
                                                        </td> :
                                                        transaccion.tipoTransaccion === type.INGRESO ?
                                                            <td className="py-2 px-20 text-green-500 font-semibold font-mono">
                                                                <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                                    +${parseFloat(transaccion.monto).toFixed(2)}
                                                                </div>
                                                            </td> :
                                                            transaccion.tipoTransaccion === type.RESERVA ?
                                                                transaccion.detalle?.includes("Retiro") ?
                                                                    <td className="py-2 px-20 text-green-500 font-semibold font-mono">
                                                                        <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                                            +${parseFloat(transaccion.monto).toFixed(2)}
                                                                        </div>
                                                                    </td> :
                                                                    <td className="py-2 px-20 text-red-500 font-semibold font-mono">
                                                                        -${parseFloat(transaccion.monto).toFixed(2)}
                                                                    </td>
                                                                : <td></td>
                                                }
                                                {
                                                    transaccion.fecha ?
                                                        <td className={(dark === "light" ?
                                                            "py-2 px-20 text-gray-600"
                                                            :
                                                            "py-2 px-20 text-gray-300"
                                                        )}
                                                        >{new Date(transaccion.fecha).toLocaleDateString()}</td> :
                                                        <td></td>
                                                }
                                                {
                                                    transaccion && transaccion.tipoTransaccion === type.EGRESO ?
                                                        <td className="py-2 px-20 text-gray-400">
                                                            {transaccion.tipoTransaccion}
                                                            <span className="text-red-500 font-bold ml-1 pointer-events-none">
                                                                <i className="fa-solid fa-arrow-trend-down"></i>
                                                            </span>
                                                        </td>
                                                        :
                                                        transaccion && transaccion.tipoTransaccion === type.INGRESO ?
                                                            <td className="py-2 px-20 text-gray-400">
                                                                {transaccion.tipoTransaccion}
                                                                <span className="text-green-500 font-bold ml-1 pointer-events-none">
                                                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                                                </span>
                                                            </td> :
                                                            transaccion.tipoTransaccion === type.RESERVA ?
                                                                <td className="py-2 px-20 text-gray-400">
                                                                    {transaccion.tipoTransaccion}
                                                                    <i className="fa-solid fa-piggy-bank ml-1 pointer-events-none"></i>
                                                                </td>
                                                                : <td></td>
                                                }
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};