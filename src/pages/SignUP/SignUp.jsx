import { Link } from "react-router-dom"
import styles from '../SignUP/SignUp.module.css' 
import { useState } from "react"
import Alerta from "../../components/Alerta"
import axios from "axios"


const SignUp = () => {

  const [ nombre, setNombre] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta ] = useState({})

  /* esta función tiene que ser asincrona para poder consultar al back */
  const handleSubmit = async e => {
    e.preventDefault();

    /* Validación de campos */
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'No coinciden los password',
        error: true
      })
      return
    }

    if(password.length < 6 ){
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
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuario/`, 
      {nombre, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      /* Reseteo los state para que no se vea en formulario */
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

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
        <h1 className={styles.title}> Bienvenido a
          <span className={styles.span}> MyFinance</span>
        </h1>
        
          
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div>
            <label className={styles.label}
              htmlFor='nombre'
            >Nombre de usuario</label>
            <input
                id='nombre'
                type='nombre'
                placeholder='Nombre'
                className={styles.input}
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />

          </div>
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
          
          <div>
            <label className={styles.label}
              htmlFor='passwordRep'
            >Repetir Password</label>
            <input
                id='passwordRep'
                type='repetirPassword'
                placeholder='Repetir Password'
                className={styles.input}
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />

          </div>
          
          <div
             className={styles.submit}
          >
            <input 
              className={styles.button}
              type="submit"
              value="Crear Cuenta"
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

export default SignUp