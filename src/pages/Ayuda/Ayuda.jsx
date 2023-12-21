import useDark from "../../context/useDark";

const Ayuda = () => {
    const { dark } = useDark();

    return (
        <div className={(dark === "light" ?
            "faq-section bg-gray-200 p-4 rounded-lg shadow-md m-20"
            : "faq-section bg-violet-300 p-4 rounded-lg shadow-md m-20"
        )}
        >
            <h1 className='p-1 text-violet-600 justify-around mb-4 font-bold'>Preguntas Frecuentes - MyFinances</h1>
            <h3>1. ¿Cómo puedo comenzar a utilizar MyFinances?</h3>
            <p>Bienvenido a MyFinances! Para comenzar, regístrate con tu correo electrónico, completa la configuración de tu cuenta y crea tu perfil economico estableciendo tu meta financiera y presupuesto mensual!. Después de eso, estarás listo para comenzar a registrar tus transacciones y administrar tus finanzas de manera efectiva.</p>

            <h3>2. ¿Cómo establezco metas financieras en MyFinances?</h3>
            <p>Dirígete a la sección de "Metas y Presupuestos" para establecer tus metas financieras. Puedes crear metas a corto y largo plazo, y también configurar presupuestos mensuales para controlar tus gastos. MyFinances te proporcionará actualizaciones regulares sobre tu progreso hacia estas metas.</p>

            <h3>3. ¿Cómo puedo categorizar mis transacciones?</h3>
            <p>En la sección "Transacciones" o creando una nueva transaccion, encontrarás la opción para categorizar cada transacción. Puedes elegir entre categorías predefinidas o crear tus propias etiquetas personalizadas. Esto te ayudará a visualizar y analizar tus gastos de manera más específica.</p>
        </div>
    );
};

export default Ayuda;