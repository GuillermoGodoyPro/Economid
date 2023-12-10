import { PulseLoader } from "react-spinners";

export const CompletedGoals = ({ goals, error, cargando }) => {
    const completedGoals = goals?.filter(({ completada }) => completada);
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center grid grid-flow-row auto-rows-max">
            <h3 className="font-semibold text-violet-600">Metas Completadas</h3>

            {
                cargando ?
                    <div className="flex justify-around">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div> :
                    completedGoals && !error ?
                        <div className="flex flex-wrap justify-around">
                            {completedGoals.slice(0, 5).map((goal, index) => {
                                return (
                                    <div
                                        className="w-64 h-64 m-3 rounded-lg bg-gray-100 p-8 w-50% shadow-md hover:shadow-violet-400 dark:bg-neutral-700 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                                        key={index}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-500">{goal.titulo}</span>
                                            <span className="font-semibold text-xs text-violet-500 font-mono">
                                                {`$${parseFloat(goal.montoActual.toFixed(2))}`}
                                                <span className="font-semibold text-gray-500">
                                                    {` / $${parseFloat(goal.montoFinal.toFixed(2))}`}
                                                </span>
                                            </span>
                                        </div>
                                        <hr />
                                        <div className="mb-10 mt-10" style={{ width: "100%", display: "flex" }}>
                                            <div className="w-full">
                                                <span className="font-semibold text-xs text-gray-500">
                                                    Progreso
                                                </span>
                                                <div className="w-full rounded-lg bg-gray-400">
                                                    <div
                                                        className="bg-violet-500 p-0.5 text-center text-xs font-semibold font-mono text-white rounded-lg"
                                                        style={{ width: `${(goal.montoActual / goal.montoFinal) * 100}%` }}
                                                    >
                                                        {`${((goal.montoActual / goal.montoFinal) * 100).toFixed(2)}%`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="w-32 text-center rounded-md bg-green-200">
                                                <h5
                                                    className="text-xl font-semibold italic text-center text-green-500">
                                                    Completada
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        : <div></div>
            }

        </div>
    );
};