import React from 'react'
import logoparaMF from '../assets/logoparaMF.png'
import burger from '../assets/cerrar.svg'

const Sidebar = () => {
  return (
    <div class="w-1/6 bg-gray-800 h-screen">
    <div class="p-4">
    <div class="flex items-center mb-4">
          
            <div class="w-12 h-12 overflow-hidden">
                <img src="src/assets/logoparaMF.png" alt="Logo"/>
            </div>

            
            <h1 class="ml-2 text-white text-2xl font-semibold">MyFinance</h1>
        </div>

        

        
        <ul class="mt-4">
            <li class="mb-2">
                <a href="#" class="text-xl  text-gray-300 hover:text-white ">Item</a>
            </li>
            <li class="mb-2">
                <a href="#" class="text-xl text-gray-300 hover:text-white">Item</a>
            </li>
            <li class="mb-2">
                <a href="#" class="text-xl text-gray-300 hover:text-white">Item</a>
            </li>
            <li class="mb-2">
                <a href="#" class="text-xl text-gray-300 hover:text-white">Item</a>
            </li>
        </ul>
    </div>
</div>
    
  )
}

export default Sidebar

// 