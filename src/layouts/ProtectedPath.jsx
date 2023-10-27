import React, { useContext } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import styles from '../styles/ProtectedPath.module.css' 
import AuthContext from '../context/AuthProvider'


const ProtectedPath = () => {

  
  const { auth, cargando } = useContext(AuthContext)
  // TODO: usar un spinner
  if(cargando) return 'Cargando...'
  
  const authid = true;
  
  return (

    // Si existe auth.id Ingresa a dashboard por medio de ProtectedPath (ver el navegate to Dashboard en App.jsx)
    <>  
        {
        authid ?
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
       
        )
        :
          (
            <Navigate to="/" />             
          )
        }
  
        
    </>
  )
}

export default ProtectedPath