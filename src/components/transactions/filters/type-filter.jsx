import useAuth from "../../../context/useAuth";
import { filterTransactions } from "../../../services/myfinances-api/transacciones";
import { getUserToken } from "../../../services/token/tokenService";

export const TypeFilter = ({
    setLoading,
    setAlerta,
    setCurrentPage,
    setTransacciones,
    setMetadata,
    setPayloadProps,
    setTipo,
    tipo,
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
    const handleTypeChange = async (type) => {
        setLoading(true);
        setPayloadProps({
            ...payloadProps,
            userId: user.id,
            tipo: type
        });
        const payload = {
            ...payloadProps,
            userId: user.id,
            tipo: type
        };
        try {
            const { data: response, status } = await filterTransactions(payload, 1, 10, config);
            if (status === 200) {
                setLoading(false);
                setCurrentPage(1);
                setTransacciones(response.data);
                setMetadata(response.meta);
                setTipo(type);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setPayloadProps({
                ...payloadProps,
                userId: user.id,
                tipo: null
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
                <label className="font-semibold text-violet-600">Tipo</label>
                <select
                    name="tipo"
                    id="tipo"
                    className="bg-[#E5E7EB] rounded-md p-1 font-mono"
                    value={tipo}
                    onChange={e => handleTypeChange(e.target.value)}
                >
                    <option defaultValue={""} value="">Ninguno</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                </select>
            </div>
        </div>
    );
};