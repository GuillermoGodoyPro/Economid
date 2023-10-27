import React from 'react'
import { Link } from 'react-router-dom'
import logoparaMF from '../assets/logoparaMF.png'


const Header = () => {
  return (
    <>
      <header className='border border-t md:justify-between '>        
        
          <div className='mt-1 px-4 py-5  flex items-center gap-3 justify-between'>

            <Link
                to=""
                className=" mr-2 mt-1 overflow-hidden flex justify-center"
            >
              <img 
                src={logoparaMF}
                className='rounded-2xl w-12'
                alt="Logo"
              />
              
             
            </Link>                 

            <Link 
              to="perfil"
              className='text-violet-600 font-bold uppercase'
            >        
              Perfil Samuel
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