export const type = {
    INGRESO: "Ingreso",
    EGRESO: "Egreso",
    RESERVA: "Reserva"
};

export const currency = {
    USD: "USD",
    ARS: "ARS"
};

export const errors = {
    serverErrors: {
        NETWORK_ERROR: "Network Error",
        HIGHER_THAN_FINAL_AMOUNT_MSG: "Con el monto ingresado se sobrepasa la meta. Por favor ingrese un monto menor o igual"
    },
    badRequests: {
        BAD_REQUEST: "Request failed with status code 400",
        BAD_REQUEST_CODE: 400,
        REQUIRED_FIELDS: "Todos los campos son obligatorios"
    },
    notFounds: {
        NOT_FOUND: "Request failed with status code 404",
        NOT_FOUND_CODE: 404,
        WITH_NO_INCOMES_EXPENSES: "No existen ingresos/egresos. Comience a crear transacciones..."
    }
};
export const texts = {
    ON_DELETING_QUESTION: "¿Desea anular la transaccion?",
    ON_DELETING_WARN: "Al confirmar se anula la transacción definitivamente",
    ON_DELETING_QUESTION_ACCOUNT_WARN: "¿Desea eliminar su cuenta?",
    ON_DELETING_ACCOUNT_WARN: "Al confirmar se eliminaran todos sus datos de forma definitiva",
    ON_DELETING_SUCCESS: "La transacción ha sido anulada",
    ON_DELETING_ACCOUNT_SUCCESS: "El usuario ha sido eliminado",
    WITH_NO_TRANSACTIONS: "Informacion de saldos no disponible. Comience a crear transacciones...",
    WITH_NO_EXPENSES: "Informacion de gastos no disponible. Comience a crear gastos...",
    WITH_NO_INCOMES: "Informacion de ingresos no disponible. Comience a crear ingresos...",
    WITH_NO_GOALS: "No hay metas activas. Comience a crear metas...",
    NO_CHART: "Gráfico no disponible. No se registran gastos...",
    ON_COMPLETED_GOAL: "Meta completada!",
    ON_WITHDRAWN_GOAL: "Meta retirada con éxito!"
};

export const amountReGex = /^\d{1,8}?(\.\d{0,2})?$/;
export const textsReGex = /^[A-Za-z\s]+$/;