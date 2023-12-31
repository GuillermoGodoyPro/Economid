import { PulseLoader } from "react-spinners";
import { type } from "../../../constants/myfinances-constants";

export const AllTransactionsSection = ({ transacciones, cargando }) => {
    const orderedTransactions = transacciones?.slice(0, 5);
    return (
        <div className="bg-inherit p-4 rounded-lg shadow-md hover:shadow-violet-400 border">
            <div className="flex justify-center mb-5">
                <h3 className="font-bold text-violet-600">Ultimas Transacciones</h3>
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
                                    <th className="text-left py-2 px-20 font-semibold text-violet-600">Detalle</th>
                                    <th className="text-left py-2 px-20 font-semibold text-violet-600">Monto</th>
                                    <th className="text-left py-2 px-20 font-semibold text-violet-600">Fecha</th>
                                    <th className="text-left py-2 px-20 font-semibold text-violet-600">Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedTransactions.map((transaccion, index) => {
                                        return (
                                            <tr className="border-b border-gray-200" key={index}>
                                                <td className="py-2 px-20 font-semibold">{transaccion.detalle}</td>
                                                {
                                                    transaccion.tipoTransaccion === type.EGRESO ?
                                                        <td className="py-2 px-20 text-red-500 font-semibold font-mono">-${parseFloat(transaccion.monto).toFixed(2)}</td> :
                                                        transaccion.tipoTransaccion === type.INGRESO ?
                                                            <td className="py-2 px-20 text-green-500 font-semibold font-mono">
                                                                <div className="w-28 flex justify-center rounded-md bg-green-200">
                                                                    +${parseFloat(transaccion.monto).toFixed(2)}
                                                                </div>
                                                            </td> :
                                                            <td></td>
                                                }
                                                {
                                                    transaccion.fecha ?
                                                        <td className="py-2 px-20 text-gray-600">{new Date(transaccion.fecha).toLocaleDateString()}</td> :
                                                        <td></td>
                                                }
                                                {
                                                    transaccion && transaccion.tipoTransaccion === type.EGRESO ?
                                                        <td className="py-2 px-20 text-gray-400">
                                                            {transaccion.tipoTransaccion}
                                                            <span className="text-red-500 font-bold ml-1">
                                                                <i className="fa-solid fa-arrow-trend-down"></i>
                                                            </span>
                                                        </td>
                                                        :
                                                        transaccion && transaccion.tipoTransaccion === type.INGRESO ?
                                                            <td className="py-2 px-20 text-gray-400">
                                                                {transaccion.tipoTransaccion}
                                                                <span className="text-green-500 font-bold ml-1">
                                                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                                                </span>
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