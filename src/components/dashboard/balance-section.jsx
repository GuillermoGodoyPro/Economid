import { useState } from "react";
import ModalTransaccion from "../pop-ups/ModalTransaccion";
import { getCategories } from "../../services/myfinances-api/categorias";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { getDollarExchangeRate } from "../../services/dolar/cotizacion-api";
import { texts } from "../../constants/myfinances-constants";
import useDark from "../../context/useDark";

export const BalanceSection = ({ auth, userId, setTransacciones }) => {
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);
    const [balanceId, setBalanceId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [dolarValue, setDolarValue] = useState(null);
    const [dolarDate, setDolarDate] = useState(null);
    const [divisa, setDivisa] = useState("ARS");

    const { dark } = useDark();

    const handleModalTransaccion = () => {
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await getBalanceByUserId(userId, config);
                if (res) {
                    setBalance(res);
                    setBalanceId(res.data.id);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const fetchCategorias = async () => {
            try {
                const { data: response } = await getCategories(config);
                setCategorias(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const fetchDollars = async () => {
            const { data } = await getDollarExchangeRate();
            setDolarValue(data.blue.value_sell);
            setDolarDate(data.last_update);
        };
        fetchBalance();
        fetchCategorias();
        fetchDollars();
    }, []);
    return (
        <div className={(dark ? 
        "bg-gray-200 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-full m-2 flex flex-col justify-around" 
        : "bg-violet-300 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-full m-2 flex flex-col justify-around"
        )}>
            {
                cargando ?
                    <div className="flex justify-center">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    balance ?
                        <div className='flex flex-col p-5 justify-center text-center'>
                            <div>
                                <div className="flex justify-end">
                                    <div>
                                        <select
                                            className={`${divisa === "ARS" ?
                                                "font-semibold bg-blue-200 shadow-md hover:shadow-blue-400" :
                                                "font-semibold bg-green-200 shadow-md hover:shadow-green-400"}`}
                                            name="divisa"
                                            id="divisa"
                                            value={divisa}
                                            onChange={e => setDivisa(e.target.value)}
                                        >
                                            <option className="font-semibold" value="ARS">ARS</option>
                                            <option className="font-semibold" value="USD">USD</option>
                                        </select>
                                    </div>
                                </div>
                                <h3 className='text-xl font-semibold text-violet-600 antialiased'>
                                    Saldo
                                </h3>
                                {
                                    divisa === "ARS"
                                        ?
                                        balance.data ?
                                            balance.data.saldo_Total < 0 ?
                                                <h1 className='text-red-500 font-bold text-5xl font-mono'>
                                                    <span className="mr-1">$</span>
                                                    {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                                </h1> :
                                                <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                    <span className="mr-1">$</span>
                                                    {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                                </h1> :
                                            balance.saldo_Total < 0 ?
                                                <h1 className='text-red-600 font-bold text-5xl font-mono'>
                                                    <span className="mr-1">$</span>
                                                    {parseFloat(balance.saldo_Total).toFixed(2)}
                                                </h1> :
                                                <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                    <span className="mr-1">$</span>
                                                    {parseFloat(balance.saldo_Total).toFixed(2)}
                                                </h1>
                                        :
                                        divisa === "USD"
                                            ?
                                            balance.data ?
                                                balance.data.saldo_Total < 0 ?
                                                    <h1 className='text-red-500 font-bold text-5xl font-mono'>
                                                        <span className="mr-1">U$S</span>
                                                        {parseFloat(balance.data.saldo_Total / dolarValue).toFixed(2)}
                                                    </h1> :
                                                    <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                        <span className="mr-1">U$S</span>
                                                        {parseFloat(balance.data.saldo_Total / dolarValue).toFixed(2)}
                                                    </h1> :
                                                balance.saldo_Total < 0 ?
                                                    <h1 className='text-red-600 font-bold text-5xl font-mono'>
                                                        <span className="mr-1">U$S</span>
                                                        {parseFloat(balance.saldo_Total / dolarValue).toFixed(2)}
                                                    </h1> :
                                                    <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                        <span className="mr-1">U$S</span>
                                                        {parseFloat(balance.saldo_Total / dolarValue).toFixed(2)}
                                                    </h1>
                                            :
                                            <div className="flex justify-center">
                                                <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                                            </div>
                                }
                                <br />
                                {
                                    dolarValue && dolarDate ?
                                        <div className="text-center rounded-2xl p-3 m-3 bg-green-100 shadow-md hover:shadow-green-400">
                                            <div className="flex flex-col items-center font-semibold mb-4 text-violet-600">
                                                <h3 className="w-24 text-white shadow-md font-semibold text-center rounded-3xl bg-green-400 font-mono">
                                                    <span className="mr-1">ARS</span>
                                                    {dolarValue}
                                                </h3>
                                            </div>
                                            <div className="flex flex-col items-center font-bold text-green-500 mt-4">
                                                <h3>Cotización Dólar</h3>
                                                <h3>{new Date(dolarDate).toLocaleDateString()}</h3>
                                            </div>
                                        </div> :
                                        <div></div>
                                }
                            </div>
                        </div> :
                        <div className='pt-14 flex flex-col p-5 items-center text-center' >
                            <h3 className="mb-10 text-lg">
                                {texts.WITH_NO_TRANSACTIONS}
                            </h3>
                        </div>
            }
            {
                !cargando ?
                    <div className="flex justify-center pb-5">
                        <button
                            type="button"
                            className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute shadow-md hover:shadow-violet-500'
                            onClick={handleModalTransaccion}
                        >
                            Nueva Transacción
                        </button>

                        {
                            modal &&
                            <ModalTransaccion
                                setModal={setModal}
                                animarModal={animarModal}
                                setAnimarModal={setAnimarModal}
                                categorias={categorias}
                                idBalance={balanceId}
                                setTransacciones={setTransacciones}
                                setBalance={setBalance}
                                setBalanceId={setBalanceId}
                            />
                        }
                    </div>
                    : <div></div>
            }
        </div>
    );
};