import { PulseLoader } from "react-spinners";
import { type } from "../../../constants/myfinances-constants";

export const IncomesSection = ({ cargando, transacciones }) => {
    const ingresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.INGRESO);
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-violet-400 w-full mx-2">
            <div>
                <h2 className='p-1 text-center font-semibold text-violet-600'>Ultimos Ingresos</h2>
                <div>
                    {cargando ?
                        <div className="flex justify-center">
                            <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                        </div> :
                        <div className="w-full flex justify-center">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-center py-2 px-20 font-semibold text-violet-600">Transacción</th>
                                        <th className="text-center py-2 px-20 font-semibold text-violet-600">Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingresos?.slice(-5).reverse().map((transaccion, index) => {
                                        return (
                                            <tr className="border-b border-gray-200" key={index}>
                                                <td className="py-2 px-20">{transaccion.detalle}</td>
                                                <td className="py-2 px-20 text-green-500 font-semibold font-mono">
                                                    <div className="w-28 flex justify-center rounded-md bg-green-300">
                                                        +${parseFloat(transaccion.monto).toFixed(2)}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>}
                </div>
            </div>
        </div>
    );
};