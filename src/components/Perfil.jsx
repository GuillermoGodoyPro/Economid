import React from "react";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

const Perfil = () => {
  const { auth } = useAuth();
  const usuario = jwtDecode(auth);

  return (
    <div>
      <h2>{usuario.Nombre}</h2>
      safasfasf

    </div>
  );
};

export default Perfil;