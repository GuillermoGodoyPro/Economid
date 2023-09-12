import { Link } from "react-router-dom"
import styles from '../SignUP/SignUp.module.css' 

const SignUp = () => {
  return (
    <>
      <div className={styles.container} >
        <h1 className={styles.title}> Bienvenido a
          <span className={styles.span}> MyFinance</span>
        </h1>
        
          
        <form  className={styles.form}>
          <div>
            <label className={styles.label}
              htmlFor='nombre'
            >Nombre</label>
            <input
                id='nombre'
                type='nombre'
                placeholder='Nombre'
                className={styles.input}
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
          
          <div>
            <label className={styles.label}
              htmlFor='repetirPassword'
            >Repetir Password</label>
            <input
                id='repetirPassword'
                type='repetirPassword'
                placeholder='Repetir Password'
                className={styles.input}
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
          
        </form>

        <div className={styles.nav}>
          <nav>
            <Link to="/">
              ¿Ya tienes una cuenta? Inica Sesión
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

export default SignUp