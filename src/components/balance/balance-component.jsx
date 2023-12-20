import { PulseLoader } from "react-spinners";
import { texts } from "../../constants/myfinances-constants";
import useDark from "../../context/useDark";

export const BalanceComponent = ({cargando, balance}) => {
    const { dark } = useDark();

    return (
        <div className={(dark ? 
            "bg-gray-200 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-96"
            : "bg-violet-300 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-96"
            )}
        >
            {
                cargando ?
                    <div className="flex justify-center">
                        <PulseLoader loading={cargando} color="rgb(113, 50, 255)" size={10} />
                    </div>
                    :
                    balance ?
                        <div className='flex flex-col p-5 justify-center text-center'>
                            <div>
                                <h3 className='text-xl font-semibold text-violet-600 antialiased'>
                                    Balance
                                </h3>
                                {
                                    balance.data ?
                                        balance.data.saldo_Total < 0 ?
                                            <h1 className='text-red-500 font-bold text-5xl font-mono'>
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                            </h1> :
                                            <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                            </h1> :
                                        balance.saldo_Total < 0 ?
                                            <h1 className='text-red-600 font-bold text-5xl font-mono'>
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.saldo_Total).toFixed(2)}
                                            </h1> :
                                            <h1 className='text-gray-600 font-bold text-5xl font-mono'>
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.saldo_Total).toFixed(2)}
                                            </h1>
                                }
                            </div>
                        </div> :
                        <div className='pt-14 flex flex-col p-5 items-center text-center' >
                            <h3 className="mb-10 text-lg">
                                {texts.WITH_NO_TRANSACTIONS}
                            </h3>
                        </div>
            }
        </div>
    );
};