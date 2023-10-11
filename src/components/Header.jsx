import React from 'react'
import { Link } from 'react-router-dom'
import burger from '../assets/cerrar.svg'


const Header = () => {
  return (
    <>
      <header className='border-b md:justify-between '>        
        
          <div className='mt-1 px-4 py-5  flex items-center gap-3 justify-between'>
           

            <Link 
              to="/perfil"
              className='text-violet-600 font-bold uppercase'
            >        
              Perfil
            </Link>
            <button
              type="button"
              className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
            >
              Cerrar Sesión
            </button>
          </div>
        
      </header>
    </>
  )
}

export default Header