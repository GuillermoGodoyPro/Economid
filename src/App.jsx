import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUP/SignUp"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ConfirmAccount from "./pages/ConfirmAccount/ConfirmAccount"
import ProtectedPath from "./layouts/ProtectedPath"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
          {/* Dentro de la ruta pública, la página de inicio (path ="/"), va a empezar con iniciar sesión (AuthLayout) */}
          <Route path="/" element={<AuthLayout />}>
              <Route index element={ <Login />} />
              <Route path="signup" element={ <SignUp/>} />
              {/* Según doc: si agregamos forgotpassword/:token o confirm/:id podemos hacerlo dinámico para que el usuario recupere contraseña o confirme */}
              <Route path="forgotpassword" element={ <ForgotPassword/>} />
              <Route path="confirm/:id" element={ <ConfirmAccount/>} />        
         
          </Route>

          {/* Dentro de la ruta privada, cuando el usuario esta autenticado, hay llamar a otro grupo de rutas */}
          {/* para invocar el dashboard, dentro de una ruta protegida (para proteger el resto de los componentes), todo lo que esté debajo de ruta protegida */}
          
          <Route path="/dashboard" element={ <ProtectedPath/> }>
            <Route index element={<Dashboard />}/>
          </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
