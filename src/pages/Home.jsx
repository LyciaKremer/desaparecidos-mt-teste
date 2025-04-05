import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Card from '../components/Card';
import './Style.css';
import Pagination from '../components/Pagination';
import ScrollToTop from '../components/ScrollToTop';

const API_STATS_URL = 'https://abitus-api.geia.vip/v1/pessoas/aberto/estatistico';
const API_SEARCH_URL = 'https://abitus-api.geia.vip/v1/pessoas/aberto/filtro';

function Home() {
	const [stats, setStats] = useState({ desaparecidos: 0, encontrados: 0 });
	const [loadingStats, setLoadingStats] = useState(true);
	const [resultados, setResultados] = useState([]);
	const [erro, setErro] = useState(null);

	const [paginaAtual, setPaginaAtual] = useState(0);
	const [totalPaginas, setTotalPaginas] = useState(0);

	const [filtros, setFiltros] = useState({
		nome: '',
		idadeMin: '',
		idadeMax: '',
		sexo: '',
		status: '',
	});

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await axios.get(API_STATS_URL);
				setStats({
					desaparecidos: data.quantPessoasDesaparecidas,
					encontrados: data.quantPessoasEncontradas,
				});
			} catch (error) {
				console.error('Erro ao buscar estatísticas:', error);
			} finally {
				setLoadingStats(false);
			}
		};

		fetchStats();
	}, []);

	const buscar = async (pagina = 0, filtrosAtuais) => {
		try {
			setErro(null);

			const { nome, idadeMin, idadeMax, sexo, status } = filtrosAtuais;

			const params = {
				...(nome && { nome }),
				...(idadeMin && { faixaIdadeInicial: parseInt(idadeMin, 10) }),
				...(idadeMax && { faixaIdadeFinal: parseInt(idadeMax, 10) }),
				...(sexo && { sexo: sexo.toUpperCase() }),
				...(status && { status: status.toUpperCase() }),
				pagina,
				porPagina: 12,
			};

			const { data } = await axios.get(API_SEARCH_URL, { params });
			setResultados(data.content || []);
			setTotalPaginas(data.totalPages || 0);
			setPaginaAtual(pagina);
		} catch (error) {
			console.error('Erro ao buscar pessoas:', error);
			setErro('Erro ao buscar resultados. Tente novamente mais tarde.');
			setResultados([]);
		}
	};

	useEffect(() => {
		buscar(0, filtros);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFiltroChange = (e) => {
		const { name, value } = e.target;
		setFiltros((prev) => ({ ...prev, [name]: value }));
	};

	const limparFiltros = () => {
		const filtrosZerados = { nome: '', idadeMin: '', idadeMax: '', sexo: '', status: '' };
		setFiltros(filtrosZerados);
		setPaginaAtual(0);
		buscar(0, filtrosZerados);
	};

	const handlePaginaClick = (pagina) => {
		if (pagina >= 0 && pagina < totalPaginas) {
			buscar(pagina);
		}
	};

	return (
		<>
			<Header />
			<a
				href="#resultados"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
			>
				Pular para resultados
			</a>
			<main>
				<h1 className="sr-only">Sistema de busca por pessoas desaparecidas</h1>

				<section
					className="flex items-center justify-center gap-12 pt-8 pb-8 bg-[#F6F6F6]"
					aria-labelledby="estatisticas-titulo"
				>
					<h2 id="estatisticas-titulo" className="sr-only">
						Estatísticas
					</h2>
					{loadingStats ? (
						<span role="status" aria-live="polite" className="text-3xl md:text-5xl font-medium">
							Carregando...
						</span>
					) : (
						<>
							<div className="flex flex-col items-center">
								<span className="text-base md:text-xl font-medium">LOCALIZADOS</span>
								<span className="text-5xl md:text-7xl font-semibold">{stats.encontrados}</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="text-base md:text-xl font-medium">DESAPARECIDOS</span>
								<span className="text-5xl md:text-7xl font-semibold">{stats.desaparecidos}</span>
							</div>
						</>
					)}
				</section>
				<section>
					<form
						role="search"
						aria-labelledby="filtro-titulo"
						className="flex flex-col gap-4 px-10 py-10 bg-white border-y-2 border-gray-300"
						onSubmit={(e) => {
							e.preventDefault();
							buscar(0, filtros);
						}}
					>
						<h2 id="filtro-titulo" className="font-medium text-2xl">
							Busca
						</h2>

						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex flex-col gap-2.5 w-full">
								<label htmlFor="nome">Nome</label>
								<input
									id="nome"
									name="nome"
									type="text"
									value={filtros.nome}
									onChange={handleFiltroChange}
								/>
							</div>
							<div className="flex flex-col gap-2.5">
								<label htmlFor="idadeMin">Idade mínima</label>
								<input
									id="idadeMin"
									name="idadeMin"
									type="number"
									value={filtros.idadeMin}
									onChange={handleFiltroChange}
								/>
							</div>
							<div className="flex flex-col gap-2.5">
								<label htmlFor="idadeMax">Idade máxima</label>
								<input
									id="idadeMax"
									name="idadeMax"
									type="number"
									value={filtros.idadeMax}
									onChange={handleFiltroChange}
								/>
							</div>
						</div>

						<div className="flex flex-col md:flex-row justify-between gap-4">
							<div className="flex gap-6">
								<fieldset className="flex flex-col gap-2.5">
									<legend>Sexo</legend>
									{['feminino', 'masculino'].map((sexo) => (
										<label key={sexo} htmlFor={sexo}>
											<input
												type="radio"
												id={sexo}
												name="sexo"
												value={sexo}
												checked={filtros.sexo === sexo}
												onChange={handleFiltroChange}
											/>
											{sexo.charAt(0).toUpperCase() + sexo.slice(1)}
										</label>
									))}
								</fieldset>

								<fieldset className="flex flex-col gap-2.5">
									<legend>Status</legend>
									{['desaparecido', 'localizado'].map((status) => (
										<label key={status} htmlFor={status}>
											<input
												type="radio"
												id={status}
												name="status"
												value={status}
												checked={filtros.status === status}
												onChange={handleFiltroChange}
											/>
											{status.charAt(0).toUpperCase() + status.slice(1)}
										</label>
									))}
								</fieldset>
							</div>

							<div className="flex md:self-end gap-4 mt-5 md:mt-0">
								<button
									type="button"
									onClick={limparFiltros}
									className="w-full text-white bg-red-600 py-2 px-7"
									aria-label="Limpar filtros de busca"
								>
									Limpar
								</button>
								<button
									type="submit"
									className="w-full text-white bg-[#1C92F3] py-2 px-7"
									aria-label="Buscar pessoas com os filtros atuais"
								>
									Buscar
								</button>
							</div>
						</div>
					</form>
				</section>

				<section
					id="resultados"
					className="grid md:grid-cols-2 items-center justify-center gap-4 px-10 pt-10 pb-24 bg-[#F6F6F6]"
				>
					{erro ? (
						<p className="text-center text-red-600 col-span-2" role="alert">
							{erro}
						</p>
					) : resultados.length > 0 ? (
						resultados.map((item) => <Card key={item.id} data={item} />)
					) : (
						<p className="text-center text-gray-600 col-span-2">Nenhum resultado encontrado.</p>
					)}
				</section>

				<section className="px-10 py-10 bg-[#F6F6F6]">
					{resultados.length > 0 && totalPaginas > 1 && (
						<Pagination
							currentPage={paginaAtual}
							totalPages={totalPaginas}
							onPageChange={handlePaginaClick}
						/>
					)}
				</section>

				<ScrollToTop />
			</main>
		</>
	);
}

export default Home;
