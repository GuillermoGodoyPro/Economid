
const Alerta = ({alerta}) => {
  return (
    /* tailwind, degradado de rojo 200 a rojo 500 . si sale error ---- Caso contrario */
    <div className={`${alerta.error ? 'from-red-400 to-red-500' : 'from-green-200 to-green-500'}
      bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm my-10`}>
        {/* Gradiente de izquierda a derecha */}
        {/* prop de alerta, son dos tipos */}
        {alerta.msg}

    </div>
  )
}

export default Alerta