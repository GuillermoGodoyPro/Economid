import { useState } from "react";
import Alerta from "../Alerta";
import { agregarMonto, getByState } from "../../services/myfinances-api/metaFinanciera";
import { amountReGex, errors, type } from "../../constants/myfinances-constants";
import { getUserToken } from "../../services/token/tokenService";
import { HttpStatusCode } from "axios";

export const GoalAmount = ({
    animarModal,
    setAnimarModal,
    setModal,
    goalId,
    auth,
    setActiveGoals,
    lastGoalIndex,
    setCompletedGoals,
    setTableGoals,
    setBalance,
    balance,
    setTransacciones,
    activeGoalsMetadata,
    completedGoalsMetadata,
    setActiveGoalsMetadata,
    setCompletedGoalsMetadata
}) => {
    const [alerta, setAlerta] = useState({});
    const [amount, setAmount] = useState("");
    const [cargando, setLoading] = useState(false);
    const user = getUserToken();

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleAdding = async e => {
        e.preventDefault();
        setLoading(true);
        if (amount === "" || amount.length === 0) {
            setAlerta({
                msg: "El campo es obligatorio!",
                error: true
            });
            setTimeout(() => {
                setLoading(false);
                setAlerta({});
            }, 2000);
            return;
        }
        if (amount <= 0) {
            setAlerta({
                msg: "El monto debe ser positivo!",
                error: true
            });
            setTimeout(() => {
                setLoading(false);
                setAlerta({});
            }, 2000);
            return;
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
            if (status === HttpStatusCode.Ok) {
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
                    if (!!setTableGoals) {
                        setTableGoals(setTableGoals => setTableGoals.map((goal) => {
                            return goal.id === goalId ? { ...goal, montoActual: data.montoActual } : goal;
                        }));
                    }
                    if (!!setBalance) {
                        if (!balance.saldo_Total) {
                            setBalance({
                                ...balance,
                                saldo_Total: parseFloat(amount) * -1
                            });
                        }
                        else {
                            setBalance({
                                ...balance,
                                saldo_Total: balance.saldo_Total - parseFloat(amount)
                            });
                        }
                    }
                    if (!!setTransacciones) {
                        const goalTransaction = {
                            detalle: `Reserva - Meta: ${data.titulo}`,
                            monto: parseFloat(amount),
                            fecha: new Date(),
                            tipoTransaccion: type.RESERVA
                        };
                        setTransacciones(transacciones => [
                            goalTransaction,
                            ...transacciones
                        ]);
                    }
                    if (data.completada) {
                        setTimeout(async () => {
                            setActiveGoals(activeGoals => activeGoals.map((goal) => {
                                return goal.id === goalId ? { ...goal, completada: data.completada } : goal;
                            }));
                            if (!!setTableGoals) {
                                setTableGoals(setTableGoals => setTableGoals.map((goal) => {
                                    return goal.id === goalId ? { ...goal, completada: data.completada } : goal;
                                }));
                            }
                            if (!!setCompletedGoals) {
                                setCompletedGoals(completedGoals => [data, ...completedGoals]);
                                const payload = {
                                    userId: user.id,
                                    completada: true
                                };
                                let page = completedGoalsMetadata?.page ?? 1;
                                const resetPageEnabled =
                                    page !== 1 &&
                                    (
                                        !completedGoalsMetadata?.hasNextPage &&
                                        lastGoalIndex === 0
                                    );
                                if (resetPageEnabled) {
                                    page = page - 1;
                                }
                                const { data: response, status } = await getByState(payload, page, 4, config);
                                if (status === HttpStatusCode.Ok) {
                                    setCompletedGoalsMetadata(response.meta);
                                }
                            }
                            if (!!setActiveGoalsMetadata) {
                                const payload = {
                                    userId: user.id,
                                    completada: false
                                };
                                let page = activeGoalsMetadata?.page ?? 1;
                                const resetPageEnabled =
                                    page !== 1 &&
                                    (
                                        !activeGoalsMetadata?.hasNextPage &&
                                        lastGoalIndex === 0
                                    );
                                if (resetPageEnabled) {
                                    page = page - 1;
                                }
                                const { data: response, status } = await getByState(payload, page, 4, config);
                                if (status === HttpStatusCode.Ok) {
                                    setActiveGoals(response.data);
                                    setActiveGoalsMetadata(response.meta);
                                }
                            }
                        }, 100);
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
                            type="text"
                            placeholder="Ingresar Monto"
                            value={amount.replace(",", ".")}
                            onChange={e => {
                                if (e.target.value === "" || amountReGex.test(e.target.value.replace(",", "."))) {
                                    setAmount(e.target.value);
                                }
                            }}
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
