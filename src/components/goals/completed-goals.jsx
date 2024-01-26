import { PulseLoader } from "react-spinners";
import useDark from "../../context/useDark";
import { GoalsPagination } from "./goals-pagination";
import useAuth from "../../context/useAuth";
import { getByState, withdrawGoal } from "../../services/myfinances-api/metaFinanciera";
import { texts } from "../../constants/myfinances-constants";
import { useState } from "react";
import { HttpStatusCode } from "axios";
import { getUserToken } from "../../services/token/tokenService";

export const CompletedGoals = ({
    goals,
    error,
    cargando,
    setCargando,
    completedGoalsMetadata,
    setCompletedGoalsMetadata,
    setCompletedGoals,
    setTableGoals,
    setAlerta
}) => {
    const { dark } = useDark();
    const { auth } = useAuth();
    const [goalError, setError] = useState(null);
    const [goalLoading, setGoalLoading] = useState(false);
    const completedGoals = goals?.filter(({ completada, retirada }) => completada && !retirada);
    const user = getUserToken();

    const handleGoalWithdrawal = async (goalId) => {
        setGoalLoading({
            ...goalLoading,
            [goalId]: true
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };
        try {
            const { data, status } = await withdrawGoal(goalId, config);
            if (status === HttpStatusCode.Ok) {
                setGoalLoading({
                    ...goalLoading,
                    [goalId]: false
                });
                setAlerta({
                    msg: texts.ON_WITHDRAWN_GOAL,
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                }, 1500)
                setTimeout( async () => {
                    setCompletedGoals(completedGoals => completedGoals.map((goal) => {
                        return goalId === goal.id ? { ...goal, retirada: data.retirada } : goal;
                    }));
                    setTableGoals(tableGoals => tableGoals.map((goal) => {
                        return goalId === goal.id ? { ...goal, retirada: data.retirada } : goal;
                    }));                    
                    const payload = {
                        userId: user.id,
                        completada: true
                    };

                    let page = completedGoalsMetadata?.page ?? 1;
                    const resetPageEnabled =
                        page !== 1 &&
                        (
                            !completedGoalsMetadata?.hasNextPage &&
                            completedGoals?.length === 1
                        );

                    if (resetPageEnabled) {
                        page = page - 1;
                    }
                    const { data: response, status } = await getByState(payload, page, 4, config);
                    if (status === HttpStatusCode.Ok) {
                        setCompletedGoals(response.data);
                        setCompletedGoalsMetadata(response.meta);
                    }
                }, 500);
            }
        } catch (error) {
            setGoalLoading({
                ...goalLoading,
                [goalId]: false
            });
            setError(error);
        }
    };
    return (
        <div className={(dark === "light" ?
            "w-2/5 bg-gray-200 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center flex flex-col items-center"
            : "w-2/5 bg-gray-600 p-10 rounded-lg shadow-md hover:shadow-violet-400 m-10 text-center"
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
                            {completedGoals?.slice(0, 4).map((goal, index) => {
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
                                        {
                                            goalLoading[goal.id] ?
                                                <div className="flex justify-center">
                                                    <PulseLoader loading={goalLoading[goal.id]} color="rgb(113, 50, 255)" size={10} />
                                                </div> :
                                                <div className="flex justify-around">
                                                    <div className="w-32 text-center rounded-md bg-green-200">
                                                        <h5
                                                            className="text-xl font-semibold text-center text-green-500 font-mono"
                                                        >
                                                            Completada
                                                        </h5>
                                                    </div>
                                                    <i
                                                        className="fa-solid fa-arrow-up-from-bracket"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Retirar"
                                                        onClick={() => handleGoalWithdrawal(goal.id)}
                                                    ></i>
                                                </div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                        : <div></div>
            }
            {
                completedGoalsMetadata.totalCount > 4 ?
                    <div className="w-full">
                        <GoalsPagination
                            metadata={completedGoalsMetadata}
                            setCompletedGoals={setCompletedGoals}
                            setCompletedGoalsMetadata={setCompletedGoalsMetadata}
                            isCompleted={true}
                            setLoading={setCargando} />
                    </div> : <div></div>
            }
        </div>
    );
};