
const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? "from-red-400 to-red-500" : "from-green-200 to-green-500"}
      bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm m-3`}>
            {alerta.msg}
        </div>
    );
};

export default Alerta;