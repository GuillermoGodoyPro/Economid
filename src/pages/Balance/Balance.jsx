import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FiltrarPorTipo } from "../../services/transacciones";
import { GetBalanceByPEId } from "../../services/balance";
import { getUserToken } from "../../services/token/tokenService";

const Balance = () => {

    const { auth } = useAuth();
    const [ingresos, setIngresos] = useState([]);
    const [balance, setBalance] = useState(null);
    const [egresos, setEgresos] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);


    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    if (user.p_e_id) {
        useEffect(() => {
            const fetchBalance = async () => {
                try {
                    const res = await GetBalanceByPEId(user.p_e_id, config);
                    setBalance(res);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            const transaccionesIngresos = async () => {
                try {
                    const { data: response } = await FiltrarPorTipo(0, user.p_e_id, config);
                    setIngresos(response);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };
            const transaccionesEgresos = async () => {
                try {
                    const { data: response } = await FiltrarPorTipo(1, user.p_e_id, config);
                    setEgresos(response);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };
            fetchBalance();
            transaccionesIngresos();
            transaccionesEgresos();
        }, []);
    }


    return (


        <>
            <div className=" bg-inherit rounded p-4 pt-8 m-1 mx-8 mb-0 flex justify-between">
                {/* TODO: Cambiar por ternario, copiar y pegar todo pero solo modificar el boton perfil económico por nueva transacción */}
                <div className="bg-gray-200 p-4  rounded-lg shadow-sm w-full  mx-1 ">
                    <div>
                        <h2 className='p-1 justify-around text-violet-600'>
                            Ingresos:
                        </h2>

                        <div className="bg-inherit rounded-lg  border">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                                    </tr>
                                </thead>
                                {user.p_e_id ?
                                    <tbody>
                                        {ingresos.map((transaccion, index) => {
                                            return (
                                                <tr className="border-b border-gray-200" key={index}>
                                                    <td className="py-2 px-4">{transaccion.detalle}</td>
                                                    <td className="py-2 px-4">${transaccion.monto}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody> :
                                    <tbody></tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200  p-4 rounded-lg shadow-sm w-full mx-1 w-min-6 ">
                    <div>
                        <h2 className='p-1 justify-around text-violet-600'>
                            Egresos:
                        </h2>
                        <div className="bg-inherit rounded-lg  border">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                                    </tr>
                                </thead>
                                {user.p_e_id ?
                                    <tbody>
                                        {egresos.map((transaccion, index) => {
                                            return (
                                                <tr className="border-b border-gray-200" key={index}>
                                                    <td className="py-2 px-4">{transaccion.detalle}</td>
                                                    <td className="py-2 px-4">${transaccion.monto}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody> :
                                    <tbody></tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 p-4 mx-40 rounded-lg shadow-sm ">
                <div>
                    <h2 className='p-1 justify-around mb-4 text-violet-600 text-center'>
                        Patrimonio Neto:
                    </h2>
                    {balance
                        ?
                        <div className='flex justify-center'>
                            <h1 className='p-1 justify-around text-violet-800 font-bold uppercase'>
                                ${parseFloat(balance.data.saldo_Total).toFixed(2)}
                            </h1>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>

        </>

    );
};

export default Balance;