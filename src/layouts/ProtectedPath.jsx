import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import styles from '../styles/ProtectedPath.module.css' 
import { useAuthContext } from '../context/AuthProvider'


const ProtectedPath = () => {
  const isAuth = localStorage.getItem('token')
  const {usuario} = useAuthContext();

  if (!isAuth || !usuario) return <Navigate to="/login" />

  return (
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
}

export default ProtectedPath