import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css' 
import Alerta from '../../components/Alerta'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

/* 
import.meta.env.GOOGLE_CLIENT_ID */
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

  const handleSuccessLogin = (res) => {
    console.log(res)
  }
  const handleErrorLogin = (err) => {
    console.log(err)
  }
  

  const {msg} = alerta

  return (
    
    <GoogleOAuthProvider 
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    > 
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
            
            {/* TODO: hacer un estyles para centrar google login */}
            <div className="mt-4">
              <GoogleLogin onSuccess={handleSuccessLogin} onError={handleErrorLogin}/>
            </div>
          </form>          


          <div className={styles.nav}>
            <nav>           
              <Link className={styles.link} to="/signup">
              Registrarse
              </Link>
              <Link 
              className={styles.link}  to="/forgotpassword"         
              >
              Recuperar contraseña
              </Link>

            </nav>
          </div>

        </div>     

    
    </GoogleOAuthProvider>
    
  )
}

export default Login