import useAuth from "../../../context/useAuth";
import useDark from "../../../context/useDark";
import { filterTransactions } from "../../../services/myfinances-api/transacciones";
import { getUserToken } from "../../../services/token/tokenService";

export const StateFilter = ({
    setLoading,
    setAlerta,
    setCurrentPage,
    setTransacciones,
    setMetadata,
    setPayloadProps,
    setState,
    state,
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
    const handleStateChange = async (state) => {
        setLoading(true);
        setPayloadProps({
            ...payloadProps,
            userId: user.id,
            estaActiva: state
        });
        const payload = {
            ...payloadProps,
            userId: user.id,
            estaActiva: state
        };
        try {
            const { data: response, status } = await filterTransactions(payload, 1, 10, config);
            if (status === 200) {
                setLoading(false);
                setCurrentPage(1);
                setTransacciones(response.data);
                setMetadata(response.meta);
                setState(state);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setState("");
            setTransacciones([]);
            setPayloadProps({
                ...payloadProps,
                userId: user.id,
                estaActiva: null
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
                >Estado</label>
                <select
                    name="estado"
                    id="estado"
                    className={(dark === "light" ?
                        "bg-[#E5E7EB] rounded-md p-1 font-mono text-black"
                        : "bg-gray-600 text-gray-400 font-semibold rounded-md p-1 font-mono text-white"
                    )}
                    defaultValue={"Filtrar por estado"}
                    onChange={e => handleStateChange(e.target.value)}
                >
                    <option defaultValue={""} value="">Ninguno</option>
                    <option value={true}>Activa</option>
                    <option value={false}>Anulada</option>
                </select>
            </div>
        </div>
    );
};