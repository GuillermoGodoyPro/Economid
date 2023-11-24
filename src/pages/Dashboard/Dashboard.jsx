import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ModalPerfilEconomico from "../../components/ModalPerfilEconomico";
import ModalTransaccion from "../../components/ModalTransaccion";
import { FiltrarPorTipo, ObtenerTodasUsuario } from "../../services/transacciones";
import { GetBalanceByPEId } from "../../services/balance";
import { GraficoTransacciones } from "../../components/GraficoTransacciones";
// import jwtDecode from "jwt-decode";
import { GetCategorias } from "../../services/categorias";
import { getUserToken, setUserToken } from "../../services/token/tokenService";
// import { SetUserToken, getUserToken, setUserToken } from "../../services/token/tokenService";



const Dashboard = () => {
    const { auth } = useAuth();
    const [balance, setBalance] = useState(null);
    const [balanceId, setBalanceId] = useState(null);
    const [transacciones, setTransacciones] = useState([{}]);
    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [categorias, setCategorias] = useState([""]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [perfilEconomico, setPerfilEconomico] = useState(null);
    // const [currentUser, setCurrentUser] = useState({});

    const handlePerfilEcon = () => {
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };

    const user = getUserToken();
    let userT = { ...user };
    console.dir("user: " + userT);

    //Si es primera vez (Registro)
    if ((!userT.p_e_id || userT.p_e_id == "") && perfilEconomico) {
        userT = {
            ...user,
            p_e_id: perfilEconomico.id
        };
        setUserToken("user", JSON.stringify(userT));
        const userToken = getUserToken();
        console.log("Token us: " + JSON.stringify(userToken));
    }
    console.log(JSON.stringify(userT.p_e_id));
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await GetBalanceByPEId(userT.p_e_id, config);
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
        const fetchTransacciones = async () => {
            try {
                const { data: response } = await ObtenerTodasUsuario(userT.p_e_id, config);
                setTransacciones(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const transaccionesIngresos = async () => {
            try {
                const { data: response } = await FiltrarPorTipo(0, userT.p_e_id, config);
                setIngresos(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const transaccionesEgresos = async () => {
            try {
                const { data: response } = await FiltrarPorTipo(1, userT.p_e_id, config);
                setEgresos(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBalance();
        fetchTransacciones();
        transaccionesIngresos();
        transaccionesEgresos();
    }, []);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const { data: response } = await GetCategorias(config);
                setCategorias(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    return (
        <div>
            <h2
                className='mx-5 text-violet-800 font-bold uppercase '
            >
                Bienvenido {userT.nombre}
            </h2>
            {/* Cabecera */}
            <div className="p-2 m-6 mb-0 bg-inherit rounded flex justify-between">
                {/* TODO: Cambiar por ternario, copiar y pegar todo pero solo modificar el boton perfil económico por nueva transacción */}
                <div className="bg-gray-200 pt-4 rounded-lg shadow-sm w-full mr-1">
                    {
                        cargando ? "Cargando..."
                            :
                            balance ?
                                <div className='flex justify-around'>
                                    <div className=''>
                                        <span className='font-bold text-violet-600'>
                                            Saldo Actual:
                                        </span>
                                        <h1 className=' font-bold text-violet-600'>
                                            ${parseFloat(balance.data.saldo_Total).toFixed(2)}
                                        </h1>
                                    </div>
                                    <h2 className=' text-violet-600'>
                                        <span className='font-bold'>
                                            Saldo Inicial: <br />
                                            ${parseFloat(balance.data.saldo_Inicial).toFixed(2)}
                                        </span>
                                    </h2>
                                </div> :
                                <div className='flex justify-center'>
                                    <h3>Informacion de Saldos no disponible, empiece a crear transacciones...</h3>
                                </div>}

                    {
                        !userT.p_e_id ?
                            <div className='p-2 pt-8 flex justify-around bottom-1 '>

                                <button
                                    type="button"
                                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
                                    onClick={handlePerfilEcon}
                                >
                                    Perfil Económico
                                </button>

                                {modal &&
                                    <ModalPerfilEconomico
                                        setModal={setModal}
                                        animarModal={animarModal}
                                        setAnimarModal={setAnimarModal}
                                        setPerfilEconomico={setPerfilEconomico}
                                    />
                                }

                            </div>
                            :
                            <div className='p-2 pt-14 flex justify-around bottom-1' >
                                <button
                                    type="button"
                                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute'
                                    onClick={handlePerfilEcon}
                                >
                                    Agregar Transacción
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
                                        transacciones={transacciones}
                                    />
                                }
                            </div>
                    }
                </div>

                <div className="bg-gray-200 pt-4 pl-8 rounded-lg shadow-sm w-full ml-1 flex">

                    <div>
                        <h2 className=' text-violet-600  font-bold'>
                            Ultimos Gastos:
                        </h2>

                    </div>

                    <div className="h-min-2 pr-8">
                        {
                            cargando ? "Cargando..."
                                :
                                userT.p_e_id ?
                                    <div>
                                        <GraficoTransacciones transacs={egresos.slice(-5).reverse()} />
                                    </div> :
                                    <div></div>
                        }

                    </div>


                </div>
            </div>

            <div className="bg-inherit p-10">
                <div className="bg-inherit p-4 rounded-lg shadow-md border">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Detalle</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Fecha</th>
                                <th className="text-left py-2 px-4 font-semibold text-violet-600">Tipo</th>
                            </tr>
                        </thead>
                        {cargando ? "Cargando..."
                            :
                            userT.p_e_id ?
                                <tbody>
                                    {
                                        transacciones
                                            .slice(-5).reverse()
                                            .map((transaccion, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200" key={index}>
                                                        <td className="py-2 px-4">{transaccion.detalle}</td>
                                                        <td className="py-2 px-4">${transaccion.monto}</td>
                                                        <td className="py-2 px-4">{new Date(transaccion.fecha).toLocaleDateString()}</td>
                                                        <td className="py-2 px-4">{transaccion.tipoTransaccion}</td>
                                                    </tr>
                                                );
                                            })}
                                </tbody>
                                :
                                <tbody></tbody>
                        }
                    </table>
                </div>
            </div>
            <div className=" bg-inherit rounded p-4 m-1 mx-8 mb-0 flex justify-between">
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
                                {userT.p_e_id ?
                                    <tbody>
                                        {ingresos
                                            .slice(0, 5)
                                            .map((transaccion, index) => {
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
                                {userT.p_e_id ?
                                    <tbody>
                                        {egresos
                                            .slice(0, 5)
                                            .map((transaccion, index) => {
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
                    {
                        balance ?
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
        </div>
    );
};

export default Dashboard;

