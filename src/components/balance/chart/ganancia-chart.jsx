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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);
import { type } from "../../../constants/myfinances-constants";
import useDark from "../../../context/useDark";


export const GananciaChart = ({ transacciones }) => {
    const { dark } = useDark();
    const transaccionesActivas = transacciones?.filter(({ estaActiva }) => estaActiva);

    const sumarMontos = (transaccionesActivas) => {
        const montosPorMes = {};

        transaccionesActivas?.forEach((transaccion) => {

            const fecha = new Date(transaccion.fecha);
            const mesAnio = fecha.toLocaleString("es-ES", { month: "long", year: "numeric" });
            const monto = transaccion.monto;

            if (!montosPorMes[mesAnio]) {
                montosPorMes[mesAnio] = { mes: mesAnio, ingresos: 0, egresos: 0 };
            }

            if (transaccion.tipoTransaccion === type.INGRESO) {
                montosPorMes[mesAnio].ingresos += monto;
            } else if (transaccion.tipoTransaccion === type.EGRESO) {
                montosPorMes[mesAnio].egresos += monto;
            }
        });

        const montosArray = Object.values(montosPorMes);
        return montosArray;
    };
    const montosTotales = sumarMontos(transaccionesActivas);
    const datosOrdenados = montosTotales.sort((a, b) => {
        const fechaA = new Date(a.mes);
        const fechaB = new Date(b.mes);
        return fechaA - fechaB;
    });

    const fechasAcumuladas = datosOrdenados.slice(0, 5).map(({ mes }) => mes);
    const ingresosTotales = montosTotales.map(({ ingresos }) => ingresos);
    const egresosTotales = montosTotales.map(({ egresos }) => egresos);

    const colores = [
        "#22C55E",
        "#EF4444"
    ];

    return (
        <div className={(dark === "light" ?
            "bg-gray-200 rounded-lg px-6 mt-6 mb-60 p-10 shadow-md hover:shadow-violet-400"
            :
            "bg-gray-600 rounded-lg px-6 mt-6 mb-60 p-10 shadow-md hover:shadow-violet-400"
        )}
        >
            <h3 className={(dark === "light" ?
                "text-xl text-center font-semibold text-violet-600 antialiased"
                : "text-xl text-center font-semibold text-violet-400 antialiased"
            )}>
                Resumen últimas 10 transacciones
            </h3>
            <div className="chart-container">
                <Bar
                    width={500} height={250}
                    color={dark === "light" ? "white" : "black"}
                    data={{
                        labels: fechasAcumuladas,
                        datasets: [
                            {
                                label: "Ingresos",
                                data: ingresosTotales,
                                backgroundColor: colores[0], // Color para ingresos
                                borderWidth: 0,
                                hoverOffset: 15,
                                borderRadius: 15
                            },
                            {
                                label: "Egresos",
                                data: egresosTotales,
                                backgroundColor: colores[1], // Color para egresos
                                borderWidth: 0,
                                hoverOffset: 15,
                                borderRadius: 15,
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        color: dark === "light" ? "black" : "white",
                        scales: {
                            x: {
                                ticks: {
                                    color: dark === "light" ? "#4B5563" : "white",
                                    font: {
                                        size: 12,
                                        weight: 500,
                                        family: "Consolas"
                                    }
                                },
                                grid: {
                                    color: dark === "light" ? "#E5E7EB" : "#4B5563"
                                }
                            },
                            y: {
                                ticks: {
                                    color: dark === "light" ? "#4B5563" : "white",
                                    font: {
                                        size: 12,
                                        weight: 500,
                                        family: "Consolas"
                                    }
                                },
                                grid: {
                                    color: dark === "light" ? "#4B5563" : "gray"
                                }
                            }
                        },
                        layout: {
                            padding: 1
                        },
                        plugins: {
                            title: "",
                            legend: {
                                display: true,
                                position: "bottom",
                                align: "center",
                                labels: {
                                    font: {
                                        size: 12,
                                        weight: 500,
                                        family: "Consolas"
                                    },
                                    color: dark === "light" ? "#4B5563" : "white",
                                    boxWidth: 8,
                                    boxHeight: 8,
                                    usePointStyle: true,
                                    pointStyle: "circle"
                                }
                            }
                        }
                    }}
                >
                </Bar>
            </div>
        </div>
    );
};
