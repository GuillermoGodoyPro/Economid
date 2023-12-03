import React from "react";
import { useState, useEffect } from "react";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import ModalTransaccion from "../../components/pop-ups/ModalTransaccion";
import { getAll } from "../../services/myfinances-api/transacciones";
import { getCategories } from "../../services/myfinances-api/categorias";
import { getBalanceByUserId } from "../../services/myfinances-api/balance";
import { TransactionsTable } from "../../components/transactions/transactions-table";
import { texts } from "../../constants/myfinances-constants";
import Alerta from "../../components/Alerta";

const Transacciones = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([]);
    const [bId, setBalanceId] = useState();
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [categorias, setCategorias] = useState([""]);
    const [alertaTransacciones, setAlertaTransacciones] = useState({});

    const handleModalClosing = () => {
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };

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
                const { data: response } = await getAll(user.id, config);
                setTransacciones(response);
                setLoading(false);
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
        const fetchBalanceId = async () => {
            try {
                const { data: response } = await getBalanceByUserId(user.id, config);
                setBalanceId(response.id);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTransacciones();
        fetchCategorias();
        fetchBalanceId();
    }, []);

    const { msg } = alertaTransacciones;

    return (
        <div className="bg-inherit p-10">
            {alertaTransacciones ?
                <div className="flex justify-end">
                    <div className="fixed">
                        {msg && <Alerta alerta={alertaTransacciones} />}
                    </div>
                </div> : <div></div>}
            <div className='flex bottom-1 pb-8' >
                <button
                    type="button"
                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute shadow-md hover:shadow-violet-500'
                    onClick={handleModalClosing}
                >
                    Nueva Transacción
                </button>

                {modal &&
                    <ModalTransaccion
                        setModal={setModal}
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                        categorias={categorias}
                        idBalance={bId}
                        setTransacciones={setTransacciones}
                        transacciones={transacciones}
                    />
                }
            </div>
            <div className="bg-inherit p-4 rounded-lg shadow-md hover:shadow-violet-400 border">
                <TransactionsTable
                    cargando={cargando}
                    transacciones={transacciones}
                    setTransacciones={setTransacciones}
                    auth={auth} />
            </div>
        </div>
    );
};

export default Transacciones;