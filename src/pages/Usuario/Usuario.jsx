import { useEffect, useState } from "react";
import styles from "./Usuario.module.css";
import { getUserToken } from "../../services/token/tokenService";
import ModalUsuario from "../../components/pop-ups/ModalUsuario";

const Usuario = () => {
    const user = getUserToken();
    const [modalModificarPerfil, setModalPerfil] = useState(false);
    const [animarModalPerfil, setAnimarModalPerfil] = useState(false);
    
    const darkInit = localStorage.getItem("colorScheme") === "true";
    const key = "colorScheme"

    const [dark, setDark] = useState(darkInit)
    
    useEffect(() => {
        // Actualizar los estilos cuando dark cambie
        if(dark){
            document.documentElement.style.setProperty('--crema', '#f5f5f3');
            document.documentElement.style.setProperty('--blanco', '#ffffff');
            document.documentElement.style.setProperty('--gris', '#303030');
            document.documentElement.style.setProperty('--violetlight', '#4f339ccb');
        } else {
            document.documentElement.style.setProperty('--crema', 'rgb(55 65 81)');
            document.documentElement.style.setProperty('--blanco', '#cac2e9');
            document.documentElement.style.setProperty('--gris', '#13159e');
            document.documentElement.style.setProperty('--violetlight', '#865ef7c9');
        }

        // Almacenar en el localStorage
        localStorage.setItem(key, dark.toString());    
    }, [dark]) 
    
    
    const handleModificarPerfil = () => {
        setModalPerfil(true);

        setTimeout(() => {

            setAnimarModalPerfil(true);
        }, 400);
    };

    const darkMode = () => {
        // Utilizar la versión de función del setState para garantizar el valor más reciente
        setDark(valAntDark => !valAntDark);
    }
    
    

    return (

        <div className={`${styles.containers} ${dark ? "dark-mode" : ""}`}>

            <div className={styles.container2} >

                <div >
                                  
                    <h1 className={styles.title}>NOMBRE</h1>
                    <p>{user.nombre}</p>
                    <h1 className={styles.title}>APELLIDO</h1>
                    <p>{user.apellido}</p>
                    <h1 className={styles.title}>APARIENCIA</h1>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className='p-[0.56rem] mb-1 text-violet-900 rounded-xl '
                                onClick={darkMode}
                            >
                                { dark ? 
                                    <i className="fa-regular fa-sun"></i>
                                :
                                    <i className="fa-solid fa-moon"></i>
                                } {/* fa-beat */}
                                
                                
                            </button>
                        </div>          
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