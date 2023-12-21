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
import { DateFilter } from "../../components/transactions/filters/date-filter";
import { TransactionsPagination } from "../../components/dashboard/transactions/transactions-pagination";
import { TypeFilter } from "../../components/transactions/filters/type-filter";
import { StateFilter } from "../../components/transactions/filters/state-filter";
import { AmountFilter } from "../../components/transactions/filters/amount-filter";
import useDark from "../../context/useDark";

const Transacciones = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [bId, setBalanceId] = useState();
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [categorias, setCategorias] = useState([""]);
    const [alerta, setAlerta] = useState({});
    const [hasNextPage, setHasNextPage] = useState(true);
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const [state, setState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { dark } = useDark();

    const [payloadProps, setPayloadProps] = useState({
        userId: null,
        tipo: null,
        fecha: null,
        montoHasta: null,
        estaActiva: null
    });

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

    const handleFiltersReset = async () => {
        setLoading(true);
        try {
            const { data: response } = await getAll({ userId: user.id }, 1, 10, config);
            setLoading(false);
            setTransacciones(response.data);
            setMetadata(response.meta);
            setCurrentPage(1);
            setHasNextPage(response.meta.hasNextPage);
            setTipo("");
            setFecha("");
            setMonto("");
            setState("");
            setPayloadProps({
                tipo: null,
                fecha: null,
                montoHasta: null,
                estaActiva: null
            });
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const fetchTransacciones = async () => {
            try {
                const { data: response } = await getAll({ userId: user.id }, 1, 10, config);
                setTransacciones(response.data);
                setMetadata(response.meta);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                setAlerta({
                    msg: texts.WITH_NO_TRANSACTIONS,
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
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

    const { msg } = alerta;

    return (
        <div className={(dark ?
                "bg-inherit p-10"
                :
                "bg-inherit p-10"
            )}
        >
            {alerta ?
                <div className="flex justify-center mb-20">
                    <div className="fixed">
                        {msg && <Alerta alerta={alerta} />}
                    </div>
                </div> : <div></div>}
            <div className="flex justify-between items-center mb-5">
                <div className='flex items-center'>
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
                <div className="flex justify-center items-center">
                    <AmountFilter
                        setLoading={setLoading}
                        setAlerta={setAlerta}
                        setCurrentPage={setCurrentPage}
                        setTransacciones={setTransacciones}
                        setMetadata={setMetadata}
                        setPayloadProps={setPayloadProps}
                        setMonto={setMonto}
                        monto={monto}
                        payloadProps={payloadProps} />
                    <DateFilter
                        setTransacciones={setTransacciones}
                        setAlerta={setAlerta}
                        setLoading={setLoading}
                        setMetadata={setMetadata}
                        setCurrentPage={setCurrentPage}
                        setPayloadProps={setPayloadProps}
                        fecha={fecha}
                        setFecha={setFecha}
                        payloadProps={payloadProps} />
                    <TypeFilter
                        setLoading={setLoading}
                        setAlerta={setAlerta}
                        setCurrentPage={setCurrentPage}
                        setTransacciones={setTransacciones}
                        setMetadata={setMetadata}
                        setPayloadProps={setPayloadProps}
                        setTipo={setTipo}
                        tipo={tipo}
                        payloadProps={payloadProps} />
                    <StateFilter
                        setLoading={setLoading}
                        setAlerta={setAlerta}
                        setCurrentPage={setCurrentPage}
                        setTransacciones={setTransacciones}
                        setMetadata={setMetadata}
                        setPayloadProps={setPayloadProps}
                        setState={setState}
                        state={state}
                        payloadProps={payloadProps} />
                </div>
                <button
                    className="text-white text-sm bg-red-500 p-3 rounded-md uppercase font-semibold p-absolute shadow-md hover:shadow-red-600"
                    onClick={() => handleFiltersReset()}>
                    Borrar Filtros
                </button>
            </div>
            <div className={(dark ?
                    "bg-inherit p-4 rounded-lg shadow-md hover:shadow-violet-400 border"
                    :
                    "bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-violet-400 border"
                )}
            >
                <TransactionsTable
                    cargando={cargando}
                    transacciones={transacciones}
                    setTransacciones={setTransacciones}
                    metadata={metadata}
                    idBalance={bId}
                />
                {
                    metadata.totalCount > 10 ?
                        <div className="w-full">
                            <TransactionsPagination
                                setTransacciones={setTransacciones}
                                metadata={metadata}
                                hasNextPage={hasNextPage}
                                setHasNextPage={setHasNextPage}
                                setLoading={setLoading}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                payloadProps={payloadProps}
                            />
                        </div> : <div></div>
                }
            </div>
        </div>
    );
};

export default Transacciones;