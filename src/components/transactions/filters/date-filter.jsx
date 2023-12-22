import useAuth from "../../../context/useAuth";
import { getUserToken } from "../../../services/token/tokenService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { filterTransactions } from "../../../services/myfinances-api/transacciones";
import useDark from "../../../context/useDark";

export const DateFilter = ({
    setTransacciones,
    setAlerta,
    setLoading,
    setMetadata,
    fecha,
    setFecha,
    setCurrentPage,
    setPayloadProps,
    payloadProps
}) => {
    const { auth } = useAuth();
    const { dark } = useDark();

    const user = getUserToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };
    const handleDateChange = async (date) => {
        setLoading(true);
        setPayloadProps({
            ...payloadProps,
            userId: user.id,
            fecha: date
        });
        const payload = {
            ...payloadProps,
            userId: user.id,
            fecha: date
        };
        try {
            const { data: response, status } = await filterTransactions(payload, 1, 10, config);
            if (status === 200) {
                setLoading(false);
                setCurrentPage(1);
                setTransacciones(response.data);
                setMetadata(response.meta);
                setFecha(payload.fecha);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setFecha("");
            setTransacciones([]);
            setPayloadProps({
                ...payloadProps,
                userId: user.id,
                fecha: null
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
        <div className="flex flex-col mx-2 font-mono font-sm text-left p-2">
            <label className={(dark === "light" ?
                "font-semibold text-violet-600"
                : "font-semibold text-violet-400"
            )}
            >Fecha</label>
            <ReactDatePicker
                showIcon
                locale={es}
                className={(dark === "light" ?
                    "bg-[#E5E7EB] rounded-md p-1 font-mono text-black"
                    : "bg-gray-600 rounded-md p-1 font-mono text-white"
                )}
                value={fecha}
                placeholderText="Filtrar por fecha"
                onChange={(date) => handleDateChange(date.toISOString().split("T")[0])}
            />
        </div>
    );
};