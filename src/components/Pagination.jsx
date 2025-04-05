const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const getVisiblePages = () => {
		const pages = [];
		const lastPage = totalPages - 1;

		if (totalPages <= 7) {
			for (let i = 0; i < totalPages; i++) {
				pages.push(i);
			}
			return pages;
		}

		pages.push(0);

		if (currentPage > 3) {
			pages.push('start-ellipsis');
		}

		const startPage = Math.max(1, currentPage - 1);
		const endPage = Math.min(lastPage - 1, currentPage + 1);
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (currentPage < lastPage - 2) {
			pages.push('end-ellipsis');
		}

		pages.push(lastPage);

		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 0}
				className="py-2 px-3 sm:px-7 text-sm sm:text-base rounded border-2 border-[#D9D9D9] hover:bg-gray-100 disabled:opacity-50"
			>
				<span className="block sm:hidden">←</span>
				<span className="hidden sm:block">« Anterior</span>
			</button>

			{getVisiblePages().map((page, index) => {
				if (page === 'start-ellipsis' || page === 'end-ellipsis') {
					return (
						<span key={`ellipsis-${index}`} className="px-2 py-3 text-gray-500">
							...
						</span>
					);
				}

				return (
					<button
						key={`page-${page}-${index}`}
						onClick={() => onPageChange(page)}
						className={`min-w-[36px] sm:min-w-[43px] text-sm sm:text-base py-2 px-2 sm:px-3 rounded border-2 ${
							page === currentPage
								? 'bg-[#1E1E1E] text-white border-[#1E1E1E] font-semibold'
								: 'border-gray-300 hover:bg-gray-100'
						}`}
					>
						{page + 1}
					</button>
				);
			})}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages - 1}
				className="py-2 px-3 sm:px-7 text-sm sm:text-base rounded border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
			>
				<span className="block sm:hidden">→</span>
				<span className="hidden sm:block">Próxima »</span>
			</button>
		</div>
	);
};

export default Pagination;
