import { PulseLoader } from "react-spinners";
import { texts, type } from "../../../constants/myfinances-constants";

export const ExpensesSection = ({ cargando, transacciones }) => {
    const egresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.EGRESO);
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-violet-400 w-full mx-2 w-min-6 ">
            <div>
                <h2 className='p-1 text-center font-semibold justify-around text-violet-600'>Ultimos Gastos</h2>
                <div className="bg-inherit rounded-lg  border">
                    {cargando ?
                        <div className="flex justify-center">
                            <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                        </div> :
                        egresos
                            ?
                            <div className="flex justify-center">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-center py-2 px-20 font-semibold text-violet-600">Transacción</th>
                                            <th className="text-center py-2 px-20 font-semibold text-violet-600">Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {egresos?.slice(-5).reverse().map((transaccion, index) => {
                                            return (
                                                <tr className="border-b border-gray-200" key={index}>
                                                    <td className="py-2 px-20">{transaccion.detalle}</td>
                                                    <td className="py-2 px-20 text-red-500 font-semibold font-mono">
                                                        <div className="w-28 flex justify-center">
                                                            -${parseFloat(transaccion.monto).toFixed(2)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className='pt-14 flex flex-col p-5 items-center text-center' >
                                <h3 className="mb-10 text-lg">
                                    {texts.WITH_NO_EXPENSES}
                                </h3>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};