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
        "rgb(84, 255, 50)",
        "rgb(252, 52, 58)"
    ];

    return (
        <div className={(dark === "light" ?
            "mt-6 mb-60"
            :
            "bg-violet-300  rounded-lg px-6 mt-6 mb-60"
        )}
        >
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
    );
};
