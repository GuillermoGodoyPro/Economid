import { useState } from "react";
import { texts } from "../../constants/myfinances-constants";
import Alerta from "../Alerta";
import { deleteUser } from "../../services/myfinances-api/usuario";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";

export const BorrarUsuario = ({ animarModal, setAnimarModal, setModal, auth, userId }) => {
    const [alerta, setAlerta] = useState({});
    const [cargando, setLoading] = useState(false);
    const navigate = useNavigate();

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleBorrado = async () => {
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {
            const { data, status } = await deleteUser(userId, config);
            if (status === HttpStatusCode.Ok) {
                setLoading(false);
                setAlerta({
                    msg: texts.ON_DELETING_ACCOUNT_SUCCESS,
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/");
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
                                {texts.ON_DELETING_QUESTION_ACCOUNT_WARN}
                            </h3>
                            <div className="text-center rounded-xl p-3 bg-orange-400 shadow-md hover:shadow-orange-400">
                                <h3 className="text-lg text-gray-800 text-center">
                                    {texts.ON_DELETING_ACCOUNT_WARN}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="deletePopUpButtons flex flex-row justify-around">
                        <input
                            type="submit"
                            value={"Volver"}
                            onClick={ocultarModal}
                            className="backDeleteButton"
                        />

                        <input
                            type="submit"
                            value={!cargando ? "Eliminar" : "Eliminando..."}
                            disabled={cargando}
                            onClick={handleBorrado}
                            className="deleteButton"
                        />
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                </div>
            </div>
        </div>
    );
};