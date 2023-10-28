import React from 'react'
import useAuth from '../hooks/useAuth'
import jwt_decode from "jwt-decode";

const Perfil = () => {
  const { auth } = useAuth()
  const usuario = jwt_decode(auth);

  return (
    <div>
      <h2>{usuario.Nombre}</h2>
      safasfasf

    </div>
  )
}

export default Perfil