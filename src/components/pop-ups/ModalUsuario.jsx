import { useState } from "react";
import Alerta from "../Alerta";
import useAuth from "../../context/useAuth";
import { getUserToken, setUserToken } from "../../services/token/tokenService";
import { modifyProfile } from "../../services/myfinances-api/usuario";


const ModalUsuario = ({ setModal, animarModal, setAnimarModal }) => {
    const [alerta, setAlerta] = useState({});
    const { auth } = useAuth();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const user = getUserToken();

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleSubmit = async e => {
        e.preventDefault();


        const payload = {
            Id: parseInt(user.id),
            Nombre: nombre,
            Apellido: apellido,
            email: user.email,
            Contraseña: user.pwd,
            EsAdmin: false
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }

        };

        try {

            const { data } = await modifyProfile(user.id, payload, config);

            setUserToken("user",JSON.stringify({
                ...user,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email
            }));


            console.log(data);
        } catch (error) {
            setAlerta(error);
        }


        ocultarModal();
    };

    const { msg } = alerta;

    return (
        <div className="modal">

            <div className='modalContainer'>
                <form

                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                >
                    <div className="cerrar-modal">
                        <i className="fa-regular fa-circle-xmark"
                            onClick={ocultarModal}></i>
                    </div>

                    <div className='campo'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                            defaultValue={user.nombre}
                            onChange={e => setNombre(e.target.value)}

                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Apellido"
                            defaultValue={user.apellido}
                            onChange={e => setApellido(e.target.value)}

                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="text"
                            defaultValue={user.email}
                            disabled="true"
                            className="text-white"
                        />

                    </div>


                    <input
                        type="submit"
                        value="Aceptar"/>
                    {msg && <Alerta alerta={alerta} />}
                </form>
            </div>
        </div>
    );
};

export default ModalUsuario;