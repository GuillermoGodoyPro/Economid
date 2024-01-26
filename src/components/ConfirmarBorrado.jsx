import { useState } from "react";
import { EliminarTransaccion } from "../services/transacciones";
import useAuth from "../hooks/useAuth";
import { HttpStatusCode } from "axios";

const BorrarTransaccion = ({ setModal, animarModal, setAnimarModal, transaccionId }) => {
    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleBorrado = async e => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {

            const { data, status } = await EliminarTransaccion(transaccionId, config);
            console.log(data);
            if (status === HttpStatusCode.Ok) {
                setAlerta("Transaccion Eliminada");
                setTimeout(() => {
                    setModal(false);
                }, 200);
            }
        } catch (error) {
            setAlerta(error);
        }
        ocultarModal();
    };

    const { msg } = alerta;

    return (
        <div className="">

            <div className='modalContainer'>

                <p>Seguro desea eliminar esta transaccion?</p>
                <div className="flex">
                    <input
                        type="button"
                        value="Eliminar"
                        onClick={handleBorrado}
                        className={`${animarModal ? "animar" : "cerrar"} bg-red-400`}
                    />

                    <button
                        value="Volver"
                        onClick={ocultarModal}
                        className="bg-blue-200"
                    />
                </div>
                {msg && <Alerta alerta={alerta} />}

            </div>




        </div>
    );
};

export default BorrarTransaccion;