import { ArcElement, BarElement, CategoryScale, Tooltip, Legend, Chart as ChartJS, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useDark from "../../../context/useDark";

ChartJS.register(CategoryScale, ArcElement, BarElement, Tooltip, Legend, Title);

export const ExpensesChart = ({ egresos }) => {

    const { dark } = useDark();
    const detalles = egresos?.map(({ detalle }) => detalle);
    const montos = egresos?.map(data => data.monto);
    const colores = [
        "rgb(113, 50, 255)",
        "rgb(139, 79, 255)",
        "rgb(180, 130, 255)",
        "rgb(213, 180, 255)",
        "rgb(242, 230, 255)"
    ];

    return (
        <div className="chart-container">
            <Doughnut
                data={{
                    labels: detalles,
                    datasets: [
                        {
                            label: "",
                            data: montos,
                            backgroundColor: colores,
                            borderWidth: 0,
                            hoverOffset: 25,
                            borderRadius: 15,
                            spacing: 2
                        }
                    ]
                }}
                options={{
                    color: dark === "light" ? "black" : "white",
                    layout: {
                        padding: 16
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
                height={300}

            />
        </div>
    );
};
