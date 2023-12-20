import { createContext, useEffect, useState } from "react";

const DarkContext = createContext();

const DarkProvider = ({ children }) => {

    const darkInit = localStorage.getItem("colorScheme") === "true";
    const [dark, setDark] = useState(darkInit);

    // Se actualiza el estilo al iniciar la app
    useEffect(() => {
        setDark((estadoDarkMode) => {
            const nuevoEstoDarkMode = estadoDarkMode;

            // Actualizar estilos y almacenar en localStorage
            if (nuevoEstoDarkMode) {
                document.documentElement.style.setProperty("--crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco", "#ffffff");
                document.documentElement.style.setProperty("--gris", "#303030");
                document.documentElement.style.setProperty("--violetlight", "#4f339ccb");

            } else {
                document.documentElement.style.setProperty("--crema", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--blanco", "#cac2e9");
                document.documentElement.style.setProperty("--gris", "#13159e");
                document.documentElement.style.setProperty("--violetlight", "#865ef7c9");
            }
            localStorage.setItem("colorScheme", nuevoEstoDarkMode.toString());

            return nuevoEstoDarkMode;
        });

    }, []);

    const changeDarkMode = () => {
        setDark((estadoDarkMode) => {
            const nuevoEstoDarkMode = !estadoDarkMode;

            // Actualizar estilos y almacenar en localStorage
            if (nuevoEstoDarkMode) {
                document.documentElement.style.setProperty("--crema", "#f5f5f3");
                document.documentElement.style.setProperty("--blanco", "#ffffff");
                document.documentElement.style.setProperty("--gris", "#303030");
                document.documentElement.style.setProperty("--violetlight", "#4f339ccb");

            } else {
                document.documentElement.style.setProperty("--crema", "rgb(55 65 81)");
                document.documentElement.style.setProperty("--blanco", "#cac2e9");
                document.documentElement.style.setProperty("--gris", "#13159e");
                document.documentElement.style.setProperty("--violetlight", "#865ef7c9");
            }
            localStorage.setItem("colorScheme", nuevoEstoDarkMode.toString());

            return nuevoEstoDarkMode;
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