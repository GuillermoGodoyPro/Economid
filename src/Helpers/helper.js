/*DONE -> TODO: Realizar conexiones de css.modules de protected path, dashboard, forgotpassword, login, newpassword, perfil*/
/* Windows + shift + S para tomar captura en vsc */
/* TODO: Hacer los USER STORY de layouts e IDEX.css*/
/* TODO: Arreglar mediaquerys*/
/* TODO: Arreglar los states de "contraseña, setPassword y cambiar a setContraseña*/
/* TODO: VER 488 para header, sidebar  y perfil */

/* DOC GOOGLE LOGIN https://www.npmjs.com/package/@react-oauth/google */

//Función para obtener un ID aleatorio e irrepetible ( si es necesario)
export const generarId = () => {
    const random = Math.random().toString(36).slice(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

// Función para obtener fecha

/* export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    
    // Formato - 27 de Junio de 2023
    return fechaNueva.toLocaleDateString('es-ES', opciones)
    
} */

// Formato - 27/06/2023
/* fechaNueva.toLocaleDateString('es-ES')
 */
