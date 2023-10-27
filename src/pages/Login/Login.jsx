import React, { useState } from 'react'
import styles from './Login.module.css' 
import Alerta from '../../components/Alerta'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import { Link, Navigate, useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios';


/* 
import.meta.env.GOOGLE_CLIENT_ID */
const Login = () => {

  const [ email, setEmail] = useState('')
  const [ contraseña, setContraseña] = useState('')

  const [alerta, setAlerta ] = useState({})

 

  const handleSubmit = async e => {
    e.preventDefault();


     /* Validación de campos */
     if([ email, contraseña ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuario/login', { email, contraseña })
      localStorage.setItem('token', data.token)
<<<<<<< HEAD

      window.location.href="/dashboard"
=======
      
      setAuth(data)
      
      // window.location.href="/dashboard"
      setTimeout(() => {
        setAlerta({})
        navigate('/dashboard')
        
      }, 1500 )
>>>>>>> 3c8cc4c27f653d5d75f20b1bf8172eedfe55d220

            

     // console.log(data)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
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
  
  const navigate = useNavigate()

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
                htmlFor='contraseña'
              >Password</label>
              <input
                  id='contraseña'
                  type='password'
                  placeholder='Password'
                  className={styles.input}
                  value={contraseña}
                  onChange={e => setContraseña(e.target.value)}
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
              <Link 
                className={styles.link} to="/signup">
                Registrarse
              </Link>
              <Link 
                className={styles.link}  to="/forgotpassword"         
              >
                Recuperar contraseña
              </Link>

              {/* <Link 
                className={styles.link} to="/dashboard">
                dasboard
              </Link> */}
            </nav>
          </div>

        </div>     

    
    </GoogleOAuthProvider>
    
  )
}

export default Login