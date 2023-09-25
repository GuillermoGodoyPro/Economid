import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUP/SignUp"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ConfirmAccount from "./pages/ConfirmAccount/ConfirmAccount"
import ProtectedPath from "./layouts/ProtectedPath"
import Dashboard from "./pages/Dashboard/Dashboard"
import NewPassword from "./pages/NewPassword/NewPassword"
import { AuthProvider } from "./context/AuthProvider"
import useFetch from "./hooks/useFetch"
import { useEffect } from "react"

function App() {
  // EJEMPLO de como usar el useFetch
  // useEffect(() => {
  //   const llamar = async () => {
  //     const [data, error] = await useFetch('https://jsonplaceholder.typicode.com/todos/1');
  //     if(data) {
  //       console.log(data)
  //     }else{
  //       console.log(error)
  //     }
  //   };
  //   llamar();
  // }, []);

  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          {/* Dentro de la ruta pública, la página de inicio (path ="/"), va a empezar con iniciar sesión (AuthLayout) */}
          <Route path="/" element={<AuthLayout />}>
              <Route index element={ <Login />} />
              <Route path="signup" element={ <SignUp/>} />
              {/* Según doc: si agregamos forgotpassword/:token o confirm/:id podemos hacerlo dinámico para que el usuario recupere contraseña o confirme */}
              <Route path="forgotpassword" element={ <ForgotPassword/>} />
              <Route path="forgotpassword/:token" element={ <NewPassword/>} />
              <Route path="confirm/:id" element={ <ConfirmAccount/>} />                 
          </Route>

          {/* Dentro de la ruta privada, cuando el usuario esta autenticado, hay llamar a otro grupo de rutas */}
          {/* para invocar el dashboard, dentro de una ruta protegida (para proteger el resto de los componentes), todo lo que esté debajo de ruta protegida */}
          
          <Route path="/dashboard" element={ <ProtectedPath/> }>
            <Route index element={<Dashboard />}/>
          </Route>

          

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
