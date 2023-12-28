import { useState, useEffect } from "react";
import useAuth from "../../context/useAuth";
import { getAll } from "../../services/myfinances-api/transacciones";
import { getAll as getAllGoals } from "../../services/myfinances-api/metaFinanciera";
import { getUserToken } from "../../services/token/tokenService";
import { ChartSection } from "../../components/dashboard/chart/chart-section";
import { BalanceSection } from "../../components/dashboard/balance-section";
import { AllTransactionsSection } from "../../components/dashboard/transactions/all-transactions-section";
import { IncomesSection } from "../../components/dashboard/transactions/incomes-section";
import { ExpensesSection } from "../../components/dashboard/transactions/expenses-section";
import { LastGoal } from "../../components/dashboard/last-goals-section";
import Alerta from "../../components/Alerta";
import { texts } from "../../constants/myfinances-constants";
import useDark from "../../context/useDark";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";


const Dashboard = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([{}]);
    const [activeGoals, setActiveGoals] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertaMeta, setAlertaMeta] = useState({});
    const [alertaTransacciones, setAlertaTransacciones] = useState({});
    const [balance, setBalance] = useState({});
    const { dark } = useDark();


    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const { data, status } = await getBalanceByUserId(user.id, config);
                if (status === 200) {
                    setBalance(data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const fetchTransacciones = async () => {
            try {
                const { data: response, status } = await getAll({ userId: user.id }, 1, 10, config);
                if (status === 200) {
                    const activeTransactions = response.data.filter((t) => t.estaActiva);
                    setTransacciones(activeTransactions);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
                setAlertaTransacciones({
                    msg: texts.WITH_NO_TRANSACTIONS,
                    error: true
                });
                setTimeout(() => {
                    setAlertaTransacciones({});
                }, 3000);
            }
        };
        const fetchGoals = async () => {
            try {
                const { data, status } = await getAllGoals({userId: user.id}, 1, 5, config);
                if (status === 200) {
                    setActiveGoals(data.data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
                setAlertaMeta({
                    msgMeta: texts.WITH_NO_GOALS,
                    error: true
                });
                setTimeout(() => {
                    setAlertaMeta({});
                }, 3000);
            }
        };
        fetchBalance();
        fetchTransacciones();
        fetchGoals();
    }, []);

    const { msg } = alertaTransacciones;
    return (
        <div className="flex flex-col items-around p-10">
            {
                alertaTransacciones ?
                    <div className="flex justify-end">
                        <div className="absolute">
                            {msg && <Alerta alerta={alertaTransacciones} />}
                        </div>
                    </div> : <div></div>
            }
            <h2 className={(dark === "light" ?
                "mx-5 text-violet-800 font-bold uppercase "
                :
                "mx-5 text-gray-200 font-bold uppercase "
            )}
            >Hola, {user.nombre}</h2>
            <div className="p-2 m-6 mb-0 bg-inherit rounded flex justify-between">
                <BalanceSection
                    auth={auth}
                    userId={user.id}
                    setTransacciones={setTransacciones}
                    balance={balance}
                    setBalance={setBalance} />
                <ChartSection
                    cargando={cargando}
                    transacciones={transacciones} />
                <LastGoal
                    activeGoals={activeGoals}
                    auth={auth}
                    cargando={cargando}
                    setActiveGoals={setActiveGoals}
                    balance={balance}
                    setBalance={setBalance}
                    setTransacciones={setTransacciones} />
            </div>
            <div className={(dark === "light" ?
                "bg-inherit p-10"
                :
                "bg-inherit p-10"
            )}
            >
                <AllTransactionsSection
                    className={(dark === "light" ?
                        "bg-inherit p-10"
                        :
                        "bg-gray-600 p-10"
                    )}
                    transacciones={transacciones} cargando={cargando} />
            </div>
            <div className=" bg-inherit rounded flex justify-center">
                <IncomesSection cargando={cargando} transacciones={transacciones} />
                <ExpensesSection cargando={cargando} transacciones={transacciones} />
            </div>
        </div>
    );
};

export default Dashboard;

