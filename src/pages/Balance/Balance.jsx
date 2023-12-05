import { useEffect, useState } from "react";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import { getAll } from "../../services/myfinances-api/transacciones";
import { texts } from "../../constants/myfinances-constants";
import Alerta from "../../components/Alerta";
import { BalanceIncomes } from "../../components/balance/incomes-component";
import { BalanceExpenses } from "../../components/balance/expenses-component";
import { BalanceComponent } from "../../components/balance/balance-component";
import { GananciaChart } from "../../components/balance/chart/ganancia-chart";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";

const Balance = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([{}]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertaTransacciones, setAlertaTransacciones] = useState({});
    const [balance, setBalance] = useState(null);
    
    
    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    useEffect(() => {
        const fetchTransacciones = async () => {
            try {
                const { data: response, status } = await getAll(user.id, config);
                if (status === 200) {
                    setTransacciones(response);
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
        fetchTransacciones();
        fetchBalance();

        

    }, []);
    const { msg } = alertaTransacciones;
    return (
        <div className="flex flex-col items-center">
            {alertaTransacciones ?
                <div className="flex justify-end">
                    <div className="fixed">
                        {msg && <Alerta alerta={alertaTransacciones} />}
                    </div>
                </div> : <div></div>}
            <div className="bg-inherit rounded p-2 m-1 mb-0 flex justify-around">
                <BalanceIncomes cargando={cargando} transacciones={transacciones} />
                <BalanceExpenses cargando={cargando} transacciones={transacciones} />
            </div>
            {/* Se podria agregar el histograma usando chart.js acá */}
            <div className="bg-inherit rounded p-2 m-1 mb-0">
                <BalanceComponent cargando={cargando} balance={balance} />
            </div>
            {/* O acá */}

            <GananciaChart transacciones={transacciones} />
            

            {/*  */}

        </div>
    );
};

export default Balance;