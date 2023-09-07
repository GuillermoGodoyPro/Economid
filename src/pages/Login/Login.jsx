import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      
      <h1>Inicia sesión para empezar a administrar tu 
        <span>economía</span>
      </h1>

      <form>
        <p>Formulario</p>
        
      </form>

      {/* se podría usar flex en el nav para ubicar uno de lado izq y otro a la derecha, en movil se ubicaría uno debajo del otro */}
      <nav>
        <Link to="/signup">
          ¿No tienes una cuenta? Regístrate
        </Link>
       <br /> {/* TODO: Borrar esto cuando se trabaje el CSS */}
        <Link 
          to="/forgotpassword"         
        >
          Olvidé mi password
        </Link>

      </nav>
    </>
  )
}

export default Login