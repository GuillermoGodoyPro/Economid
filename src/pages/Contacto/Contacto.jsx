import styles from "./Contacto.module.css";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contacto = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_jmvlwrv', 'template_7c9hes7', form.current, '5i-TrgWemBZMWc1JC')
            .then((result) => {
                console.log(result.text);
                document.getElementById("form1").reset();

            }, (error) => {
                
                console.log(error.text);
            });
    };

    return (
        <div className={styles.container2}>
        <form id="form1" ref={form}>
            <p className={styles.title}>Nombre</p>
            <input className={styles.input} type="text" name="user_name" />
            <p className={styles.title}>Email</p>
            <input className={styles.input} type="email" name="user_email" />
            <p className={styles.title}>Mensaje</p>
            <textarea className={styles.textarea} name="message" />
            <br></br>
            <button className={styles.button} onClick={sendEmail}>ENVIAR</button>
         
          
        </form>
        </div>
    );
};

export default Contacto;