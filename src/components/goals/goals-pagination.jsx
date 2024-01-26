import { useState } from "react";
import { getAll, getByState } from "../../services/myfinances-api/metaFinanciera";
import { getUserToken } from "../../services/token/tokenService";
import useAuth from "../../context/useAuth";
import { HttpStatusCode } from "axios";

export const GoalsPagination = ({
    setActiveGoals,
    setCompletedGoals,
    setTableGoals,
    metadata,
    isCompleted,
    setLoading,
    setActiveGoalsMetadata,
    setCompletedGoalsMetadata,
    setTableGoalsMetadata,
    comesFromTable = false
}) => {
    const { auth } = useAuth();
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const generatePageNumbers = (pageNumber) => {
        let navigationNumbers = [];
        for (let i = 1; i <= pageNumber; i++)
            navigationNumbers.push(i);
        return navigationNumbers;
    };
    const pageSize = !comesFromTable ? 4 : 10;
    const pageNumber = Math.ceil(metadata.totalCount / pageSize);
    const navigationNumbers = generatePageNumbers(pageNumber);
    let hasNextPage = metadata?.hasNextPage ?? true;

    const changePage = (page) => {
        setCurrentPage(page);
        handleChangePage(page);
    };

    const nextPage = (page) => {
        if (hasNextPage) {
            setCurrentPage(page + 1);
            handleChangePage(page + 1);
        }
    };
    const prevPage = (page) => {
        if (currentPage !== 1) {
            setCurrentPage(page - 1);
            handleChangePage(page - 1);
        }
    };
    const handleChangePage = async (page) => {
        setLoading(true);
        const user = getUserToken();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };
        const fetchGoals = async () => {
            try {
                if (!comesFromTable) {
                    const payload = {
                        userId: user.id,
                        completada: isCompleted
                    };
                    const { data, status } = await getByState(payload, page, pageSize, config);
                    if (status === HttpStatusCode.Ok) {
                        if (!payload.completada) {
                            setLoading(false);
                            setActiveGoals(data.data);
                            if (!!setActiveGoalsMetadata) setActiveGoalsMetadata(data.meta);
                        } else {
                            setLoading(false);
                            setCompletedGoals(data.data);
                            if (!!setCompletedGoalsMetadata) setCompletedGoalsMetadata(data.meta);
                        }
                        if (!data.meta.hasNextPage) {
                            hasNextPage = false;
                        }
                        else {
                            hasNextPage = true;
                        }
                    }
                } else {
                    const payload = { userId: user.id };
                    const { data, status } = await getAll(payload, page, pageSize, config);
                    if (status === HttpStatusCode.Ok) {
                        setLoading(false);
                        setTableGoals(data.data);
                        if (!!setTableGoalsMetadata) setTableGoalsMetadata(data.meta);
                        if (!data.meta.hasNextPage) {
                            hasNextPage = false;
                        }
                        else {
                            hasNextPage = true;
                        }
                    }
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchGoals();
    };
    return (
        <div className="flex items-center justify-between bg-inherit px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <div>
                    <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            disabled={currentPage === 1}
                            style={currentPage === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => prevPage(currentPage)}
                        >
                            <i className="fa-solid fa-arrow-left text-sm"
                                style={currentPage === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" }}></i>
                        </button>
                        {
                            navigationNumbers?.map((page, i) => (
                                <button
                                    key={i}
                                    disabled={currentPage === page}
                                    style={currentPage === page ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                                    className={`${currentPage === page ? "active" : ""}ring-1 ring-inset ring-gray-300 px-2 py-2 text-gray-400 hover:bg-violet-200`}
                                    onClick={() => changePage(page)}>
                                    <p className="font-mono font-bold">{page}</p>
                                </button>
                            ))
                        }
                        <button
                            disabled={!hasNextPage || (currentPage === 1 && !hasNextPage)}
                            style={!hasNextPage || (currentPage === 1 && !hasNextPage) ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                            className="inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => nextPage(currentPage)}
                        >
                            <i className="fa-solid fa-arrow-right text-sm"
                                style={!hasNextPage || (currentPage === 1 && !hasNextPage) ? { cursor: "not-allowed" } : { cursor: "pointer" }}></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};