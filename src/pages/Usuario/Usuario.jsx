import { useEffect, useState } from "react";
import styles from "./Usuario.module.css";
import { getUserToken } from "../../services/token/tokenService";
import ModalUsuario from "../../components/pop-ups/ModalUsuario";

const Usuario = () => {
    const user = getUserToken();
    const [modalModificarPerfil, setModalPerfil] = useState(false);
    const [animarModalPerfil, setAnimarModalPerfil] = useState(false);
    
       
    const handleModificarPerfil = () => {
        setModalPerfil(true);

        setTimeout(() => {

            setAnimarModalPerfil(true);
        }, 400);
    };

     

    return (

        <div className={styles.containers} >

            <div className={styles.container2} >

                <div >
                                  
                    <h1 className={styles.title}>NOMBRE</h1>
                    <p>{user.nombre}</p>
                    <h1 className={styles.title}>APELLIDO</h1>
                    <p>{user.apellido}</p>                        
                    <h1 className={styles.title}>CORREO ELECTRÓNICO</h1>
                    <p>{user.email}</p>
                    <h1 className={styles.title}>TELÉFONO</h1>
                    <p>No Disponible</p>

                    <div className={styles.divbuttons}>
                        <div>

                            <button onClick={handleModificarPerfil} className={styles.button}>MODIFICAR PERFIL</button>
                            {modalModificarPerfil &&
                                <ModalUsuario
                                    setModal={setModalPerfil}
                                    animarModal={animarModalPerfil}
                                    setAnimarModal={setAnimarModalPerfil}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default Usuario;