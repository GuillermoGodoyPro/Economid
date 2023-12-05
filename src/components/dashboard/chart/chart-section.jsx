import { PulseLoader } from "react-spinners";
import { ExpensesChart } from "./expenses-chart";
import { texts, type } from "../../../constants/myfinances-constants";

export const ChartSection = ({ cargando, transacciones }) => {
    const egresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.EGRESO);
    console.log(egresos)
    const filteredExpenses = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.EGRESO);
    return (
        <div className="bg-gray-200 p-3 rounded-lg shadow-md hover:shadow-violet-400 w-full m-2 flex justify-center">
            {cargando ?
                <div className="flex justify-center">
                    <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                </div> :
                filteredExpenses.length ?
                    <div className="w-full flex justify-center">
                        <div>
                            <div>
                                <div className="flex justify-center">
                                    <h2 className='text-xl font-semibold text-violet-600'>
                                        Ultimos Gastos
                                    </h2>
                                </div>
                                <ExpensesChart egresos={filteredExpenses.splice(0, 5)} />
                            </div>
                        </div>
                    </div> :
                    <h3 className="mb-10 text-lg text-center mt-20">
                        {texts.NO_CHART}
                    </h3>
            }
        </div>
    );
};