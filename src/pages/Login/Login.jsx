import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css' 

const Login = () => {
  return (
    <>
      <div className={styles.container} >
        <span className={styles.span}> ¿Controlar tus finanzas? ¡fácil! </span>
        <h1 className={styles.title}>Inicia sesión</h1>
          
        <form  className={styles.form}>
          <div>
            <label className={styles.label}
              htmlFor='email'
            >Email</label>
            <input
                id='email'
                type='email'
                placeholder='Email'
                className={styles.input}
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
            />

          </div>
          
          <div
             className={styles.submit}
          >
            <input 
              className={styles.button}
              type="submit"
            />
          </div>
          
        </form>

        <div className={styles.nav}>
          <nav>           
            <Link to="/signup">
              ¿No tienes una cuenta? Regístrate
            </Link>
            <Link 
              to="/forgotpassword"         
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