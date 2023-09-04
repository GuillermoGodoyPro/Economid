import { Outlet } from "react-router-dom"
import styles from '../styles/AuthLayout.module.css' 

const AuthLayout = () => {
  return (

    <>
        <main className={styles.colorFondo}>
          {/* Outlet permite iyectar los componentes hijos, App.jsx -> Login dentro de AuthLayout */}
          <Outlet />    

          <h1 className="bg-red-500">Titulo en AuthLayout para probar Tailwind</h1>

        </main>

    </>
  )
}

export default AuthLayout