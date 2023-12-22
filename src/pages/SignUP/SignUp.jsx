import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import { register } from "../../services/myfinances-api/usuario";



const SignUp = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [cargando, setLoading] = useState(false);
    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({});

    /* esta función tiene que ser asincrona para poder consultar al back */
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        /* Validación de campos */
        if ([nombre, apellido, email, contraseña, repetirPassword].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        if (contraseña !== repetirPassword) {
            setAlerta({
                msg: "No coinciden los password",
                error: true
            });
            return;
        }

        setAlerta({});

        // Enviar datos del usuario a la API para crear cuenta
        try {
            /* hago este destructuring, para obtener solo los datos (data) y no toda la respuesta */
            const { status } = await register({ nombre, apellido, email, esAdmin: false, contraseña });
            if (status === 200) {
                setLoading(false);
                setAlerta({
                    msg: "Usuario creado con éxito. Redirigiendo al inicio de sesión...",
                    error: false
                });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
            setNombre("");
            setApellido("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");

        } catch (error) {
            if (contraseña.length < 6) {
                setAlerta({
                    msg: error.response.data.errors.Contraseña[0],
                    error: true
                });
            }
            else {
                setAlerta({
                    msg: error.response.data,
                    error: true
                });
            }
            setTimeout(() => {
                setAlerta({});
            }, 5000);
        }
    };

    const { msg } = alerta;

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
                            type='nombre'
                            placeholder='Nombre'
                            className={styles.input}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                    </div>
                    <div>
                        <label className={styles.label}
                            htmlFor='apellido'
                        >Apellido</label>
                        <input
                            id='apellido'
                            type='apellido'
                            placeholder='Apellido'
                            className={styles.input}
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                        />

                    </div>
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
                            onChange={e => setPassword(e.target.value)}
                        />

                    </div>

                    <div>
                        <label className={styles.label}
                            htmlFor='passwordRep'
                        >Repetir Contraseña</label>
                        <input
                            id='passwordRep'
                            type='password'
                            placeholder='Repetir Contraseña'
                            className={styles.input}
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />

                    </div>

                    <div
                        className={styles.submit}
                    >
                        <input
                            className={`${styles.button}`}
                            type="submit"
                            value={!cargando ? "Crear Cuenta" : "Registrando..."}
                        />
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                </form>
                <div className={styles.nav}>
                    <nav>
                        <p>
                            ¿Ya tienes tu cuenta?
                        </p>
                        <Link className={styles.link} to="/">
                            Iniciar sesión
                        </Link>

                        {/* <Link className={styles.link}
                            to="/forgotpassword"
                        >
                            Recuperar contraseña
                        </Link> */}

                    </nav>
                </div>

            </div>
        </>
    );
};

export default SignUp;