import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import jwt_decode from "jwt-decode";
import { GetBalanceByPEId } from '../../services/balance';
import graficoPrueba from '../../assets/graficoPrueba.png'


const Dashboard = () => {

  const { auth } = useAuth()
  const [data, setData] = useState(null);
  const [cargando, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const usuario = jwt_decode(auth);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`
    }
  }
  console.log(usuario)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetBalanceByPEId(usuario.P_E_Id, config);
        setData(res);
        setLoading(false);
        console.log(res);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    cargando
      ?
      /* TODO: PONER SPINNER ACA */
      <h3>Loading...</h3>
      :
      
      <div>
        <h1
          className='text-violet-800 font-bold uppercase mx-5 mt-6'
        >
            Bienvenido: {usuario.Nombre}
        </h1>
        {/* Cabecera */}
        <div className=" bg-inherit rounded p-4 m-4 mb-0 flex justify-between">
          {/* TODO: Cambiar por ternario, copiar y pegar todo pero solo modificar el boton perfil económico por nueva transacción */}
          <div className="bg-gray-200 p-4 rounded-lg shadow-sm w-full mr-1 ">
              <div>
                <h2 className='p-1 justify-around mb-4 text-violet-600'>
                  Saldos:
                </h2>
                <h2 className='p-1 justify-around mb-6 text-violet-600'>
                  Total:               
                </h2>

              </div>
              
              <div className='p-2 flex justify-around bottom-1'>

                <button
                  type="button"
                  className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold '
                >
                  Perfil Económico
                </button>
              
              </div>

          </div>
          <div className="bg-gray-200  p-4 rounded-lg shadow-sm w-full ml-1 w-min-6 ">
              <div>
                  <h2 className='p-1 text-violet-600 justify-around mb-4'>
                    Statics:
                  </h2>

                  <div>
                    <img
                      src={graficoPrueba}
                      className=' w-90 h-[11rem] rounded'
                    />
                  </div>


              </div>

          </div>
        </div>

        {/* fin Cabecer */}        

        {/* Lista de gastos */}

        <div className="bg-inherit p-10">
          <div className="bg-inherit p-4 rounded-lg shadow-md border">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                  <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                  <th className="text-left py-2 px-4 font-semibold text-violet-600">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">Panaderia</td>
                  <td className="py-2 px-4">$ 700</td>
                  <td className="py-2 px-4">05/06/2023</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">Alquiler</td>
                  <td className="py-2 px-4">$ 75000</td>
                  <td className="py-2 px-4">10/06/2023</td>
                </tr>
                
              
              </tbody>
            </table>
          </div>
        </div>

        {/* Fin de lista de gastos */}

        {/* Balance */}
        <div className=" bg-inherit rounded p-4 m-1 mx-8 mb-0 flex justify-between">
          {/* TODO: Cambiar por ternario, copiar y pegar todo pero solo modificar el boton perfil económico por nueva transacción */}
          <div className="bg-gray-200 p-4  rounded-lg shadow-sm w-full  mx-1 ">
            <div>
                <h2 className='p-1 justify-around text-violet-600'>
                  Activos:
                </h2> 

                <div className="bg-inherit rounded-lg  border">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4">Salario</td>
                        <td className="py-2 px-4">$ 400000</td>

                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4">Alquiler</td>
                        <td className="py-2 px-4">$ 75000</td>

                      </tr>
                      
                    
                    </tbody>
                  </table>
                </div>             

            </div>    

          </div>
          <div className="bg-gray-200  p-4 rounded-lg shadow-sm w-full mx-1 w-min-6 ">
          <div>
                <h2 className='p-1 justify-around text-violet-600'>
                  Pasivos:
                </h2> 

                <div className="bg-inherit rounded-lg  border">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Transascción</th>
                        <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4">Salario</td>
                        <td className="py-2 px-4">$ 400000</td>                        
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4">Alquiler</td>
                        <td className="py-2 px-4">$ 75000</td>                        
                      </tr>                      
                    
                    </tbody>
                  </table>
                </div>             

            </div>       

          </div>

          
        </div>

        <div className="bg-gray-200 p-4 mx-40 rounded-lg shadow-sm ">
              <div>
                <h2 className='p-1 justify-around mb-4 text-violet-600 text-center'>
                  Patrimonio Neto: 
                </h2>              

                <div className='flex justify-center'>
                  <h2 className='p-1 justify-around text-violet-600'>
                    Cálculo Patrimonio Neto:                
                    
                  </h2>              
                  <h2 className='p-1 justify-around text-violet-800 font-bold uppercase'>
                    Pasivos - Activos                  
                  </h2>              

                </div>

              </div>            
            

          </div>
        
        {/* Fin de balance */}

      </div>
  )
}

export default Dashboard