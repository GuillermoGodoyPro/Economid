import { useState } from "react";
import ModalMetas from "../../components/pop-ups/ModalMetas";
import { ActiveGoals } from "../../components/goals/active-goals";
import { CompletedGoals } from "../../components/goals/completed-goals";
import { useEffect } from "react";
import { getAll } from "../../services/myfinances-api/metaFinanciera";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import Alerta from "../../components/Alerta";
import { texts } from "../../constants/myfinances-constants";

const Metas = () => {
    const { auth } = useAuth();
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [activeGoals, setActiveGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [cargando, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alerta, setAlerta] = useState({});
    const [metadata, setMetadata] = useState({});

    const user = getUserToken();
    const handleGoals = () => {
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 400);
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data, status } = await getAll({userId: user.id}, 1, 6, config);
                if (status === 200) {
                    setActiveGoals(data.data);
                    setCompletedGoals(data.data);
                    setMetadata(data.meta);
                    setLoading(false);
                    console.log(data);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
                setAlerta({
                    msg: texts.WITH_NO_GOALS,
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 3000);
            }
        };
        fetchGoals();
    }, []);

    const { msg } = alerta;

    return (
        <div>
            <div className="flex justify-end text-right fixed">
                {msg && <Alerta alerta={alerta} />}
            </div>
            <div className='pt-8 flex justify-center bottom-1 '>
                <button
                    type="button"
                    className='text-white text-sm bg-violet-400 p-3 rounded-md uppercase font-bold shadow-md hover:shadow-violet-500'
                    onClick={handleGoals}
                >
                    Nueva Meta
                </button>

                {modal &&
                    <ModalMetas
                        setModal={setModal}
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                        setActiveGoals={setActiveGoals}
                        activeGoals={activeGoals}
                    />
                }
            </div>
            <ActiveGoals
                goals={activeGoals}
                auth={auth}
                error={error}
                cargando={cargando}
                setActiveGoals={setActiveGoals}
                setCompletedGoals={setCompletedGoals}
            />
            <CompletedGoals
                goals={completedGoals}
                error={error}
                cargando={cargando}
            />
        </div>
    );
};
export default Metas;