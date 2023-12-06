/* import {HistogramaChart} from './histograma-chart'*/
import { 
    BarElement,
    CategoryScale, // x
    LinearScale, // y
    Tooltip,
    Legend,
    Chart as ChartJS,
    Title

} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register( CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);
import { texts, type } from "../../../constants/myfinances-constants";


export const GananciaChart = ({transacciones}) => {
    
    const ingresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.INGRESO); 
    const egresos = transacciones?.filter(({ tipoTransaccion }) => tipoTransaccion === type.EGRESO);

    // TODO:  Ver tema fechas. Posiblemente dentro de la fx sumarMontos, se puedan filtrar los totales por mes
    const fechasIngresos = ingresos?.map(data => data.fecha);
    const fechasEgresos = egresos?.map(data => data.fecha);

    const sumarMontos = (transacciones) => {       
        return transacciones?.reduce((total, transaccion) => total + transaccion.monto, 0) || 0;
    };

    const totalIngresos = sumarMontos(ingresos).toFixed(2);
    const totalEgresos = sumarMontos(egresos).toFixed(2);

  /*   console.log(totalIngresos)
    console.log(totalEgresos) */    

    const detalles = egresos?.map(({ detalle }) => detalle);
    const montos = totalIngresos
    const colores = [
        "rgb(84, 255, 50)",
        "rgb(252, 52, 58)"
    ];
    
    return (        
        <div>
            <h2 className="text-center text-2xl leading-10 mt-6 font-semibold">Ganancias</h2>

            <div className="chart-container">
            <Bar 
                width={730} height={250}
                data={{
                    
                    labels: detalles,
                    datasets: [
                        {
                            label: "",
                            data: montos,
                            backgroundColor: colores,
                            borderColor: "rgb(242, 230, 255)",
                            borderWidth: 1,
                            hoverOffset: 25,
                            borderRadius: 15,
                        }
                    ]
                }}
                options={{
                    title: {
                        display: true,
                        text: "Ultimos gastos por categoria"
                    },
                    layout: {
                        padding: 16
                    },
                    plugins: {
                        title: "hola",
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center"
                        }
                    }

                }}
                

            >
                
            </Bar>                 
               
        </div>


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
