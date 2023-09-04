import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import ConfirmAccount from "./pages/ConfirmAccount"

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


      </Routes>
    </BrowserRouter>
  )
}

export default App
