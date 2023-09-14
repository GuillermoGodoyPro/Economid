import React from 'react'
import logoparaMF from '../assets/logoparaMF.png'
import burger from '../assets/cerrar.svg'

const Sidebar = () => {
  return (
    <div className='h-screen border-r py-4 px-2 flex'>
      <div>

        {/* MVP de menú, despues buscamos otro ícono */}
        <div className='flex justify-end'>
          <img 
            src={burger}
            className='flex w-6 h-6 rounded-3xl'
          />        
        </div>

        {/* TODO: Ajustar logo */}
        <img
          src={logoparaMF}
          alt='logoMF'
          className='w-16 h-16 rounded-3xl m-auto'
        />
        <h2 className='text-3xl text-violet-950 font-black mt-2'>
            MyFinance
        </h2>

      </div>
    </div>
  )
}

export default Sidebar