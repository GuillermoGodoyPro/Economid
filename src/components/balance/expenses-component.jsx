import { PulseLoader } from "react-spinners";
import { texts, type } from "../../constants/myfinances-constants";
import { useEffect, useState } from "react";
import { filterByType } from "../../services/myfinances-api/transacciones";
import Alerta from "../Alerta";
import { BalancePagination } from "./balance-pagination";
import useAuth from "../../context/useAuth";
import useDark from "../../context/useDark";

export const BalanceExpenses = ({ user, config }) => {
    const { auth } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expensesAlert, setExpensesAlert] = useState({});
    const [metadata, setMetadata] = useState({});
    const [hasNextPage, setHasNextPage] = useState(true);
    const pageNumber = Math.ceil(metadata.totalCount / metadata.pageSize);
    const { dark } = useDark();


    const generatePageNumbers = (pageNumber) => {
        let navigationNumbers = [];
        for (let i = 1; i <= pageNumber; i++) navigationNumbers.push(i);
        return navigationNumbers;
    };
    const navigationNumbers = generatePageNumbers(pageNumber);

    useEffect(() => {
        const fetchExpenses = async () => {
            const payload = {
                userId: user.id,
                tipo: type.EGRESO
            };
            try {
                const { data, status } = await filterByType(payload, 1, 5, config);
                if (status === 200) {
                    setExpenses(data.data);
                    setMetadata(data.meta);
                    if (!data.meta.hasNextPage) {
                        setHasNextPage(false);
                    }
                    else {
                        setHasNextPage(true);
                    }
                    setLoading(false);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
                setExpensesAlert({
                    msg: texts.WITH_NO_EXPENSES,
                    error: true
                });
                setTimeout(() => {
                    setExpensesAlert({});
                }, 3000);
            }
        };
        fetchExpenses();
    }, []);
    const { msg } = expensesAlert;
    return (
        <div className={(dark === "light" ?
            "bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-violet-400 mx-2"
            : "bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-violet-400 mx-2"
        )}
        >
            <div>
                <h2 className={(dark === "light" ?
                    "p-1 text-center font-semibold text-violet-600"
                    : "p-1 text-center font-semibold text-violet-400"
                )}
                >Gastos</h2>
                {
                    expensesAlert ?
                        <div className="flex justify-center">
                            <div className="absolute">
                                {msg && <Alerta alerta={expensesAlert} />}
                            </div>
                        </div> : <div></div>
                }
                <div className="bg-inherit rounded-lg">
                    {cargando ?
                        <div className="flex justify-center">
                            <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                        </div> :
                        expenses.length
                            ?
                            <div className="flex justify-center mb-5">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={(dark === "light" ?
                                                "text-center py-2 px-10 font-semibold text-violet-600"
                                                : "text-center py-2 px-10 font-semibold text-violet-400"
                                            )}
                                            >Transacción</th>
                                            <th className={(dark === "light" ?
                                                "text-center py-2 px-10 font-semibold text-violet-600"
                                                : "text-center py-2 px-10 font-semibold text-violet-400"
                                            )}
                                            >Monto</th>
                                            <th className={(dark === "light" ?
                                                "text-center py-2 px-10 font-semibold text-violet-600"
                                                : "text-center py-2 px-10 font-semibold text-violet-400"
                                            )}
                                            >Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses?.map((transaccion, index) => {
                                            return (
                                                <tr className=" border-gray-200" key={index}>
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-10 text-gray-800"
                                                        : "text-gray-100 font-semibold py-2 px-10"
                                                    )}>{transaccion.detalle}</td>
                                                    <td className="py-2 px-10 text-red-500 font-semibold font-mono">
                                                        <div className="w-28 flex justify-center">
                                                            -${parseFloat(transaccion.monto).toFixed(2)}
                                                        </div>
                                                    </td>
                                                    {
                                                        !transaccion.estaActiva ?
                                                            <td className="py-2 px-10 text-orange-400 font-semibold">
                                                                <div className="w-24 text-center rounded-md bg-orange-200">
                                                                    Anulada
                                                                </div>
                                                            </td> :
                                                            <td className="py-2 px-10 text-green-500 font-semibold">
                                                                <div className="w-24 text-center rounded-md bg-green-200">
                                                                    Activa
                                                                </div>
                                                            </td>
                                                    }
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="flex justify-center p-32">
                                <h3 className={(dark === "light" ?
                                    "text-lg text-center text-black" :
                                    "text-lg text-center text-white")}>
                                    {texts.WITH_NO_EXPENSES}
                                </h3>
                            </div>
                    }
                    {
                        metadata.totalCount > 10 ?
                            <div className="w-full">
                                <BalancePagination
                                    setTransactions={setExpenses}
                                    auth={auth}
                                    navigationNumbers={navigationNumbers}
                                    type={type.EGRESO}
                                    hasNextPage={hasNextPage}
                                    setHasNextPage={setHasNextPage}
                                    setLoading={setLoading}
                                />
                            </div> : <div></div>
                    }
                </div>
            </div>
        </div>
    );
};