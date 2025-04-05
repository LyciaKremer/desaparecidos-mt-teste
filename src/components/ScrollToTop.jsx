import { useEffect, useState } from 'react';

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		isVisible && (
			<button
				onClick={scrollToTop}
				className="fixed bottom-6 right-6 p-3 rounded-full bg-[#1E1E1E] text-white shadow-lg z-50 transition-opacity duration-300 sm:hidden"
				aria-label="Voltar ao topo"
			>
				↑
			</button>
		)
	);
};

export default ScrollToTop;
