import { useEffect, useState } from "react";
import useAuth from "../../context/useAuth";
import { getAll } from "../../services/myfinances-api/metaFinanciera";
import { getUserToken } from "../../services/token/tokenService";
import useDark from "../../context/useDark";
import { PulseLoader } from "react-spinners";

export const GoalsTable = ({ loading, goals }) => {
    const { dark } = useDark();
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
                                            {
                                                !goal.montoActual ?
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                        :
                                                        "py-2 px-4 text-gray-300 font-semibold font-mono"
                                                    )}>
                                                        ${parseFloat(0).toFixed(2)}
                                                    </td> :
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-4 text-gray-400 font-semibold font-mono"
                                                        :
                                                        "py-2 px-4 text-gray-300 font-semibold font-mono"
                                                    )}>
                                                        ${parseFloat(goal.montoActual).toFixed(2)}
                                                    </td>
                                            }
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