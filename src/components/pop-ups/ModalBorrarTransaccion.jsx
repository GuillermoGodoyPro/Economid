import { useState } from "react";
import { texts } from "../../constants/myfinances-constants";
import Alerta from "../Alerta";
import { deleteTransaction } from "../../services/myfinances-api/transacciones";
import { HttpStatusCode } from "axios";

export const BorrarTransaccion = ({ animarModal, setAnimarModal, setModal, transaccionId, auth, transacciones, setTransacciones }) => {
    const [alerta, setAlerta] = useState({});
    const [cargando, setLoading] = useState(false);

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleBorrado = async (transaccionId) => {
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {
            const { data, status } = await deleteTransaction(transaccionId, config);
            if (status === HttpStatusCode.Ok) {
                setLoading(false);
                setAlerta({
                    msg: texts.ON_DELETING_SUCCESS,
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    setTransacciones(transacciones.map((transaccion) =>
                        transaccion.id === transaccionId ?
                            { ...transaccion, estaActiva: data.estaActiva } : transaccion
                    ));
                    ocultarModal();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { msg } = alerta;

    return (
        <div className="modalDelete">
            <div className="modalDeleteContainer shadow-md p-5">
                <div
                    className={`deletePopUp ${animarModal ? "animar" : "cerrar"}`}
                >
                    <div className="closeDeletePopUp">
                        <i className="fa-regular fa-circle-xmark"
                            onClick={ocultarModal}></i>
                    </div>

                    <div className='textDelete text-center pb-10 pr-10 pl-10 pt-10 flex flex-col items-center'>
                        <div>
                            <h3 className="text-gray-800 text-lg">
                                {texts.ON_DELETING_QUESTION}
                            </h3>
                            <div className="text-center rounded-xl p-3 bg-orange-400 shadow-md hover:shadow-orange-400">
                                <h3 className="text-lg text-gray-800 text-center">
                                    {texts.ON_DELETING_WARN}
                                </h3>
                            </div>
                        </div>
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                    <div className="deletePopUpButtons flex flex-row justify-around">
                        <input
                            type="submit"
                            value={"Volver"}
                            onClick={ocultarModal}
                            className="backDeleteButton"
                        />

                        <input
                            type="submit"
                            value={!cargando ? "Anular" : "Anulando..."}
                            disabled={cargando}
                            onClick={() => handleBorrado(transaccionId)}
                            className="deleteButton"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};