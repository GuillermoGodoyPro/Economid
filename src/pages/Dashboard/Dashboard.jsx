import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Modal from '../../components/Modal';
import { ObtenerTodasUsuario } from '../../services/transacciones';
import { GetBalanceByPEId } from '../../services/balance';
import jwt_decode from 'jwt-decode';
import { GraficoTransacciones } from '../../components/GraficoTransacciones';
// import { generarId } from '../../Helpers/helper';


const Dashboard = () => {
  const { auth } = useAuth();
  const [balance, setBalance] = useState(null);
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  // Inicio de Transacciones y PE -- conexión con Modal

  const handlePerfilEcon = () => {
    setModal(true);

    setTimeout(() => {

      setAnimarModal(true)
    }, 400);
  }

  // Fin de Transacciones y PE -- conexión con Modal fin




  //---------- Inicio de Conexiones JWT y Auth ----------

  const usuario = jwt_decode(auth);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`
    }
  }


  if (usuario.p_e_id) {
    useEffect(() => {
      const fetchBalance = async () => {
        try {
          const res = await GetBalanceByPEId(usuario.p_e_id, config);
          setBalance(res);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
      const fetchTransacciones = async () => {
        try {
          const { data: response } = await ObtenerTodasUsuario(config);
          setTransacciones(response);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
      fetchBalance();
      fetchTransacciones();
    }, []);
  }
  //---------- Fin de Conexiones JWT y Auth ----------

  return (
    <div>
      <h1
        className='text-violet-800 font-bold uppercase mx-5 mt-6'
      >
        Bienvenido: {usuario.nombre}
      </h1>
      {/* Cabecera */}
      <div className=" bg-inherit rounded p-2 m-4 mb-0 flex justify-between">
        {/* TODO: Cambiar por ternario, copiar y pegar todo pero solo modificar el boton perfil económico por nueva transacción */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-sm w-full mr-1">
          {balance ?
            <div className='flex justify-around'>
              <h2 className='p-1 mb-4 text-violet-600'>
                <span className='font-bold'>
                  Saldo Inicial: <br />
                  ${parseFloat(balance.data.saldo_Inicial).toFixed(2)}
                </span>
              </h2>
              <h2 className='p-1 mb-4 text-violet-600'>
                <span className='font-bold'>
                  Saldo Total: <br />
                  ${parseFloat(balance.data.saldo_Total).toFixed(2)}
                </span>
              </h2>
            </div> :
            <div className='flex justify-center'>
              <h3>Informacion de Saldos no disponible, empiece a crear transacciones...</h3>
            </div>}

          {
            !usuario.p_e_id ?
              <div className='p-2 pt-8 flex justify-around bottom-1'>

                <button
                  type="button"
                  className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
                  onClick={handlePerfilEcon}
                >
                  Perfil Económico
                </button>

              </div>

              :
              <div className='p-2 pt-8 flex justify-around bottom-1' >
                <button
                  type="button"
                  className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold p-absolute'
                  onClick={handlePerfilEcon}
                >
                  Agregar Transacción
                </button>

                {modal &&
                  <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                  />
                }


              </div>

          }

        </div>
        <div className="bg-gray-200  p-4 rounded-lg shadow-sm w-full ml-1 w-min-6 flex">
          <h2 className='p-1 text-violet-600 justify-around mb-4 font-bold'>
            Transacciones:
          </h2>

          {usuario.p_e_id ?
            <div className='min-h-[5rem]'>
              <GraficoTransacciones transacs={transacciones}/>
            </div> :
            <div></div>}

        </div>
      </div>

      {/* fin Cabecera */}

      {/* Lista de gastos */}

      <div className="bg-inherit p-10">
        <div className="bg-inherit p-4 rounded-lg shadow-md border">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 font-semibold text-violet-600">Detalle</th>
                <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                <th className="text-left py-2 px-4 font-semibold text-violet-600">Fecha</th>
                <th className="text-left py-2 px-4 font-semibold text-violet-600">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((transaccion, index) => {
                return (
                  <tr className="border-b border-gray-200" key={index}>
                    <td className="py-2 px-4">{transaccion.detalle}</td>
                    <td className="py-2 px-4">${transaccion.monto}</td>
                    <td className="py-2 px-4">{new Date(transaccion.fecha).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{transaccion.tipoTransaccion}</td>
                  </tr>
                )
              })}
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
              Ingresos:
            </h2>


            <div className="bg-inherit rounded-lg  border">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                    <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                  </tr>
                </thead>
                {usuario.p_e_id ?
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4">Dolares</td>
                      <td className="py-2 px-4">$200000</td>

                    </tr>
                  </tbody> :
                  <tbody></tbody>
                }
              </table>
            </div>
          </div>
        </div>
        <div className="bg-gray-200  p-4 rounded-lg shadow-sm w-full mx-1 w-min-6 ">
          <div>
            <h2 className='p-1 justify-around text-violet-600'>
              Egresos:
            </h2>
            <div className="bg-inherit rounded-lg  border">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 font-semibold text-violet-600">Transacción</th>
                    <th className="text-left py-2 px-4 font-semibold text-violet-600">Monto</th>
                  </tr>
                </thead>
                {usuario.p_e_id ?
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4">Supermercado</td>
                      <td className="py-2 px-4">$50000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4">ISTEA</td>
                      <td className="py-2 px-4">$65000</td>
                    </tr>
                  </tbody> :
                  <tbody></tbody>
                }
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
          {balance
            ?
            <div className='flex justify-center'>
              <h1 className='p-1 justify-around text-violet-800 font-bold uppercase'>
                ${parseFloat(balance.data.saldo_Total).toFixed(2)}
              </h1>
            </div>
            :
            <div></div>
          }
        </div>
      </div>

      {/* Fin de balance */}

    </div>
  )
}

export default Dashboard

