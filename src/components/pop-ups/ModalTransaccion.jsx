import { useState } from "react";
import Alerta from "../Alerta";
import useAuth from "../../context/useAuth";
import { getUserToken } from "../../services/token/tokenService";
import { newTransaction } from "../../services/myfinances-api/transacciones";
import { errors } from "../../constants/myfinances-constants";

const ModalTransaccion = ({ setModal, animarModal, setAnimarModal, categorias, idBalance, setTransacciones, setBalance, setBalanceId }) => {

    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [error, setError] = useState(null);
    const [cargando, setLoading] = useState(false);
    const [fecha, setFecha] = useState("");
    const [detalle, setDetalle] = useState("");
    const [monto, setMonto] = useState("");
    const [tipoTransaccion, setTipoTransaccion] = useState("Ingreso");
    const [categoriaId, setCategoria] = useState(categorias[0].id);


    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        if ([detalle, monto].length === 0) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        const user = getUserToken();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        const payload = {
            fecha: fecha,
            detalle: detalle,
            monto: parseFloat(monto),
            tipoTransaccion: tipoTransaccion,
            cat_Id: parseInt(categoriaId),
            balance_Id: parseInt(idBalance) ?? null,
            usuarioId: parseInt(user.id),
            estaActiva: true
        };

        try {
            const { data, status } = await newTransaction(payload, config);
            if (status === 201) {
                setLoading(false);
                setAlerta({
                    msg: "Transaccion Creada!",
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    setTransacciones(transacciones => [data, ...transacciones]);
                    if (setBalance) {
                        setBalance(data.balance);
                        setBalanceId(data.balance.id);
                    }
                    ocultarModal();
                }, 1500);
            }
        } catch (error) {
            if (!error.errors) {
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
            else {
                if (error.status === errors.badRequests.BAD_REQUEST_CODE) {
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
                        <label htmlFor="Fecha">Fecha</label>
                        <input
                            id="fecha"
                            type={"date"}
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="detalle">Detalle</label>
                        <input
                            id="detalle"
                            type="text"
                            placeholder="Detalle"
                            value={detalle}
                            onChange={e => setDetalle(e.target.value)}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="monto">Monto</label>
                        <input
                            id="monto"
                            type="text"
                            placeholder="Ingresar monto"
                            value={monto.replace(",", ".")}
                            onChange={e => setMonto(e.target.value)}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="tipo">Tipo de Transacción</label>
                        <select name="tipo" id="tipo" value={tipoTransaccion}
                            onChange={e => setTipoTransaccion(e.target.value)}
                        >
                            <option defaultValue={"Ingreso"} value="Ingreso">Ingreso</option>
                            <option value="Egreso">Egreso</option>
                        </select>
                    </div>

                    <div className='campo'>
                        <label htmlFor="categoria">Categoria</label>
                        <select name="categoria" id="categoria" value={categoriaId}
                            onChange={e => setCategoria(e.target.value)}
                        >
                            {
                                categorias?.map((c, index) => {
                                    return (
                                        <option
                                            defaultValue={c.id}
                                            value={c.id}
                                            key={index}>
                                            {c.titulo}
                                        </option>
                                    );
                                })
                            }
                        </select>
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

export default ModalTransaccion;