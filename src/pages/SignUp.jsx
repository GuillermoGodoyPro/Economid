import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <>
      
      <h1>Crea tu cuenta en
        <span>economid</span>
      </h1>

      <form>
        <p>Formulario</p>
        <p>Formulario</p>
        <p>Formulario</p>
        <p>Formulario</p>
      </form>

      {/* se podría usar flex en el nav para ubicar uno de lado izq y otro a la derecha, en movil se ubicaría uno debajo del otro */}
      <nav>
        <Link to="/">
          ¿Ya tienes una cuenta? Inica Sesión
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

export default SignUp