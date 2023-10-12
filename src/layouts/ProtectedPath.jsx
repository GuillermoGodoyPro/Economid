import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import styles from '../styles/ProtectedPath.module.css' 

import useAuth from "../hooks/useAuth"


const ProtectedPath = () => {


  const { auth, cargando } = useAuth()

  // TODO: Crear el context de Auth o useAuth, supongo que quedará auth.Id
  const authId = true

  // TODO: usar un spinner
  if(cargando) return 'Cargando...'

  return (

    // Si existe auth.id Ingresa a dashboard por medio de ProtectedPath (ver el navegate to Dashboard en App.jsx)
    <>      
      { auth ?
        (
          
        <div className={styles.container}>     
                   
            <div className={styles.menu}>
              <Sidebar />
            </div>
            
            <div className={styles.mainContainer}>
              <div className={styles.headerContainer}>
                <Header />
              </div>  

              <main>
                <Outlet />
              </main>
            </div>
            

        </div>
        ) : <Navigate to="/" />}
    </>
  )
}

export default ProtectedPath