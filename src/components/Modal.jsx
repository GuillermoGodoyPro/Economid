import { useState } from 'react'
import CerrarBtn from '../assets/btnCierre.jfif'
import Alerta from '../components/Alerta'
import { AltaPerfilEconomico } from '../services/perfilEconomico';
import useAuth from '../hooks/useAuth';
import jwt_decode from "jwt-decode";

const Modal = ({ setModal, animarModal, setAnimarModal }) => {
    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [presupuesto, setPresupuesto] = useState('')
    const [metaFinanciera, setMetaFinanciera] = useState('')

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {

            setModal(false)
        }, 200)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([presupuesto, metaFinanciera].includes('') || [presupuesto, metaFinanciera].includes("0")) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });            
        } else {
            setAlerta({
                msg: 'Transacción realizada',
                error: false
            });
        }

        setTimeout(() => {
            setAlerta({})
        }, 3000)

        const { id } = jwt_decode(auth);

        const payload = {
            presupuesto: parseFloat(presupuesto),
            metaFinanciera: parseFloat(metaFinanciera),
            usuarioId: parseInt(id)
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        }

        try {
            const { data } = await AltaPerfilEconomico(payload, config);
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