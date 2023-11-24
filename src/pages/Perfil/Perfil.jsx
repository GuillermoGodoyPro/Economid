import { useState } from "react";
import ModalPerfilEconomico from "../../components/ModalPerfilEconomico";

const Perfil = () => {

    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);


    const handlePerfilEcon = () => {
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };

    return (
        <>

            <div className='p-2 pt-8 flex justify-around bottom-1 '>

                <button
                    type="button"
                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold'
                    onClick={handlePerfilEcon}
                >
                    Editar Perfil Económico
                </button>

                {modal &&
                    <ModalPerfilEconomico
                        setModal={setModal}
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                    />
                }

            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md m-20 ">
                <h1 className='p-1 text-violet-600 mb-2 font-bold'>Metas financieras</h1>
                <div className="flex justify-between">
                    <div className="">
                        <span className='font-bold text-violet-600'>
                            Saldo inicial: 21651
                        </span>
                    </div>
                    <div className="">

                        <span className='font-bold text-violet-600'>
                            Saldo Actual: 2300500
                        </span>
                    </div>


                </div>

            </div>
            <div className=" bg-gray-200 p-4 rounded-lg shadow-md m-20 ">
                <h1 className='p-1 text-violet-600 mb-2 font-bold'>Gráficos, cripto, etc</h1>
                <div className="flex justify-between">
                    <div className="">
                        <span className='font-bold text-violet-600'>
                            Saldo inicial: 21651
                        </span>

                        <span className='font-bold text-violet-600'>
                            Saldo Actual: 2300500
                        </span>
                    </div>
                    <div className="">

                        <span className='font-bold text-violet-600'>
                            Saldo inicial: 21651
                        </span>

                        <span className='font-bold text-violet-600'>
                            Saldo Actual: 2300500
                        </span>
                    </div>


                </div>

            </div>

        </>
    );
};

export default Perfil;