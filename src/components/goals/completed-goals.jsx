import { PulseLoader } from "react-spinners";
import useDark from "../../context/useDark";
import { GoalsPagination } from "./goals-pagination";

export const CompletedGoals = ({ 
    goals, 
    error, 
    cargando,
    setCargando,
    completedGoalsMetadata, 
    setCompletedGoals 
}) => {
    const { dark } = useDark();

    return (
        <div className={(dark === "light" ?
            "bg-gray-200 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center"
            : "bg-gray-600 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center"
        )}
        >
            <h3 className={(dark === "light" ?
                "text-xl font-semibold text-violet-600 antialiased"
                : "text-xl font-semibold text-violet-400 antialiased"
            )}>Metas Completadas</h3>

            {
                cargando ?
                    <div className="flex justify-around p-10 mx-20">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div> :
                    goals.length || (goals.length && !error) ?
                        <div className="flex flex-wrap justify-center">
                            {goals?.slice(0, 2).map((goal, index) => {
                                return (
                                    <div
                                        className={(dark === "light" ?
                                            "w-64 h-64 m-3 rounded-lg bg-gray-100 p-8 w-50% shadow-md hover:shadow-violet-400 dark:bg-neutral-700 duration-100"
                                            : "w-64 h-64 m-3 rounded-lg bg-gray-200 p-8 w-50% shadow-md hover:shadow-violet-400 dark:bg-neutral-700 duration-100"
                                        )}
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
            {
                completedGoalsMetadata.totalCount > 2 ?
                    <div className="w-full">
                        <GoalsPagination
                            metadata={completedGoalsMetadata}
                            setCompletedGoals={setCompletedGoals}
                            completed={true}
                            setLoading={setCargando}
                        />
                    </div> : <div></div>
            }
        </div>
    );
};