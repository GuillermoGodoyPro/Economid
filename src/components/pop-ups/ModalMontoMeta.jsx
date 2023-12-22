import { useState } from "react";
import Alerta from "../Alerta";
import { agregarMonto } from "../../services/myfinances-api/metaFinanciera";
import { errors, texts } from "../../constants/myfinances-constants";

export const GoalAmount = ({ 
    animarModal, 
    setAnimarModal, 
    setModal, 
    goalId, 
    auth,
    setActiveGoals, 
    setCompletedGoals,
    setTableGoals     
}) => {
    const [alerta, setAlerta] = useState({});
    const [amount, setAmount] = useState("");
    const [cargando, setLoading] = useState(false);

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleAdding = async e => {
        e.preventDefault();
        setLoading(true);
        if (amount.length === 0) {
            setAlerta({
                msg: "El campo es obligatorio!",
                error: true
            });
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        const payload = {
            metaId: goalId,
            monto: parseFloat(amount)
        };

        try {
            const { data, status } = await agregarMonto(payload, config);
            if (status === 200) {
                setLoading(false);
                setAlerta({
                    msg: "Monto agregado!",
                    error: false
                });
                setTimeout(() => {
                    setAlerta({});
                    setActiveGoals(activeGoals => activeGoals.map((goal) => {
                        return goal.id === goalId ? { ...goal, montoActual: data.montoActual } : goal;
                    }));
                    if (setTableGoals) {
                        setTableGoals(setTableGoals => setTableGoals.map((goal) => {
                            return goal.id === goalId ? { ...goal, montoActual: data.montoActual } : goal;
                        }));
                    }                    
                    if (data.completada) {
                        setTimeout(() => {
                            setAlerta({
                                msg: texts.ON_COMPLETED_GOAL,
                                error: false
                            });
                            setActiveGoals(activeGoals => activeGoals.map((goal) => {
                                return goal.id === goalId ? { ...goal, completada: data.completada } : goal;
                            }));
                            if (setTableGoals) {
                                setTableGoals(setTableGoals => setTableGoals.map((goal) => {
                                    return goal.id === goalId ? { ...goal, completada: data.completada } : goal;
                                }));
                            }                            
                            if (setCompletedGoals) {
                                setCompletedGoals(completedGoals => [data, ...completedGoals]);
                            }
                        }, 500);
                    }
                    ocultarModal();
                }, 1500);
            }
        } catch (error) {
            if (error.message === errors.serverErrors.NETWORK_ERROR) {
                setAlerta({
                    msg: errors.serverErrors.HIGHER_THAN_FINAL_AMOUNT_MSG,
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                    setLoading(false);
                }, 3000);
            }
            console.log(error);
        }

    };
    const { msg } = alerta;

    return (
        <div className="modal">
            <div className="modalContainer">
                <form
                    onSubmit={handleAdding}
                    className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                >
                    <div className="cerrar-modal">
                        <i className="fa-regular fa-circle-xmark"
                            onClick={ocultarModal}></i>
                    </div>

                    <div className='campo'>
                        <label htmlFor="Monto">Monto</label>
                        <input
                            id="Monto"
                            type="number"
                            placeholder="Ingresar Monto"
                            value={amount.replace(",", ".")}
                            onChange={e => setAmount(e.target.value)}
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
