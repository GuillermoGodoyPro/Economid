import { createContext, useEffect, useState } from "react";

const DarkContext = createContext();

const DarkProvider = ({ children }) => {

    const theme = localStorage.getItem("colorScheme");
    const darkInit = theme ?? "light";
    const [dark, setDark] = useState(darkInit);

    // Se actualiza el estilo al iniciar la app
    useEffect(() => {
        setDark((estadoDarkMode) => {

            // Actualizar estilos y almacenar en localStorage
            if (estadoDarkMode === "light") {
                document.documentElement.style.setProperty("--crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco-gris", "#ffffff");
                document.documentElement.style.setProperty("--gristopo-crema", "#303030");
                document.documentElement.style.setProperty("--blanco", "#ffffff");
                document.documentElement.style.setProperty("--gris", "#303030");
                document.documentElement.style.setProperty("--violetlight", "#4f339ccb");
                document.documentElement.style.setProperty("--gris-popup", "rgb(229 231 235)");
                document.documentElement.style.setProperty("--negro", "#141414");

            } else {
                document.documentElement.style.setProperty("--crema", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--blanco-gris", "rgb(75 85 99)");
                document.documentElement.style.setProperty("--gristopo-crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco", "#cac2e9");
                document.documentElement.style.setProperty("--gris", "#13159e");
                document.documentElement.style.setProperty("--violetlight", "#A78BFA");
                document.documentElement.style.setProperty("--gris-popup", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--negro", "white");
            }
            localStorage.setItem("colorScheme", estadoDarkMode);

            return estadoDarkMode;
        });

    }, []);

    const changeDarkMode = () => {
        setDark((estado) => {
            estado = dark === "dark" ? "light" : "dark";
            // Actualizar estilos y almacenar en localStorage
            if (estado === "light") {
                document.documentElement.style.setProperty("--crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco-gris", "#ffffff");
                document.documentElement.style.setProperty("--gristopo-crema", "#303030");
                document.documentElement.style.setProperty("--blanco", "#ffffff");
                document.documentElement.style.setProperty("--gris", "#303030");
                document.documentElement.style.setProperty("--violetlight", "#4f339ccb");
                document.documentElement.style.setProperty("--gris-popup", "rgb(229 231 235)");
                document.documentElement.style.setProperty("--negro", "#141414");

            } else {
                document.documentElement.style.setProperty("--crema", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--blanco-gris", "rgb(75 85 99)");
                document.documentElement.style.setProperty("--gristopo-crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco", "#cac2e9");
                document.documentElement.style.setProperty("--gris", "#13159e");
                document.documentElement.style.setProperty("--violetlight", "#A78BFA");
                document.documentElement.style.setProperty("--gris-popup", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--negro", "white");
            }
            localStorage.setItem("colorScheme", estado);

            return estado;
        });
    };

    return (
        <DarkContext.Provider
            value={{
                dark,
                changeDarkMode
            }}
        >

            {children}
        </DarkContext.Provider>

    );
};

export {
    DarkProvider
};

export default DarkContext;