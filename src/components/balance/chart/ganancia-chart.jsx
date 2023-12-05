/* import {HistogramaChart} from './histograma-chart'*/

import { texts, type } from "../../../constants/myfinances-constants";


export const GananciaChart = ({transacciones}) => {
    
    const ingresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.INGRESO); 
    const egresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.EGRESO);
    const montosEgresos = egresos?.map(data => data.monto);
    const montosIngresos = ingresos?.map(data => data.monto);

    // TODO:  Ver tema fechas
    const fechasIngresos = ingresos?.map(data => data.fecha);
    const fechasEgresos = egresos?.map(data => data.fecha);

    
    const colores = [
        "rgb(113, 50, 255)",
        "rgb(139, 79, 255)",
        "rgb(180, 130, 255)",
        "rgb(213, 180, 255)",
        "rgb(242, 230, 255)"
    ];
    
    return (        
        <div>
            <h2 className="text-center text-2xl leading-10 mt-6 font-semibold">Ganancias</h2>


           {/*  {egresos?.slice(-5).reverse().map((transaccion, index) => {
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
            })} */}

        </div>


    )
}
