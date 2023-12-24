import { useState } from "react";
import { getUserToken } from "../../services/token/tokenService";
import { filterByType } from "../../services/myfinances-api/transacciones";

export const BalancePagination = ({ setTransactions, auth, navigationNumbers, type, hasNextPage, setHasNextPage, setLoading }) => {
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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
        const fetchTransactions = async () => {
            const payload = {
                userId: user.id,
                tipo: type
            };
            try {
                const { data: response } = await filterByType(payload, page, 5, config);
                setLoading(false);
                setTransactions(response.data);
                if (!response.meta.hasNextPage) {
                    setHasNextPage(false);
                }
                else {
                    setHasNextPage(true);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTransactions();
    };
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-inherit px-4 py-3 sm:px-6">
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