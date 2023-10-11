import React from 'react'
import logoparaMF from '../assets/logoparaMF.png'
import burger from '../assets/cerrar.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=" bg-violet-400 h-screen border-r px-2 flex">
        <div className="px-2">
            <div className="flex items-center mb-4">
                <div>
                    <div className='flex justify-end bg-violet-400 rounded '>
                        <img 
                            src={burger}
                            className='flex w-4 h-4 rounded-3xl mt-2'
                        />        
                    </div>  

                    <div className=" mr-2 mt-2 overflow-hidden flex justify-center">
                        <img className='rounded-2xl w-12' src="src/assets/logoparaMF.png" alt="Logo"/>
                    </div>                   
                    <h2 className=" mt-2 flex ml-2 mr-4 text-white text-2xl font-semibold">MyFinance</h2>                        


                </div>
                
            </div>
                <div className='mt-6 block'>                    
                    
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-gray-200 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-gray-200 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-gray-200 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-gray-200 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-gray-200 font-bold">
                        Item                        
                    </Link>
                </div>
                

                
        </div>
    </div>
    
  )
}

export default Sidebar

// 