import { useState } from "react";
import { modifyTransaction } from "../../services/myfinances-api/transacciones";
import { amountReGex, errors, textsReGex } from "../../constants/myfinances-constants";
import Alerta from "../Alerta";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";

export const ModificarTransaccion = ({
    animarModal,
    setAnimarModal,
    setModal,
    transaccionId,
    transaccion,
    setTransaccion,
    setTransacciones,
    balance,
    categorias
}) => {
    const { auth } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [error, setError] = useState(null);
    const [cargando, setLoading] = useState(false);
    const [fecha, setFecha] = useState(new Date(transaccion.fecha).toISOString().substring(0,10));
    const [detalle, setDetalle] = useState(transaccion.detalle);
    const [monto, setMonto] = useState(transaccion.monto);
    const [tipoTransaccion, setTipoTransaccion] = useState(transaccion.tipoTransaccion);
    const [categoriaId, setCategoria] = useState(transaccion.categoria.id);
    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

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

        const payload = {
            id: transaccionId,
            fecha: fecha,
            detalle: detalle,
            monto: parseFloat(monto),
            tipoTransaccion: tipoTransaccion,
            cat_Id: parseInt(categoriaId),
            balance_Id: parseInt(balance?.id) ?? null,
            usuarioId: parseInt(user.id),
            estaActiva: true
        };

        try {
            const { data, status } = await modifyTransaction(transaccionId, payload, config);
            if (status === 200) {
                setLoading(false);
                setAlerta({
                    msg: "Transaccion Modificada!",
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    setTransaccion(data);
                    setTransacciones(transacciones => transacciones.map((transaccion) =>
                        transaccion.id === transaccionId ? data : transaccion
                    ));
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
                        <ReactDatePicker
                            locale={es}
                            className="bg-[#E5E7EB] rounded-md p-1"
                            value={fecha}
                            placeholderText="Fecha"
                            onChange={(date) => setFecha(date.toISOString().split("T")[0])}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="detalle">Detalle</label>
                        <input
                            id="detalle"
                            type="text"
                            placeholder="Detalle"
                            maxLength={80}
                            value={detalle}
                            onChange={e => {
                                if (textsReGex.test(e.target.value) || e.target.value === "") {
                                    setDetalle(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="monto">Monto</label>
                        <input
                            id="monto"
                            type="text"
                            placeholder="Ingresar monto"
                            value={monto.toString().replace(",", ".")}
                            onChange={e => {
                                if (e.target.value === "" || amountReGex.test(e.target.value.replace(",", "."))) {
                                    setMonto(e.target.value);
                                }
                            }}
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