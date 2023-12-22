import useAuth from "../../../context/useAuth";
import useDark from "../../../context/useDark";
import { filterTransactions } from "../../../services/myfinances-api/transacciones";
import { getUserToken } from "../../../services/token/tokenService";

export const AmountFilter = ({
    setLoading,
    setAlerta,
    setCurrentPage,
    setTransacciones,
    setMetadata,
    setPayloadProps,
    setMonto,
    monto,
    payloadProps
}) => {
    const { auth } = useAuth();
    const user = getUserToken();
    const { dark } = useDark();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };
    const handleAmountChange = async (amount) => {
        setLoading(true);
        setMonto(amount);
        setPayloadProps({
            ...payloadProps,
            userId: user.id,
            montoHasta: amount
        });
        const payload = {
            ...payloadProps,
            userId: user.id,
            montoHasta: amount
        };
        try {
            const { data: response, status } = await filterTransactions(payload, 1, 10, config);
            if (status === 200) {
                setLoading(false);
                setCurrentPage(1);
                setTransacciones(response.data);
                setMetadata(response.meta);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setTransacciones([]);
            setPayloadProps({
                ...payloadProps,
                userId: user.id,
                montoHasta: null
            });
            setAlerta({
                msg: error.response.data,
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }
    };


    return (
        <div className='flex flex-col mx-2'>
            <div className="campo flex flex-col font-mono font-sm text-left p-2">
                <label className={(dark === "light" ?
                    "font-semibold text-violet-600"
                    : "font-semibold text-violet-400"
                )}
                >Monto Hasta</label>
                <input
                    id="monto"
                    type="number"
                    className={(dark === "light" ?
                        "bg-[#E5E7EB] rounded-md p-1 font-mono text-black"
                        : "bg-gray-600 rounded-md p-1 font-mono text-white"
                    )}
                    placeholder="Ingresar monto"
                    value={monto.replace(",", ".")}
                    onChange={e => handleAmountChange(e.target.value.replace(",", ".").trim())}
                />
            </div>
        </div>
    );
};