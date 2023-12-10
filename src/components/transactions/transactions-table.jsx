import { PulseLoader } from "react-spinners";
import { type } from "../../constants/myfinances-constants";
import { BorrarTransaccion } from "../pop-ups/ModalBorrarTransaccion";
import { useState } from "react";
// import { TransactionsPagination } from "../dashboard/transactions/transactions-pagination";

export const TransactionsTable = ({ cargando, transacciones }) => {
    const orderedTransactions = transacciones?.slice(0, 10);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [transaccionId, setTransaccionId] = useState(0);

    const handleDeletingModal = (tId) => {
        setModal(true);
        setTransaccionId(tId);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };
    return (
        <div className="t-table">
            {
                cargando ?
                    <div className="flex justify-center">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Detalle</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Fecha</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Tipo</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Estado</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Operación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedTransactions?.map((transaccion, index) => {
                                return (
                                    <tr className="border-b border-gray-200" key={index}>

                                        <td className="py-2 px-4 text-gray-800">{transaccion.detalle}</td>
                                        {
                                            transaccion.tipoTransaccion === type.EGRESO ?
                                                <td className="py-2 px-4 text-red-500 font-semibold font-mono">
                                                    -${parseFloat(transaccion.monto).toFixed(2)}
                                                </td> :
                                                <td className="py-2 px-4 text-green-500 font-semibold font-mono">
                                                    <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                        +${parseFloat(transaccion.monto).toFixed(2)}
                                                    </div>
                                                </td>
                                        }
                                        {
                                            transaccion.fecha ?
                                                <td className="py-2 px-4 text-gray-600 font-semibold">{new Date(transaccion.fecha).toLocaleDateString()}</td> :
                                                <td></td>
                                        }
                                        {
                                            transaccion.tipoTransaccion === type.EGRESO ?
                                                <td className="py-2 px-4 text-gray-400">
                                                    {transaccion.tipoTransaccion}
                                                    <span className="text-red-500 font-bold ml-2">
                                                        <i className="fa-solid fa-arrow-trend-down"></i>
                                                    </span>
                                                </td>
                                                :
                                                <td className="py-2 px-4 text-gray-400">
                                                    {transaccion.tipoTransaccion}
                                                    <span className="text-green-500 font-bold ml-2">
                                                        <i className="fa-solid fa-arrow-trend-up"></i>
                                                    </span>
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
                                            <i className="fa-regular fa-pen-to-square text-gray-600 m-3"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Modificar"></i>

                                            <button disabled={!transaccion.estaActiva}>
                                                <i className="fa-solid fa-ban pl-2 text-red-600"
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Anular"
                                                    onClick={e => handleDeletingModal(transaccion.id)}
                                                    style={!transaccion.estaActiva ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
                                                </i>
                                            </button>
                                            {
                                                modal && <BorrarTransaccion
                                                    setAnimarModal={setAnimarModal}
                                                    setModal={setModal}
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
            {/* {
                !cargando && metadata.totalCount > 10 ?
                    <div className="w-full">
                        <TransactionsPagination
                            auth={auth}
                            setTransacciones={setTransacciones}
                            navigationNumbers={navigationNumbers}
                            hasNextPage={hasNextPage}
                            setHasNextPage={setHasNextPage}
                        />
                    </div> : <div></div>
            } */}
        </div>
    );
};