import { useEffect, useState } from "react";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import { BalanceIncomes } from "../../components/balance/incomes-component";
import { BalanceExpenses } from "../../components/balance/expenses-component";
import { BalanceComponent } from "../../components/balance/balance-component";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";

const Balance = () => {
    const { auth } = useAuth();
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);

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
                const res = await getBalanceByUserId(user.id, config);
                if (res) {
                    setBalance(res);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);
    return (
        <div className="flex flex-col items-center">
            <div className="bg-inherit rounded p-2 m-1 mb-0 flex justify-around">
                <BalanceIncomes user={user} config={config}/>
                <BalanceExpenses user={user} config={config}/>
            </div>
            {/* Se podria agregar el histograma usando chart.js acá */}
            <div className="bg-inherit rounded p-2 m-1 mb-0">
                <BalanceComponent cargando={cargando} balance={balance} />
            </div>
            {/* O acá */}
        </div>
    );
};

export default Balance;