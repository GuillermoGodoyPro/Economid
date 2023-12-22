import { useState } from "react";
import Alerta from "../Alerta";
import { altaMetaFinanciera } from "../../services/myfinances-api/metaFinanciera";
import useAuth from "../../context/useAuth";
import { getUserToken } from "../../services/token/tokenService";
import { errors } from "../../constants/myfinances-constants";

const ModalMetas = ({ setModal, animarModal, setAnimarModal, setActiveGoals, activeGoals, tableGoals , setTableGoals }) => {
    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [tituloMeta, setTituloMeta] = useState("");
    const [metaFinal, setMetaFinal] = useState("");
    const [cargando, setLoading] = useState(false);

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if ([tituloMeta, metaFinal].length === 0) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
        }
        if (metaFinal.length < 0) {
            setAlerta({
                msg: "El monto no puede ser negativo",
                error: true
            });
        }
        setTimeout(() => {
            setAlerta({});
        }, 3000);

        const user = getUserToken();
        const payload = {
            titulo: tituloMeta,
            montoFinal: parseFloat(metaFinal),
            usuarioId: parseInt(user.id)
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {
            const { data, status } = await altaMetaFinanciera(payload, config);
            if (status === 200) {
                setLoading(false);
                setAlerta({
                    msg: "Nueva meta creada!",
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    !activeGoals.length ? setActiveGoals([data]) : setActiveGoals([data, ...activeGoals]);
                    if (tableGoals) {
                        !tableGoals.length ? setTableGoals([data]) : setTableGoals([data, ...tableGoals]);
                    }
                    ocultarModal();
                }, 1500);
            }
        } catch (error) {
            if (error.message === errors.badRequests.BAD_REQUEST) {
                setAlerta({
                    msg: errors.badRequests.REQUIRED_FIELDS,
                    error: true
                });
                setTimeout(() => {
                    setLoading(false);
                    setAlerta({});
                }, 3000);
            }
        }
    };

    const { msg } = alerta;

    return (
        <div className="modal">
            <div className='modalContainer'>
                <form
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                >
                    <div className="cerrar-modal">
                        <i className="fa-regular fa-circle-xmark"
                            onClick={ocultarModal}></i>
                    </div>

                    <div className='campo'>
                        <label htmlFor="Titulo">Titulo</label>
                        <input
                            id="Titulo"
                            type="text"
                            placeholder="Titulo de la meta"
                            value={tituloMeta}
                            onChange={e => setTituloMeta(e.target.value)}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="metaFinanciera">Monto Meta</label>
                        <input
                            id="metaFinanciera"
                            type="number"
                            placeholder="Monto"
                            value={metaFinal.replace(",", ".")}
                            onChange={e => setMetaFinal(e.target.value)}
                        />
                    </div>


                    <input
                        type="submit"
                        value={!cargando ? "Enviar" : "Enviando..."}
                        disabled={cargando}
                    />
                    {msg && <Alerta alerta={alerta} />}
                </form>
            </div>
        </div>
    );
};

export default ModalMetas;