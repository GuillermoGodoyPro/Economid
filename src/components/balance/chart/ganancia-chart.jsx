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


    /* Se obtienen los montos (ingresos y egresos) por mes */

    const sumarMontos = (transacciones) => {
        // Inicializar un objeto para almacenar los montos por mes
        const montosPorMes = {};
        
        // Iterar sobre las transacciones
        transacciones?.forEach((transaccion) => {
            const fecha = new Date(transaccion.fecha);
            const mesAnio = fecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            const monto = transaccion.monto;
        
            // Determinar si es ingreso o egreso
            if (!montosPorMes[mesAnio]) {
            montosPorMes[mesAnio] = { mes: mesAnio, ingresos: 0, egresos: 0 };
            }
        
            if (transaccion.tipoTransaccion === type.INGRESO) {
            montosPorMes[mesAnio].ingresos += monto;
            } else if (transaccion.tipoTransaccion === type.EGRESO) {
            montosPorMes[mesAnio].egresos += monto;
            }
        });
        
        // Convertir el objeto a un array de objetos
        const montosArray = Object.values(montosPorMes);
        
        return montosArray;
    }; 

    // Llamamos la función   
    const montosTotales = sumarMontos(transacciones)

    /* En esta parte se obtienen los resultados buscados */
    const datosOrdenados = montosTotales.sort((a, b) => {
        const fechaA = new Date(a.mes);
        const fechaB = new Date(b.mes);
        return fechaB - fechaA;
    });
    
    // Obtener las fechas acumuladas de los últimos 5 elementos (los más recientes)
    const fechasAcumuladas = datosOrdenados.slice(0, 5).map(({ mes }) => mes);
    /* TODO: testear si hay que poner el mismo slice en ingresosTotales y egresosTotales*/

    // Obtener un array con las sumas de ingresos y egresos por fecha acumulada
    const ingresosTotales = montosTotales.map(({ ingresos }) => ingresos);
    const egresosTotales = montosTotales.map(({ egresos }) => egresos);

    
    const colores = [
        "rgb(84, 255, 50)",
        "rgb(252, 52, 58)"
    ];
    
    return (        
        <div className="mt-6 mb-60">
            <h2 className="text-center text-2xl leading-10 mt-6 font-semibold">Ganancias</h2>

            <div className="chart-container ">
                <Bar 
                    width={730} height={250}
                    data={{
                        labels: fechasAcumuladas,
                        datasets: [
                        {
                            label: "Ingresos",
                            data: ingresosTotales,
                            backgroundColor: colores[0], // Color para ingresos
                            borderColor: "rgb(242, 230, 255)",
                            borderWidth: 1,
                            hoverOffset: 15,
                            borderRadius: 15,
                        },
                        {
                            label: "Egresos",
                            data: egresosTotales,
                            backgroundColor: colores[1], // Color para egresos
                            borderColor: "rgb(242, 230, 255)",
                            borderWidth: 1,
                            hoverOffset: 15,
                            borderRadius: 15,
                        }
                        ]
                    }}
                    options={{
                        layout: {
                            padding: 1
                        },
                        plugins: {
                            title: "",
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


           

        </div>


    )
}
