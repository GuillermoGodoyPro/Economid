import { Navigate, Outlet } from "react-router-dom";
import styles from "../styles/ProtectedPath.module.css";
import Header from "../components/header/Header";
import useAuth from "../context/useAuth";


const ProtectedPath = () => {

    const { auth, cargando } = useAuth();

    // TODO: usar un spinners
    if(cargando) return "Cargando...";
    /*   const autid = true
 */
    return (

    // Si existe auth.id Ingresa a dashboard por medio de ProtectedPath (ver el navegate to Dashboard en App.jsx)
        <>
            {
                auth ?
                    (
                        <div className={styles.container}>

                            <div className={styles.headerContainer}>
                                <Header />
                            </div>

                            <main className={styles.mainSinHeader}>
                                <Outlet />
                            </main>



                        </div>

                    )
                    :
                    (
                        <Navigate to="/" />
                    )
            }


        </>
    );
};

export default ProtectedPath;