import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Detalhes = () => {
	const { id } = useParams();
	const [pessoa, setPessoa] = useState(null);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const alertRef = useRef(null);

	useEffect(() => {
		const fetchPessoa = async () => {
			try {
				const response = await axios.get(`https://abitus-api.geia.vip/v1/pessoas/${id}`);
				setPessoa(response.data);
			} catch (error) {
				console.error('Erro ao carregar os dados da pessoa:', error);
				setErro(true);
			} finally {
				setLoading(false);
			}
		};

		fetchPessoa();
	}, [id]);

	const formatarData = (dataISO) => {
		if (!dataISO) return 'Não informada';
		const data = new Date(dataISO);
		return data.toLocaleDateString('pt-BR');
	};

	const calcularDiasDesaparecido = (dataDesaparecimento) => {
		if (!dataDesaparecimento) return null;
		const desaparecimento = new Date(dataDesaparecimento);
		const hoje = new Date();
		const diff = Math.floor((hoje - desaparecimento) / (1000 * 60 * 60 * 24));
		return diff;
	};

	const enviarInformacao = async (formData) => {
		try {
			const { info, data, file } = formData;

			const payload = new FormData();
			payload.append('files', file);

			await axios.post(
				`https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido`,
				payload,
				{
					params: {
						informacao: info,
						descricao: `Foto de ${pessoa.nome}`,
						data: data,
						ocoId: pessoa.ultimaOcorrencia?.ocoId,
					},
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			alert('Informações enviadas com sucesso!');
		} catch (error) {
			console.error('Erro ao enviar informações:', error);
			alert('Erro ao enviar informações. Tente novamente.');
		}
	};

	return (
		<>
			<Header />
			<main
				className="flex flex-col mx-4 px-5 py-12 items-center md:bg-[#F6F6F6] min-h-screen"
				role="main"
				aria-labelledby="titulo-detalhes"
			>
				<div className="flex flex-col w-full max-w-4xl">
					<button
						onClick={() => navigate(-1)}
						className="self-start bg-black text-white font-bold py-2 px-5 rounded hover:underline"
						aria-label="Voltar para a página anterior"
					>
						← Voltar
					</button>

					<div className="w-fit h-fit mt-5 px-12 py-12 bg-white rounded-xl border-2 border-[#D9D9D9]">
						{loading ? (
							<p className="text-xl" aria-live="polite">
								Carregando detalhes...
							</p>
						) : erro ? (
							<p ref={alertRef} className="text-red-500 text-xl" role="alert">
								Pessoa não encontrada.
							</p>
						) : pessoa ? (
							<article className="max-w-4xl mx-auto">
								<header className="flex flex-col md:flex-row gap-9">
									<div>
										<img
											className="w-full md:w-64 object-cover rounded-lg border-2 border-black"
											src={pessoa.urlFoto || '/sem-foto.png'}
											alt={`Foto de ${pessoa.nome || 'Pessoa desaparecida'}`}
										/>

										{!pessoa.ultimaOcorrencia?.dataLocalizacao && (
											<div
												className="flex justify-center items-center text-white font-bold md:w-64 px-6 py-6 mt-2.5 rounded-lg border-2 border-black bg-[#DE2020]"
												role="status"
												aria-label={`Pessoa desaparecida há ${calcularDiasDesaparecido(pessoa.ultimaOcorrencia?.dtDesaparecimento)} dias`}
											>
												Desaparecido há{' '}
												{calcularDiasDesaparecido(pessoa.ultimaOcorrencia?.dtDesaparecimento)} dias
											</div>
										)}
									</div>

									<div className="flex flex-col gap-6 text-lg">
										<span
											className={`py-2.5 px-10 rounded-lg w-fit text-white font-bold ${pessoa.ultimaOcorrencia?.dataLocalizacao ? 'bg-green-600' : 'bg-[#DE2020]'}`}
											role="status"
										>
											{pessoa.ultimaOcorrencia?.dataLocalizacao
												? pessoa.vivo
													? 'Localizado com vida'
													: 'Localizado'
												: 'Desaparecido'}
										</span>

										<div className="flex flex-col gap-1">
											<h1 id="titulo-detalhes" className="font-semibold text-3xl">
												{pessoa.nome}
											</h1>
											<p className="text-[16px]">
												{pessoa.idade} anos - {pessoa.sexo}
											</p>
										</div>

										<section
											aria-labelledby="info-desaparecimento"
											className="flex flex-col gap-2 mx-0!"
										>
											<p className="font-medium text-[20px]" id="info-desaparecimento">
												{pessoa.ultimaOcorrencia?.dataLocalizacao
													? 'Informações sobre a localização'
													: 'Informações sobre o desaparecimento'}
											</p>

											{!pessoa.ultimaOcorrencia?.dataLocalizacao ? (
												<>
													<p>
														<strong>Data do desaparecimento:</strong>{' '}
														{formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}
													</p>
													<p>
														<strong>Local do desaparecimento:</strong>{' '}
														{pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || 'Não informado'}
													</p>
													<p>
														<strong>Vestimentas:</strong>{' '}
														{pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
															?.vestimentasDesaparecido || 'Não informadas'}
													</p>
													{pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
														<p>
															<strong>Informações adicionais:</strong>{' '}
															{pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
														</p>
													)}
												</>
											) : (
												<>
													<p>
														<strong>Data da localização:</strong>{' '}
														{formatarData(pessoa.ultimaOcorrencia?.dataLocalizacao)}
													</p>
													<p>
														<strong>Encontrado vivo:</strong>{' '}
														{pessoa.ultimaOcorrencia?.encontradoVivo ? 'Sim' : 'Não'}
													</p>
												</>
											)}
										</section>

										{!pessoa.ultimaOcorrencia?.dataLocalizacao && (
											<button
												className="flex justify-center items-center gap-2 w-fit py-3.5 px-7 text-white font-semibold bg-[#21242D] border-2 border-[#DE2020]"
												onClick={() => setShowModal(true)}
												aria-label={`Informar se viu ${pessoa.nome}`}
											>
												<img src="/alerta.svg" alt="" aria-hidden="true" />
												Viu essa pessoa?
											</button>
										)}
									</div>
								</header>
							</article>
						) : null}
					</div>
				</div>
			</main>

			{showModal && (
				<Modal onClose={() => setShowModal(false)} onSubmit={(data) => enviarInformacao(data)} />
			)}
		</>
	);
};

export default Detalhes;
