import React, { useState } from 'react'
import styles from './Login.module.css'
import Alerta from '../../components/Alerta'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useAuthContext } from '../../context/AuthProvider'
import jwtDecode from 'jwt-decode'

const Login = () => {
  const navigate = useNavigate();
  const { setUsuario } = useAuthContext();
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    contraseña: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true)

    /* Validación de campos */
    const { email, contraseña } = loginData;
    if ([email, contraseña].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    const [data, error] = await useFetch('/Usuario/Login','POST',loginData);
    if(data) {
      setCargando(false)
      localStorage.setItem('token', data.token)
      setUsuario(jwtDecode(data.token))
      navigate('/')
    }else {
      setCargando(false)
      setAlerta({
        msg: error.response.data,
        error: true
      })
    }
  }

  const handleChange = (e) => {
    const field = event.target.name;
    const value = event.target.value;
    setLoginData({
      ...loginData,
      [field]: value,
    })
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
          <label className={styles.label} htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            className={styles.input}
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor='contraseña'>Password</label>
          <input
            id='contraseña'
            name='contraseña'
            type='password'
            placeholder='Password'
            className={styles.input}
            value={loginData.contraseña}
            onChange={handleChange}
          />
        </div>
        <div className={styles.submit}>
          <input
            className={styles.button}
            type="submit"
            value={cargando ? "Ingresando..." : "Ingresar"}
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
        </nav>
      </div>
    </div>
  )
}

export default Login