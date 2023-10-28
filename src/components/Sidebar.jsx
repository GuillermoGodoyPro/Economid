import React from 'react'
//import logoparaMF from '../assets/logoparaMF.png'
import burger from '../assets/cerrar.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-violet-400 h-full px-2 flex border-t ">
      
        <div className="px-2">
            <div className="flex items-center mb-4">
                <div>
                    <div className=' flex justify-end rounded  '>
                        <img 
                            src={burger}
                            className=' p-2 bg-violet-400 w-8 h-8 rounded-3xl mt-2'
                        />        
                    </div>  

                      
                    <h2 className="mt-1 flex ml-2 mr-4 text-white  hover:text-violet-800 text-3xl font-bold">MyFinance</h2>                        


                </div>
                
            </div>
                <div className='mt-6 block fixed'>                    
                    
                    <Link className="mb-6 ml-6 text-md text-white hover:text-violet-800 font-bold">
                        Perfil Económico                        
                    </Link>
                    <Link className="mb-6 ml-6 text-md text-white hover:text-violet-800 font-bold">
                        Transacciones                        
                    </Link>
                    <Link className="mb-6 ml-6 text-md text-white hover:text-violet-800 font-bold">
                        Balance                        
                    </Link>
                    {/* <Link className="mb-6 ml-10 text-xl text-white hover:text-violet-800 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-violet-800 font-bold">
                        Item                        
                    </Link>
                    <Link className="mb-6 ml-10 text-xl text-white hover:text-violet-800 font-bold">
                        Item                        
                    </Link> */}
                </div>
                

        </div>

    </div>
    
  )
}

export default Sidebar

