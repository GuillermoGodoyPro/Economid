import React from "react";
import { ArcElement, BarElement, CategoryScale, Tooltip, Legend ,Chart as ChartJS, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Data } from "../utils/Data.js";

ChartJS.register(CategoryScale, ArcElement, BarElement, Tooltip, Legend, Title);

export const GraficoTransacciones = ({ transacs }) => {

    const categorias = transacs?.map(({ categoria }) => categoria.titulo);
    const montos = transacs?.map(data => data.monto);
    const colores = [
        "rgb(113, 50, 255)",
        "rgb(139, 79, 255)",
        "rgb(180, 130, 255)",
        "rgb(213, 180, 255)",
        "rgb(242, 230, 255)"
    ];

    console.log(categorias);
    console.log(montos);

    return (
        <div className="chart-container">
            <Doughnut
                data={{
                    labels: categorias,
                    datasets: [
                        {
                            label: "",
                            data: montos,
                            backgroundColor: colores,
                            borderWidth: 1,
                            hoverOffset: 25,
                            borderRadius: 15
                        }
                    ]
                }}
                options={{
                    title: {
                        display: true,
                        text: "Ultimos gastos por categoria"
                    },
                    layout: {
                        padding: 20
                    },
                    plugins: {
                        title: "",
                        legend: {
                            display: true,
                            position: "left"
                        }
                    }
                }}
                height={450}
                width={450}
            />
        </div>
    );
};
