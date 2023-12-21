import { ArcElement, BarElement, CategoryScale, Tooltip, Legend, Chart as ChartJS, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, ArcElement, BarElement, Tooltip, Legend, Title);

export const ExpensesChart = ({ egresos }) => {

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
                            borderWidth: 1,
                            hoverOffset: 25,
                            borderRadius: 15,
                            borderColor: "rgb(242, 230, 255)"
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
                        title: "",
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center"
                        }
                    }

                }}
                height={300}

            />
        </div>
    );
};
