import { Navigate, Outlet } from "react-router-dom"
import styles from '../styles/AuthLayout.module.css' 
import { useAuthContext } from "../context/AuthProvider";

const AuthLayout = () => {
  const isAuth = localStorage.getItem('token');
  const { usuario } = useAuthContext();

  if (isAuth && usuario) return <Navigate to="/"/>

  return (
    <main className={styles.container}>
      {/* Outlet permite iyectar los componentes hijos, App.jsx -> Login dentro de AuthLayout */}
      <Outlet />
    </main>
  )
}

export default AuthLayout