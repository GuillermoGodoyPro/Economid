import { useState } from 'react'
import CerrarBtn from '../assets/cerrarBt.svg'
import Alerta from '../components/Alerta'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarTransaccion }) => {
    const [alerta, setAlerta] = useState({});

    const [saldoInicial, setSaldoInicial] = useState(0)
    const [perfilEc, setPerfilEc] = useState("")


    const ocultarModal = () => {
        setAnimarModal(false)
        setModal(false)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ([saldoInicial, perfilEc].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 6000)

            return;
        } else {
            setAlerta({
                msg: 'Transacción realizada',
                error: false
            })

            // Aca se guardan los datos
            guardarTransaccion({ saldoInicial, perfilEc })
        }

        ocultarModal()
    }

    const { msg } = alerta

    return (
        // <div className="modal">



        //     <form 
        //         onSubmit={handleSubmit}
        //         className={`formulario ${animarModal ? "animar" : 'cerrar' }`}
        //     >
        //         <div className="cerrar-modal">
        //             <img
        //                 src={CerrarBtn}
        //                 alt='cerrar modal'
        //                 onClick={ocultarModal}
        //             />
        //         </div>

        //         <legend>Perfil Económico</legend>

        //         <div className='campo'>
        //             <label htmlFor="sinicial">Saldo Inicial</label>
        //             <input 
        //                 id="sinicial"
        //                 type="number"
        //                 placeholder="Añade tu saldo inicial: ej. 50000"
        //                 value={saldoInicial}
        //                 onChange={ e => setSaldoInicial( e.target.value ) }

        //             />

        //         </div>

        //         <div className='campo'>
        //             <label htmlFor="perfil">Tipo de inversor</label>

        //             <select
        //                 id="perfil"
        //                 value={perfilEc}
        //                 onChange={ e => setPerfilEc( e.target.value ) }
        //             >
        //                 <option value="">-- Seleccione --</option>
        //                 <option value="moderado">Moderado</option>
        //                 <option value="emprendedor">Emprendedor</option>

        //             </select>                    

        //         </div>

        //         <input 
        //             type="submit"
        //             value="Añadir Transacción"
        //         />

        //     {msg && <Alerta alerta={alerta} />}

        //     </form>

        // </div>
        <div className='modal'>
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt='cerrar modal'
                    onClick={ocultarModal}
                />
            </div>
            <legend>Creá tu Perfil Económico</legend>
            <form
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <div className='campo'>
                    <label
                        htmlFor='presupuesto'
                    >Presupuesto</label>
                    <input
                        id='presupuesto'
                        type='number'
                        placeholder='Presupuesto'
                    />

                </div>


                <div className='campo'>
                    <label
                        htmlFor='metaFinanciera'
                    >Meta Financiera</label>
                    <input
                        id='metaFinanciera'
                        type='number'
                        placeholder='Meta financiera'
                    />

                </div>

                <div
                    className='submit-container'
                >
                    <input
                        type="submit"
                        className='bg-violet-400'
                        value={"Crear"}
                    />

                </div>


                {/* Pasamos el estado de alerta por props */}
                {msg && <Alerta alerta={alerta} />}

            </form>
        </div>
    )
}

export default Modal