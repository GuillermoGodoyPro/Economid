import { useState } from 'react'
import CerrarBtn from '../assets/btnCierre.jfif'
import Alerta from '../components/Alerta'
import { AltaPerfilEconomico } from '../services/perfilEconomico';
import useAuth from '../hooks/useAuth';
import jwt_decode from "jwt-decode";

const Modal = ({ setModal, animarModal, setAnimarModal }) => {
    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [presupuesto, setPresupuesto] = useState(0)
    const [metaFinanciera, setMetaFinanciera] = useState(0)

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {

            setModal(false)
        }, 200)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([presupuesto, metaFinanciera].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000)

            return;
        } else {
            setAlerta({
                msg: 'Transacción realizada',
                error: false
            })
        }

        /* Implementación temporal (sucia). A mejorar */
        const { id } = jwt_decode(auth);
        const usuarioId = parseInt(id);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        }

        try {
            const { data } = await AltaPerfilEconomico({ presupuesto, metaFinanciera, usuarioId }, config);
            console.log(data);
        } catch (error) {
            setError(error);
        }

        ocultarModal();
    }

    const { msg } = alerta

    return (
        <div className="modal">

            <div className='modalContainer'>
                <form
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                >
                    <div className="cerrar-modal">
                        <img
                            src={CerrarBtn}
                            alt='cerrar modal'
                            onClick={ocultarModal}
                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="presupuesto">Presupuesto</label>
                        <input
                            id="presupuesto"
                            type="number"
                            placeholder="Presupuesto: ej. 50000"
                            value={presupuesto}
                            onChange={e => setPresupuesto(e.target.value)}

                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="metaFinanciera">Meta Financiera</label>
                        <input
                            id="metaFinanciera"
                            type="number"
                            placeholder="Meta financiera"
                            value={metaFinanciera}
                            onChange={e => setMetaFinanciera(e.target.value)}

                        />

                    </div>

                    {/* <div className='campo'>
                        <label htmlFor="metaFinanciera">Meta Financiera</label>

                        <select
                            id="metaFinanciera"
                            value={perfilEc}
                            onChange={ e => setPerfilEc( e.target.value ) }
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="moderado">Moderado</option>
                            <option value="emprendedor">Emprendedor</option>

                        </select>                    

                    </div> */}

                    <input
                        type="submit"
                        value="Enviar"
                    />

                    {msg && <Alerta alerta={alerta} />}

                </form>


            </div>




        </div>
    )
}

export default Modal