export const type = {
    INGRESO: "Ingreso",
    EGRESO: "Egreso"
}

export const errors = {
    serverErrors: {
        NETWORK_ERROR: "Network Error",
        HIGHER_THAN_FINAL_AMOUNT_MSG: "Con el monto ingresado se sobrepasa la meta. Por favor ingrese un monto menor o igual"
    },
    badRequests: {
        BAD_REQUEST: "Request failed with status code 400",
        REQUIRED_FIELDS: "Todos los campos son obligatorios"
    }  
}
export const texts = {
    ON_DELETING_QUESTION: "¿Desea anular la transaccion?",
    ON_DELETING_WARN: "Al confirmar se anula la transacción definitivamente",
    ON_DELETING_SUCCESS: "La transacción ha sido anulada",
    WITH_NO_TRANSACTIONS: "Informacion de saldos no disponible. Comience a crear transacciones...",
    WITH_NO_GOALS: "No hay metas cargadas. Comience a crear metas...",
    NO_CHART: "Gráfico no disponible. No se registran gastos...",
    ON_COMPLETED_GOAL: "Meta completada!"
}