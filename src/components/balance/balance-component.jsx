import { PulseLoader } from "react-spinners";
import { texts } from "../../constants/myfinances-constants";
import useDark from "../../context/useDark";

export const BalanceComponent = ({ cargando, balance }) => {
    const { dark } = useDark();

    return (
        <div className={(dark === "light" ?
            "bg-gray-200 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-96"
            : "bg-gray-600 pt-4 rounded-lg shadow-md hover:shadow-violet-400 w-96"
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
                                <h3 className={(dark === "light" ?
                                    "text-xl font-semibold text-violet-600 antialiased"
                                    : "text-xl font-semibold text-violet-400 antialiased"
                                )}>
                                    Balance
                                </h3>
                                {
                                    balance.data ?
                                        balance.data.saldo_Total < 0 ?
                                            <h1 className='text-red-500 font-bold text-5xl font-mono'>
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                            </h1> :
                                            <h1 className={(dark === "light" ?
                                                "text-gray-600 font-bold text-5xl font-mono"
                                                : "text-gray-100 font-bold text-5xl font-mono"
                                            )}
                                            >
                                                <span className="mr-1">$</span>
                                                {parseFloat(balance.data.saldo_Total).toFixed(2)}
                                            </h1> :
                                        balance.saldo_Total < 0 ?
                                            <h1 className={(dark === "light" ?
                                                "text-red-600 font-bold text-5xl font-mono"
                                                : "text-red-600 font-bold text-5xl font-mono"
                                            )}
                                            >
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
                            <h3 className={(dark === "light" ?
                                "text-lg text-center text-black" :
                                "text-lg text-center text-white")}>
                                {texts.WITH_NO_TRANSACTIONS}
                            </h3>
                        </div>
            }
        </div>
    );
};