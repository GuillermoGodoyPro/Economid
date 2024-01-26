import { useState } from "react";
import { GoalAmount } from "../pop-ups/ModalMontoMeta";
import { PulseLoader } from "react-spinners";
import useDark from "../../context/useDark";
import { GoalsPagination } from "./goals-pagination";

export const ActiveGoals = ({
    goals,
    auth,
    error,
    cargando,
    setLoading,
    setActiveGoals,
    setCompletedGoals,
    setCompletedGoalsMetadata,
    activeGoalsMetadata,
    completedGoalsMetadata,
    setTableGoals,
    setActiveGoalsMetadata
}) => {
    const activeGoals = goals?.filter(({ completada }) => !completada);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [goalId, setGoalId] = useState(0);
    const { dark } = useDark();
    
    const handleAddingModal = (goalId) => {
        setModal(true);
        setGoalId(goalId);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };

    return (
        <div className={(dark === "light" ?
            "w-2/5 bg-gray-200 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center"
            : "w-2/5 bg-gray-600 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center"
        )}
        >
            <h3 className={(dark === "light" ?
                "text-xl font-semibold text-violet-600 antialiased"
                : "text-xl font-semibold text-violet-400 antialiased"
            )}>Metas Activas</h3>

            {
                cargando ?
                    <div className="flex justify-around p-10 mx-20">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div> :
                    goals.length || (goals.length && !error) ?
                        <div className="flex flex-wrap justify-center">
                            {activeGoals?.splice(0, 4).map((goal, index) => {
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
                                                {
                                                    !goal.montoActual ?
                                                        "$0" :
                                                        `$${parseFloat(goal.montoActual.toFixed(2))}`
                                                }
                                                <span className="font-semibold text-xs text-gray-500">
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
                                                    {
                                                        !goal.montoActual ?
                                                            <div
                                                                className="bg-violet-500 p-0.5 text-center text-xs font-semibold font-mono text-white rounded-lg"
                                                                style={{ width: `${(0 / goal.montoFinal) * 100}%` }}
                                                            >
                                                                {`${(0 / goal.montoFinal) * 100}%`}
                                                            </div> :
                                                            <div
                                                                className="bg-violet-500 p-0.5 text-center text-xs font-semibold font-mono text-white rounded-lg"
                                                                style={{ width: `${((goal.montoActual / goal.montoFinal) * 100).toFixed(2)}%` }}
                                                            >
                                                                {`${((goal.montoActual / goal.montoFinal) * 100).toFixed(3)}%`}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-plus text-center"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Agregar monto"
                                            onClick={() => handleAddingModal(goal.id)}>
                                        </i>
                                        {modal &&
                                            <GoalAmount
                                                setModal={setModal}
                                                animarModal={animarModal}
                                                setAnimarModal={setAnimarModal}
                                                goalId={goalId}
                                                auth={auth}
                                                setActiveGoals={setActiveGoals}
                                                lastGoalIndex={index}
                                                activeGoalsMetadata={activeGoalsMetadata}
                                                setActiveGoalsMetadata={setActiveGoalsMetadata}
                                                setCompletedGoals={setCompletedGoals}
                                                completedGoalsMetadata={completedGoalsMetadata}
                                                setCompletedGoalsMetadata={setCompletedGoalsMetadata}
                                                setTableGoals={setTableGoals}
                                            />
                                        }
                                    </div>
                                );
                            })}
                        </div> :
                        <div></div>
            }
            {
                activeGoalsMetadata.totalCount > 4 ?
                    <div className="w-full">
                        <GoalsPagination
                            metadata={activeGoalsMetadata}
                            setActiveGoalsMetadata={setActiveGoalsMetadata}
                            setActiveGoals={setActiveGoals}
                            isCompleted={false}
                            setLoading={setLoading}
                        />
                    </div> : <div></div>
            }
        </div>
    );
};