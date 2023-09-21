import React, { useState } from 'react'
import styles from '../ForgotPassword/ForgotPassword.module.css' 
import Alerta from '../../components/Alerta'

import { Link } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'

const ForgotPassword = () => {

  const [ email, setEmail] = useState('')

  const [alerta, setAlerta ] = useState({})

  /* esta función tiene que ser asincrona para poder consultar al back */
  const handleSubmit = async e => {
    e.preventDefault();

    /* Validación de campos */
    if([email].includes('')){
      setAlerta({
        msg: 'INGRESAR EMAIL',
        error: true
      })
      return
    }    
      
    setAlerta({})

    // Enviar datos del usuario a la API para crear cuenta
    try {
      /* hago este destructuring, para obtener solo los datos (data) y no toda la respuesta */
      const { data } = await clienteAxios.post(`/usuarios`, 
      {email} )

      setAlerta({
        msg: data.msg,
        error: false
      })

      /* Reseteo los state para que no se vea en formulario */      
      setEmail('')     
      

    } catch (error) {
        console.log(error.response.data.msg)
        /* si no hay mensaje, msg = "Error de conexión con la base de datos" */

        /* 
          setAlerta({
            msg: error.response.data.msg,
            error: false
          })
        */
    }

  }

  const { msg } = alerta

  return (
    <>
      <div className={styles.container} >
        <h1 className={styles.title}> Recupera tu cuenta  
          <span className={styles.span}> Administra tus Finanzas</span>
        </h1>
        
          
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          
          <div>
            <label className={styles.label}
              htmlFor='email'
            >Email</label>
            <input
                id='email'
                type='email'
                placeholder='Email'
                className={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

          </div>          
          
          <div
             className={styles.submit}
          >
            <input 
              className={styles.button}
              type="submit"
              value="Recuperar contraseña"
            />
          </div>

          {/* Pasamos el estado de alerta por props */}
          {msg && <Alerta alerta={alerta} /> }
          
          
        </form>

        <div className={styles.nav}>
          <nav>
            <Link className={styles.link} to="/">
              Iniciar sesión
            </Link>
            
            <Link  className={styles.link}
              to="/signup"         
            >
              Regístrate
            </Link>

          </nav>
        </div>

      </div>

      {/* se podría usar flex en el nav para ubicar uno de lado izq y otro a la derecha, en movil se ubicaría uno debajo del otro */}
      
      
    </>
  )
}

export default ForgotPassword