import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedPath from "./layouts/ProtectedPath";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPassword from "./pages/NewPassword/NewPassword";
import { AuthProvider } from "./context/AuthProvider";
import { DarkProvider } from "./context/DarkProvider";
import Transacciones from "./pages/Transacciones/Transacciones";
import Balance from "./pages/Balance/Balance";
import Ayuda from "./pages/Ayuda/Ayuda";
import SignUp from "./pages/SignUp/SignUp";
import Metas from "./pages/Metas/Metas";
import Usuario from "./pages/Usuario/Usuario";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DarkProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={ <Login />} />
                            <Route path="signup" element={ <SignUp/>} />
                            <Route path="forgotpassword" element={ <ForgotPassword/>} />
                            <Route path="forgotpassword/:token" element={ <NewPassword/>} />
                        </Route>
                        <Route path="/dashboard" element={ <ProtectedPath/> }>
                            <Route path="index" element={<Dashboard />} />
                            <Route path="metas" element={<Metas />} />
                            <Route path="transacciones" element={<Transacciones />} />
                            <Route path="balance" element={<Balance />} />
                            <Route path="ayuda" element={<Ayuda />} />
                            <Route path="usuario" element={<Usuario />} />
                        </Route>
                    </Routes>
                </DarkProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;