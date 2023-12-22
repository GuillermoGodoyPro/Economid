import { useEffect, useState } from "react";
import useAuth from "../../context/useAuth";
import { getAll } from "../../services/myfinances-api/metaFinanciera";
import { getUserToken } from "../../services/token/tokenService";
import useDark from "../../context/useDark";
import { PulseLoader } from "react-spinners";

export const GoalsTable = () => {
    const { auth } = useAuth();
    const { dark } = useDark();
    const [goals, setGoals] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const goalsPayload = {
                    userId: user.id
                };
                const { data: goalsResponse, status: goalsStatus } = await getAll(goalsPayload, 1, 10, config);
                if (goalsStatus === 200) {
                    setGoals(goalsResponse.data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);
    return (
        <div className="t-table">
            {
                loading ?
                    <div className="flex justify-center">
                        <PulseLoader loading={loading} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    <div className="flex justify-center">
                        <table className={(dark === "light" ?
                            "w-full"
                            :
                            "bg-gray-600 w-full"
                        )}
                        >
                            <thead>
                                <tr>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-4 font-semibold text-violet-600"
                                        :
                                        "text-left py-2 px-4 font-semibold text-violet-400"
                                    )}
                                    >Meta</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-4 font-semibold text-violet-600"
                                        :
                                        "text-left py-2 px-4 font-semibold text-violet-400"
                                    )}
                                    >Monto Actual</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-4 font-semibold text-violet-600"
                                        :
                                        "text-left py-2 px-4 font-semibold text-violet-400"
                                    )}
                                    >Monto Final</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-4 font-semibold text-violet-600"
                                        :
                                        "text-left py-2 px-4 font-semibold text-violet-400"
                                    )}
                                    >Progreso</th>
                                    <th className={(dark === "light" ?
                                        "text-left py-2 px-4 font-semibold text-violet-600"
                                        :
                                        "text-left py-2 px-4 font-semibold text-violet-400"
                                    )}
                                    >Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goals?.map((goal, index) => {
                                    return (
                                        <tr className={(dark === "light" ?
                                            "border-b border-gray-200 "
                                            :
                                            "border-b border-gray-500 "
                                        )}
                                            key={index}>
                                            <td className={(dark === "light" ?
                                                "py-2 px-4 text-gray-800 font-semibold font-mono"
                                                :
                                                "py-2 px-4 text-gray-200 font-semibold font-mono"
                                            )}
                                            >{goal.titulo}</td>
                                            <td className={(dark === "light" ?
                                                "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                :
                                                "py-2 px-4 text-gray-300 font-semibold font-mono"
                                            )}>
                                                ${parseFloat(goal.montoActual).toFixed(2)}
                                            </td>
                                            <td className={(dark === "light" ?
                                                "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                :
                                                "py-2 px-4 text-gray-300 font-semibold font-mono"
                                            )}>
                                                ${parseFloat(goal.montoFinal).toFixed(2)}
                                            </td>
                                            <td className={(dark === "light" ?
                                                "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                :
                                                "py-2 px-4 text-gray-300 font-semibold font-mono"
                                            )}>
                                                {`${((goal.montoActual / goal.montoFinal) * 100).toFixed(2)}%`}
                                            </td>

                                            {
                                                !goal.completada
                                                    ?
                                                    <td className="py-2 px-4  text-orange-400 font-semibold font-mono">
                                                        En progreso
                                                    </td> :
                                                    <td className="py-2 px-4  font-semibold font-mono text-green-500">
                                                        Completada
                                                    </td>
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
}