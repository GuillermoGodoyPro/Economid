import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from '../styles/ProtectedPath.module.css' 

const ProtectedPath = () => {

  // TODO: Crear el context de Auth o useAuth, supongo que quedará auth.Id
  const authId = true

  return (

    <>
      { authId ?
        (
        <div className={styles.container}>            
            <Sidebar />
            
            <div className={styles.mainContainer}>
              <Header />

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