import React from 'react'
import styles from '../ConfirmAccount/ConfirmAccount.module.css' 

const ConfirmAccount = () => {


  return (
    <>
      <div className={styles.container} >
        <h1 className={styles.title}> Confirma tu cuenta  
          <span className={styles.span}> Administra tus Finanzas Ahora Mismo</span>
        </h1>       
          
        <a className={styles.tokenLink} href='#'>Link con el token</a>

      </div>     
      
    </>
  )
}

export default ConfirmAccount