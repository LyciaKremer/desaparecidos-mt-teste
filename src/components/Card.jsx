import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
	const navigate = useNavigate();

	const { id, nome, sexo, idade, urlFoto, ultimaOcorrencia } = data;
	const imgSrc = urlFoto && urlFoto !== 'null' ? urlFoto : '/sem-foto.png';

	const dataDesaparecimento = ultimaOcorrencia?.dtDesaparecimento
		? new Date(ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')
		: 'Não informado';

	const localDesaparecimento = ultimaOcorrencia?.localDesaparecimentoConcat || 'Não informado';

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navigate(`/Detalhes/${id}`);
		}
	};

	return (
		<article
			role="button"
			tabIndex={0}
			onClick={() => navigate(`/Detalhes/${id}`)}
			onKeyDown={handleKeyDown}
			aria-label={`Ver detalhes de ${nome}, ${idade} anos, ${sexo}. Desaparecido em ${localDesaparecimento} no dia ${dataDesaparecimento}.`}
			className="flex flex-col md:flex-row h-fit rounded-lg border-2 border-[#D9D9D9] cursor-pointer hover:shadow-md transition bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<img
				className="max-h-56 md:w-[165px] md:h-[165px] object-cover rounded-lg"
				src={imgSrc}
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = '/sem-foto.png';
				}}
				alt={`Foto de ${nome}`}
			/>
			<div className="flex flex-col px-3.5 py-6 text-left">
				<span className="font-semibold">{nome}</span>
				<span className="text-[#787878]">
					{idade} anos, {sexo}
				</span>
				<div>
					Data: <span className="font-medium">{dataDesaparecimento}</span>
				</div>
				<div>
					Local: <span className="font-medium">{localDesaparecimento}</span>
				</div>
			</div>
		</article>
	);
};

export default Card;
