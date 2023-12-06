import { Outlet } from "react-router-dom";
import styles from "../styles/AuthLayout.module.css";

const AuthLayout = () => {
    return (

        <>
            <main className={styles.container}>
                {/* Outlet permite iyectar los componentes hijos, App.jsx -> Login dentro de AuthLayout */}
                <Outlet />
            </main>

        </>
    );
};

export default AuthLayout;