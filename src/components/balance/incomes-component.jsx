import { PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { filterByType } from "../../services/myfinances-api/transacciones";
import { texts, type } from "../../constants/myfinances-constants";
import Alerta from "../Alerta";
import { BalancePagination } from "./balance-pagination";
import useAuth from "../../context/useAuth";
import useDark from "../../context/useDark";
import { HttpStatusCode } from "axios";

export const BalanceIncomes = ({ user, config }) => {
    const { auth } = useAuth();
    const [incomes, setIncomes] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [incomesAlert, setIncomesAlert] = useState({});
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
        const fetchIncomes = async () => {
            const payload = {
                userId: user.id,
                tipo: type.INGRESO
            };
            try {
                const { data, status } = await filterByType(payload, 1, 5, config);
                if (status === HttpStatusCode.Ok) {
                    setIncomes(data.data);
                    setMetadata(data.meta);
                    if (!data.meta.hasNextPage) {
                        setHasNextPage(false);
                    }
                    else {
                        setHasNextPage(true);
                    }
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
                setIncomesAlert({
                    msg: texts.WITH_NO_INCOMES,
                    error: true
                });
                setTimeout(() => {
                    setIncomesAlert({});
                }, 3000);
            }
        };
        fetchIncomes();
    }, []);
    const { msg } = incomesAlert;
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
                >Ingresos</h2>
                {
                    incomesAlert ?
                        <div className="flex justify-center">
                            <div className="absolute">
                                {msg && <Alerta alerta={incomesAlert} />}
                            </div>
                        </div> : <div></div>
                }
                <div>
                    {cargando ?
                        <div className="flex justify-center">
                            <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                        </div> :
                        incomes.length
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
                                        {incomes?.map((transaccion, index) => {
                                            return (
                                                <tr className=" border-gray-200" key={index}>
                                                    <td className={(dark === "light" ?
                                                        "py-2 px-10 text-gray-800"
                                                        : "text-gray-100 font-semibold py-2 px-10"
                                                    )}>{transaccion.detalle}</td>
                                                    <td className="py-2 px-10 text-green-500 font-semibold font-mono">
                                                        <div className="w-28 flex justify-center rounded-md bg-green-300">
                                                            +${parseFloat(transaccion.monto).toFixed(2)}
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
                                    {texts.WITH_NO_INCOMES}
                                </h3>
                            </div>
                    }
                    {
                        metadata.totalCount > 10 ?
                            <div className="w-full">
                                <BalancePagination
                                    setTransactions={setIncomes}
                                    auth={auth}
                                    navigationNumbers={navigationNumbers}
                                    type={type.INGRESO}
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