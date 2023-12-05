export const TransactionsPagination = ({  nPage, numbers, currentPage, setCurrentPage }) => {
    const nextPage = (page) => {
        if (currentPage !== nPage) {
            setCurrentPage(page + 1);
            // handlePageChange(currentPage + 1);
        }
    };
    const prevPage = (page) => {
        if (currentPage !== 1) {
            setCurrentPage(page - 1);
        }
    };
    const changePage = (page) => {
        setCurrentPage(page);
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
                            <i class="fa-solid fa-arrow-left text-sm"
                                style={currentPage === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" }}></i>
                        </button>
                        {
                            numbers.map((n, i) => (
                                <button
                                    key={i}
                                    className={`${currentPage === n ? "active" : "" }ring-1 ring-inset ring-gray-300 px-2 py-2 text-gray-400 hover:bg-violet-200`}
                                    onClick={() => changePage(n)}>
                                    <p className="font-mono font-bold">{n}</p>
                                </button>
                            ))
                        }
                        <button
                            className="inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => nextPage(currentPage)}
                        >
                            <i class="fa-solid fa-arrow-right text-sm"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}