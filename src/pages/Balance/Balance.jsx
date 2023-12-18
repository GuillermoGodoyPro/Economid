import { useEffect, useState } from "react";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import { BalanceIncomes } from "../../components/balance/incomes-component";
import { BalanceExpenses } from "../../components/balance/expenses-component";
import { BalanceComponent } from "../../components/balance/balance-component";
import { GananciaChart } from "../../components/balance/chart/ganancia-chart";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";
import { getAll } from "../../services/myfinances-api/transacciones";

const Balance = () => {
    const { auth } = useAuth();
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    
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

        const fetchTransacciones = async () => {
            try {
                const { data: response, status } = await getAll({ userId: user.id }, 1, 10, config);
                if (status === 200) {                   
                    setTransacciones(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
               /*  setAlertaTransacciones({
                    msg: texts.WITH_NO_TRANSACTIONS,
                    error: true
                }); */
                /* setTimeout(() => {
                    setAlertaTransacciones({});
                }, 3000); */
            }
        };    
        
        fetchTransacciones();
        fetchBalance();

        

    }, []);

    console.log(user)

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

            <GananciaChart transacciones={transacciones} /> 
            

            {/*  */}

        </div>
    );
};

export default Balance;