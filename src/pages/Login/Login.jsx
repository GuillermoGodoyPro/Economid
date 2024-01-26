import { useState } from "react";
import styles from "./Login.module.css";
import Alerta from "../../components/Alerta";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { setUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import { login } from "../../services/myfinances-api/usuario";
import { HttpStatusCode } from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setCargando(false);
        /* Validación de campos */
        if ([email, contraseña].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 5000);

            setCargando(true);
        }
        else {
            try {
                const { data, status } = await login({ email, contraseña });
                if (status === HttpStatusCode.Ok) {
                    setUserToken("token", data.token);
                    setAuth(data.token);
                    setUserToken("user", JSON.stringify(jwtDecode(data.token)));
                    navigate("/dashboard/index");
                }
            } catch (error) {
                console.log(error);
                setAlerta({
                    msg: error.response.data,
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
                setCargando(true);
            }
        }
    };
    const { msg } = alerta;

    return (
        <div className={styles.container}>

            <div className="flex justify-center">
                <div className="text-center p-5 m-5 w-20 rounded-3xl bg-violet-400">
                    <i className="fa-solid fa-dragon"></i>
                </div>
            </div>
            <span className={styles.span}>Bienvenido a My Finances</span>
            <h1 className={styles.title}>Inicia sesión</h1>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div>
                    <label className={styles.label}
                        htmlFor='email'
                    >Correo Electrónico</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Correo Electrónico'
                        className={styles.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>


                <div>
                    <label className={styles.label}
                        htmlFor='contraseña'
                    >Contraseña</label>
                    <input
                        id='contraseña'
                        type='password'
                        placeholder='Contraseña'
                        className={styles.input}
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                    />

                </div>

                <div
                    className={styles.submit}
                >
                    <input
                        className={styles.button}
                        type="submit"
                        value={!cargando ? "Ingresando..." : "Ingresar"}
                    />

                </div>


                {/* Pasamos el estado de alerta por props */}
                {msg && <Alerta alerta={alerta} />}

            </form>


            <div className={styles.nav}>
                <nav>

                    <p>
                        ¿Aún no tienes tu cuenta?
                    </p>
                    <Link
                        className={styles.link} to="/signup">
                        Regístrate
                    </Link>
                    {/* <Link
                        className={styles.link} to="/forgotpassword"
                    >
                        Recuperar contraseña
                    </Link> */}

                    {/* <Link
                className={styles.link} to="/dashboard">
                dasboard
              </Link> */}
                </nav>
            </div>
        </div>
    );
};

export default Login;