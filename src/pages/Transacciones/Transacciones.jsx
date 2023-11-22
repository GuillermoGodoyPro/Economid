import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ModalTransaccion from "../../components/ModalTransaccion";
import { ObtenerTodasUsuario } from "../../services/transacciones";
import { GetCategorias } from "../../services/categorias";
import jwtDecode from "jwt-decode";
import { GetBalanceByPEId } from "../../services/balance";

const Transacciones = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([]);
    const [bId, setBalanceId] = useState();
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [categorias, setCategorias] = useState([""]);

    const handleModalClosing = () => {
        setModal(true);

        setTimeout(() => {

            setAnimarModal(true);
        }, 400);
    };


    const usuario = jwtDecode(auth);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    if (usuario.p_e_id) {
        useEffect(() => {
            const fetchTransacciones = async () => {
                try {
                    const { data: response } = await ObtenerTodasUsuario(config);
                    setTransacciones(response);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };
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
            const fetchBalanceId = async () => {
                try {
                    const { data: response } = await GetBalanceByPEId(usuario.p_e_id, config);
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
    }

    return (
        <div className="bg-inherit p-10">
            <div className='flex  bottom-1 pb-8' >{/* justify-end para poner el boton al final */}

                <button
                    type="button"
                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute'
                    onClick={handleModalClosing}
                >
                Agregar Transacción
                </button>

                {modal &&
                <ModalTransaccion
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    categorias={categorias}
                    idBalance={bId}
                />
                }
            </div>
            <div className="bg-inherit p-4 rounded-lg shadow-md border">

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 font-semibold text-violet-600">Detalle</th>
                            <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                            <th className="text-left py-2 px-4 font-semibold text-violet-600">Divisa</th>
                            <th className="text-left py-2 px-4 font-semibold text-violet-600">Fecha</th>
                            <th className="text-left py-2 px-4 font-semibold text-violet-600">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacciones?.map((transaccion, index) => {
                            return (
                                <tr className="border-b border-gray-200" key={index}>
                                    <td className="py-2 px-4 text-gray-800">{transaccion.detalle}</td>
                                    <td className="py-2 px-4 text-gray-800">${transaccion.monto}</td>
                                    <td className="py-2 px-4 text-gray-400">{transaccion.divisa}</td>
                                    <td className="py-2 px-4 text-gray-400">{new Date(transaccion.fecha).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 text-gray-400">{transaccion.tipoTransaccion}</td>
                                    <td>
                                        <i className="fa-regular fa-pen-to-square text-gray-600" alt="hola"></i>
                                        <i
                                            className="fa-regular fa-trash-can pl-2 text-red-600"

                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transacciones;