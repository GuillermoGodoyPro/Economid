import React, { useState } from 'react'
import styles from './Login.module.css' 
import Alerta from '../../components/Alerta'

import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios';
import useAuth from '../../hooks/useAuth';


/* 
import.meta.env.GOOGLE_CLIENT_ID 
*/

const Login = () => {

  const [ email, setEmail] = useState('')
  const [ contraseña, setContraseña] = useState('')

  const [alerta, setAlerta ] = useState({})
  const { setAuth } = useAuth();

  const navigate = useNavigate()

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
      setAuth(data.token)   
      
      //TODO: Poner spinner
      setTimeout(() => {
        
        navigate('/dashboard')
        setAlerta({})
        
      }, 1500 )
      

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

  const {msg} = alerta

  return (
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
  
    
  )
}

export default Login