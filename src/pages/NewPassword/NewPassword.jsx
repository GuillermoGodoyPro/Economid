import React, { useState } from 'react'
import Alerta from '../../components/Alerta'
import styles from '../NewPassword/NewPassword.module.css' 


import { Link } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'

const NewPassword = () => {
  
  const [ contraseña, setContraseña] = useState('')
  const [alerta, setAlerta ] = useState({})

  /* esta función tiene que ser asincrona para poder consultar al back */
  const handleSubmit = async e => {
    e.preventDefault();

    /* Validación de campos */
    if([contraseña].includes('')){
      setAlerta({
        msg: 'Ingresar nueva contraseña',
        error: true
      })
      return
    }

    
    if(contraseña.length < 6 ){
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    // Enviar datos del usuario a la API para crear cuenta
    try {
      /* hago este destructuring, para obtener solo los datos (data) y no toda la respuesta */
      const { data } = await clienteAxios.post(`/usuarios`, 
      {nombre, email, contraseña} )

      setAlerta({
        msg: data.msg,
        error: false
      })

      /* Reseteo los state para que no se vea en formulario */
      
      setContraseña('')

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
        <h1 className={styles.title}> Reestablece tu 
          <span className={styles.span}> Password</span>
        </h1>
        
          
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          
          <div>
            <label className={styles.label}
              htmlFor='contraseña'
            >Nuevo Password</label>
            <input
                id='contraseña'
                type='password'
                placeholder='Escribe tu nuevo Password'
                className={styles.input}
                value={contraseña}
                onChange={e => setPassword(e.target.value)}
            />

          </div>          
                   
          <div
             className={styles.submit}
          >
            <input 
              className={styles.button}
              type="submit"
              value="Guardar nuevo Password"
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
              to="/forgotpassword"         
            >
              Recuperar contraseña
            </Link>

          </nav>
        </div>

      </div>

      {/* se podría usar flex en el nav para ubicar uno de lado izq y otro a la derecha, en movil se ubicaría uno debajo del otro */}
      
      
    </>
  )
}

export default NewPassword