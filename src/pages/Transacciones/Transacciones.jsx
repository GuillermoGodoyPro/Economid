import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ModalTransaccion from "../../components/ModalTransaccion";
import { FiltrarPorTipo, ObtenerTodasUsuario } from "../../services/transacciones";
import jwtDecode from "jwt-decode";

const Transacciones = () => {
    const { auth } = useAuth();
    const [transacciones, setTransacciones] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);


    const handlePerfilEcon = () => {
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


            fetchTransacciones();

        }, []);
    }


    return (
        <div className="bg-inherit p-10">
            <div className='flex  bottom-1 pb-8' >{/* justify-end para poner el boton al final */}

                <button
                    type="button"
                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute'
                    onClick={handlePerfilEcon}
                >
                Agregar Transacción
                </button>

                {modal &&
                <ModalTransaccion
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                />
                }
            </div>
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
                    <tbody>
                        {transacciones.map((transaccion, index) => {
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
                </table>
            </div>
        </div>
    );
};

export default Transacciones;