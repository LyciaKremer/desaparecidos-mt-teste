const Header = () => {
	return (
		<>
			<div className="flex justify-between h-24 w-full items-center bg-black text-gray-400 gap-12 sticky pt-2 pb-2 px-[5vw] md:static">
				<div className="flex gap-0.5 items-center">
					<img src="/logo.png" alt="Logo Polícia Judiciária Civil do Estado de Mato Grosso" />
					<div className="flex flex-col">
						<span className="hidden md:flex font-bold text-white">Polícia Judiciária Civil</span>
						<span className="hidden md:flex font-bold text-white">Estado de Mato Grosso</span>
					</div>
				</div>
				<div className="flex gap-0.5 items-center">
					<img
						src="/logo-desaparecidos.svg"
						alt="Logo Polícia Judiciária Civil do Estado de Mato Grosso"
					/>
					<span className="hidden md:flex font-medium text-white">Busca por desaparecidos</span>
				</div>
			</div>
		</>
	);
};

export default Header;
