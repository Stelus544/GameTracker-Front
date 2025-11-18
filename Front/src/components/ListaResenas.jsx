import React, { useState, useEffect } from "react";
import { obtenerResenas } from "../services/api";

export default function ListaResenas() {
	const [resenas, setResenas] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
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

		cargarResenas();
	}, []);

	if (cargando) return <p>Cargando reseñas...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div>
			<h2>Reseñas</h2>
			{resenas.length === 0 ? (
				<p>No hay reseñas yet.</p>
			) : (
				<div className="resenas-list">
					{resenas.map((resena) => (
						<div key={resena._id} className="resena-item">
							<h3>{resena.titulo}</h3>
							<p><strong>Puntuación:</strong> {resena.puntuacion}/5</p>
							<p>{resena.contenido}</p>
							{resena.recomendado && <span className="recomendado">✅ Recomendado</span>}
						</div>
					))}
				</div>
			)}
		</div>
	);
}