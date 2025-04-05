import { useEffect, useRef, useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
	const [info, setInfo] = useState('');
	const [data, setData] = useState('');
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState('');

	const modalRef = useRef(null);
	const firstFocusableRef = useRef(null);

	useEffect(() => {
		const focusableElements = modalRef.current.querySelectorAll(
			'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
		);
		const firstElem = focusableElements[0];
		const lastElem = focusableElements[focusableElements.length - 1];

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstElem) {
						e.preventDefault();
						lastElem.focus();
					}
				} else {
					if (document.activeElement === lastElem) {
						e.preventDefault();
						firstElem.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		firstElem?.focus();

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	const handleOverlayClick = (e) => {
		if (e.target === modalRef.current) {
			onClose();
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (!selectedFile) return;

		const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
		const maxSize = 3 * 1024 * 1024;

		if (!allowedTypes.includes(selectedFile.type)) {
			setFileError('Formato de arquivo não suportado.');
			setFile(null);
		} else if (selectedFile.size > maxSize) {
			setFileError('Arquivo excede o limite de 3MB.');
			setFile(null);
		} else {
			setFileError('');
			setFile(selectedFile);
		}
	};

	const handleSubmit = () => {
		if (!info || !data || !file) {
			alert('Por favor, preencha todos os campos e envie uma imagem válida.');
			return;
		}

		onSubmit({ info, data, file });
		onClose();
	};

	return (
		<div
			ref={modalRef}
			onClick={handleOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50"
		>
			<div className="bg-white rounded-lg p-8 w-full max-w-md mx-5">
				<h2 id="modal-title" className="text-xl font-semibold mb-6 text-center">
					Formulário de Informativo
				</h2>

				<label htmlFor="info" className="block mb-2 font-medium">
					Informação
				</label>
				<textarea
					id="info"
					ref={firstFocusableRef}
					placeholder="Descreva o que você viu..."
					className="w-full border border-gray-300 p-3 rounded mb-4"
					rows={4}
					value={info}
					onChange={(e) => setInfo(e.target.value)}
				/>

				<label htmlFor="data" className="block mb-2 font-medium">
					Data
				</label>
				<input
					id="data"
					type="date"
					className="w-full border border-gray-300 p-3 rounded mb-4"
					value={data}
					onChange={(e) => setData(e.target.value)}
				/>

				<label htmlFor="file" className="block font-medium">
					Upload de imagem
				</label>
				<input
					id="file"
					type="file"
					accept=".png, .jpg, .jpeg"
					onChange={handleFileChange}
					className="w-full mb-2 mt-2 cursor-pointer"
				/>
				<span className="text-gray-500 text-sm">(PNG, JPG, JPEG – máx. 3MB)</span>
				{fileError && <p className="text-red-500 text-sm mb-2">{fileError}</p>}

				<div className="flex justify-end gap-2 mt-6">
					<button onClick={onClose} className="py-2 px-7 bg-[#DE2020] text-white rounded">
						Cancelar
					</button>
					<button onClick={handleSubmit} className="py-2 px-7 bg-[#1C92F3] text-white rounded">
						Enviar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
