import { Link, useNavigate } from "react-router-dom"
import styles from '../SignUP/SignUp.module.css' 
import { useState } from "react"
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/clienteAxios"
import useFetch from "../../hooks/useFetch"
import { useAuthContext } from "../../context/AuthProvider"
import jwtDecode from "jwt-decode"

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    repetirPassword: '',
    esAdmin: true,
  });
  const [alerta, setAlerta ] = useState({})
  const { setUsuario } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    const {nombre, apellido, email, contraseña, repetirPassword} = signUpData;
    /* Validación de campos */
    if ([nombre, apellido, email, contraseña, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (contraseña !== repetirPassword) {
      setAlerta({
        msg: 'No coinciden los password',
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

    const  [data, error] = await useFetch('/Usuario/RegistroUsuario', 'POST', signUpData);
    if (data) {
      localStorage.setItem('token', data.token);
      setUsuario(jwtDecode(data.token))
      navigate('/')
      setLoading(false)
    }else {
      setAlerta({
        msg: error.response.data,
        error: true,
      })
      setLoading(false)
    }
  }
  
  const handleChange = (e) => {
    const field = event.target.name;
    const value = event.target.value;
    setSignUpData({
      ...signUpData,
      [field]: value,
    })
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
            >Nombre</label>
            <input
                id='nombre'
                name='nombre'
                type='nombre'
                placeholder='Nombre'
                className={styles.input}
                value={signUpData.nombre}
                onChange={handleChange}
            />

          </div>
          <div>
            <label className={styles.label}
              htmlFor='apellido'
            >Apellido</label>
            <input
                id='apellido'
                name='apellido'
                type='apellido'
                placeholder='Apellido'
                className={styles.input}
                value={signUpData.apellido}
                onChange={handleChange}
            />

          </div>
          <div>
            <label className={styles.label}
              htmlFor='email'
            >Correo Electrónico</label>
            <input
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                className={styles.input}
                value={signUpData.email}
                onChange={handleChange}
            />

          </div>


          <div>
            <label className={styles.label}
              htmlFor='contraseña'
            >Contraseña</label>
            <input
                id='contraseña'
                name='contraseña'
                type='password'
                placeholder='Password'
                className={styles.input}
                value={signUpData.contraseña}
                onChange={handleChange}
            />

          </div>

          <div>
            <label className={styles.label}
              htmlFor='passwordRep'
            >Repetir Contraseña</label>
            <input
                id='passwordRep'
                name='repetirPassword'
                type='password'
                placeholder='Repetir Password'
                className={styles.input}
                value={signUpData.repetirPassword}
                onChange={handleChange}
            />

          </div>

          <div
            className={styles.submit}
          >
            <input
              className={styles.button}
              type="submit"
              value={loading ? "Cargando..." : "Crear Cuenta"}
            />
          </div>

          {/* Pasamos el estado de alerta por props */}
          {msg && <Alerta alerta={alerta} />}


        </form>

        <div className={styles.nav}>
          <nav>
            <Link className={styles.link} to="/">
              Iniciar sesión
            </Link>

            <Link className={styles.link}
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