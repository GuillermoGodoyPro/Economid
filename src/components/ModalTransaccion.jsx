import { useState } from "react";
import Alerta from "./Alerta";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

import { AltaTransaccion } from "../services/transacciones";

const ModalTransaccion = ({ setModal, animarModal, setAnimarModal, categorias, idBalance, setTransacciones, transacciones }) => {

    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [error, setError] = useState(null);
    const [cargando, setLoading] = useState(true);
    const [fecha, setFecha] = useState("");
    const [detalle, setDetalle] = useState("");
    const [monto, setMonto] = useState(0);
    const [divisaElegida, setDivisa] = useState("USD");
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

        if ([detalle, monto].length === 0) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
        } else {
            setAlerta({
                msg: "Transacción realizada",
                error: false
            });
        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        const { p_e_id } = jwtDecode(auth);
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
            divisa: divisaElegida,
            tipoTransaccion: tipoTransaccion,
            cat_Id: parseInt(categoriaId),
            balance_Id: parseInt(idBalance) ?? null,
            p_E_Id: parseInt(p_e_id)
        };

        try {
            const { data, status } = await AltaTransaccion(payload, config);
            const newTransact = await data;
            setTransacciones(transacciones => [...transacciones, newTransact]);
            console.log(transacciones);
            setAlerta({
                msg: "Transaccion Creada!",
                error: false
            });
            setTimeout(() => {
                setModal(false);
            }, 200);
        } catch (error) {
            setError(error);
        }

        ocultarModal();
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
                            type="number"
                            placeholder="Ingresar monto"
                            value={monto}
                            onChange={e => setMonto(e.target.value)}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="divisa">Divisa</label>
                        <select name="divisa" id="divisa" value={divisaElegida}
                            onChange={e => setDivisa(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="BTC">BTC</option>
                        </select>
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
                        value="Enviar"
                    />

                    {msg && <Alerta alerta={alerta} />}

                </form>


            </div>




        </div>
    );
};

export default ModalTransaccion;