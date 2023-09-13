import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css' 
import Alerta from '../../components/Alerta'

const Login = () => {

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  const [alerta, setAlerta ] = useState({})



  const handleSubmit = e => {
    e.preventDefault();

    console.log("Logeando")

     /* Validación de campos */
     if([ email, password ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    setAlerta({})

  }

  const {msg} = alerta

  return (
    <>
      <div className={styles.container} >
        <span className={styles.span}> ¿Controlar tus finanzas? ¡fácil! </span>
        <h1 className={styles.title}>Inicia sesión</h1>
          
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


          <div>
            <label className={styles.label}
              htmlFor='password'
            >Password</label>
            <input
                id='password'
                type='password'
                placeholder='Password'
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

          </div>
          
          <div
             className={styles.submit}
          >
            <input 
              className={styles.button}
              type="submit"
              value="Enviar"
            />
          </div>


          {/* Pasamos el estado de alerta por props */}
          {msg && <Alerta alerta={alerta} /> }
          
        </form>

        <div className={styles.nav}>
          <nav>           
            <Link className={styles.link} to="/signup">
            Regístrate
            </Link>
            <Link 
             className={styles.link}  to="/forgotpassword"         
            >
              Olvidé mi password
            </Link>

          </nav>
        </div>

      </div>

      {/* se podría usar flex en el nav para ubicar uno de lado izq y otro a la derecha, en movil se ubicaría uno debajo del otro */}
      
      
    </>
  )
}

export default Login