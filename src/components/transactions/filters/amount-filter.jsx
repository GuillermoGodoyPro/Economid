import useAuth from "../../../context/useAuth";
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
            setMonto("");
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
                <label className="font-semibold text-violet-600">Monto Hasta</label>
                <input
                    id="monto"
                    type="text"
                    className="bg-[#E5E7EB] rounded-md p-1 font-mono"
                    placeholder="Ingresar monto"
                    value={monto.replace(",", ".")}
                    onChange={e => handleAmountChange(e.target.value.trim())}
                />
            </div>
        </div>
    );
};