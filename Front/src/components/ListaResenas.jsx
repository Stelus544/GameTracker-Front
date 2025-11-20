import React, { useState, useEffect } from "react";
import { obtenerResenas, eliminarResena } from "../services/api";
import FormularioResena from "./FormularioResena";

export default function ListaResenas() {
	const [resenas, setResenas] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);
	const [mostrarFormulario, setMostrarFormulario] = useState(false);
	const [resenaEditar, setResenaEditar] = useState(null);
	const [busqueda, setBusqueda] = useState("");

	const cargarResenas = async () => {
		try {
			setCargando(true);
			const datos = await obtenerResenas();
			setResenas(datos);
		} catch (err) {
			setError("Error al cargar las reseñas");
			console.error(err);
		} finally {
			setCargando(false);
		}
	};

	useEffect(() => {
		cargarResenas();
	}, []);

	const resenasFiltradas = resenas.filter((resena) =>
		resena.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
		resena.contenido.toLowerCase().includes(busqueda.toLowerCase())
	);

	const handleEliminar = async (id) => {
		if (window.confirm("¿Estás seguro de que deseas eliminar esta reseña?")) {
			try {
				await eliminarResena(id);
				cargarResenas();
			} catch (error) {
				console.error("Error al eliminar reseña:", error);
				alert("Error al eliminar la reseña");
			}
		}
	};

	const handleGuardar = () => {
		setMostrarFormulario(false);
		setResenaEditar(null);
		cargarResenas();
	};

	if (cargando) return <p>Cargando reseñas...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div>
			<div className="resenas-header">
				<input
					type="text"
					placeholder="Buscar reseñas..."
					className="input-buscar"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
				/>
				<button
					className="btn-agregar"
					onClick={() => {
						setResenaEditar(null);
						setMostrarFormulario(true);
					}}
				>
					+ Nueva Reseña
				</button>
			</div>

			{resenasFiltradas.length === 0 ? (
				<p className="mensaje-vacio">No hay reseñas aún. ¡Escribe la primera!</p>
			) : (
				<div className="resenas-list">
					{resenasFiltradas.map((resena) => (
						<div key={resena._id} className="resena-item">
							<div className="resena-header">
								<div>
									<h3>{resena.titulo}</h3>
									<p className="resena-juego">
										{resena.juegoId?.titulo || "Juego desconocido"}
									</p>
								</div>
								<div className="resena-rating">
									<span className="stars">
										{"⭐".repeat(resena.puntuacion)}
									</span>
									<span>{resena.puntuacion}/5</span>
								</div>
							</div>

							<p className="resena-contenido">{resena.contenido}</p>

							{(resena.aspectosPositivos?.length > 0 ||
								resena.aspectosNegativos?.length > 0) && (
								<div className="aspectos">
									{resena.aspectosPositivos?.length > 0 && (
										<div className="aspectos-positivos">
											<strong>✓ Positivos:</strong>
											<ul>
												{resena.aspectosPositivos.map((aspecto, i) => (
													<li key={i}>{aspecto}</li>
												))}
											</ul>
										</div>
									)}
									{resena.aspectosNegativos?.length > 0 && (
										<div className="aspectos-negativos">
											<strong>✗ Negativos:</strong>
											<ul>
												{resena.aspectosNegativos.map((aspecto, i) => (
													<li key={i}>{aspecto}</li>
												))}
											</ul>
										</div>
									)}
								</div>
							)}

							<div className="resena-footer">
								{resena.recomendado && (
									<span className="badge recomendado">✅ Recomendado</span>
								)}
								<div className="resena-actions">
									<button
										className="btn-small"
										onClick={() => {
											setResenaEditar(resena);
											setMostrarFormulario(true);
										}}
									>
										Editar
									</button>
									<button
										className="btn-small btn-danger"
										onClick={() => handleEliminar(resena._id)}
									>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{mostrarFormulario && (
				<FormularioResena
					resena={resenaEditar}
					onGuardar={handleGuardar}
					onCancelar={() => {
						setMostrarFormulario(false);
						setResenaEditar(null);
					}}
				/>
			)}
		</div>
	);
}