import React, { useState } from 'react'
import styles from './Login.module.css'
import Alerta from '../../components/Alerta'
import { Link, useNavigate } from 'react-router-dom'
import { UserLogin } from '../../services/usuario'
import useAuth from '../../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(false);
    /* Validación de campos */
    if ([email, contraseña].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        setAlerta({});
      }, 5000);

      setCargando(true);
    }
    else {
      try {
        const { data, status } = await UserLogin({ email, contraseña });
        if (status === 200) {
          localStorage.setItem('token', data.token);
          setAuth(data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        setAlerta({
          msg: error.response.data,
          error: true
        })
        setTimeout(() => {
          setAlerta({});
        }, 5000);
        setCargando(true);
      }
    }
  }
  const { msg } = alerta

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
          >Correo Electrónico</label>
          <input
            id='email'
            type='email'
            placeholder='Correo Electrónico'
            className={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

        </div>


        <div>
          <label className={styles.label}
            htmlFor='contraseña'
          >Contraseña</label>
          <input
            id='contraseña'
            type='password'
            placeholder='Contraseña'
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
            value={!cargando ? "Ingresando..." : "Ingresar"}
          />

        </div>


        {/* Pasamos el estado de alerta por props */}
        {msg && <Alerta alerta={alerta} />}

      </form>


      <div className={styles.nav}>
        <nav>
          <Link
            className={styles.link} to="/signup">
            Registrarse
          </Link>
          <Link
            className={styles.link} to="/forgotpassword"
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