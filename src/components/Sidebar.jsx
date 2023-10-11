import React from 'react'
import logoparaMF from '../assets/logoparaMF.png'
import burger from '../assets/cerrar.svg'

const Sidebar = () => {
  return (
    <div className=" bg-violet-400 h-screen border-r py-4 px-2 flex">
        <div className="p-2">
            <div className="flex items-center mb-4">
                <div>
                    <div className='flex justify-end'>
                        <img 
                            src={burger}
                            className='flex w-4 h-4 rounded-3xl'
                            />        
                    </div>

                    <div class="mt-1 overflow-hidden flex justify-between">
                        <img className='rounded-2xl w-12' src="src/assets/logoparaMF.png" alt="Logo"/>
                        <h2 className=" mt-1 flex ml-2 mr-10 text-white text-2xl font-semibold">MyFinance</h2>                        
                    </div>                   


                </div>
                
            </div>

                

                
                <ul className="mt-4">
                    <li className="mb-2">
                        <a href="#" className="text-xl text-white hover:text-gray-200 ">Item</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-xl text-white hover:text-gray-200">Item</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-xl text-white hover:text-gray-200">Item</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-xl text-white hover:text-gray-200">Item</a>
                    </li>
                </ul>
        </div>
    </div>
    
  )
}

export default Sidebar

// 