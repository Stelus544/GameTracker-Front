import React, { useState, useEffect } from "react";
import { obtenerEstadisticas } from "../services/api";

export default function EstadisticasPersonales() {
	const [estadisticas, setEstadisticas] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const cargarEstadisticas = async () => {
			try {
				setCargando(true);
				const datos = await obtenerEstadisticas();
				setEstadisticas(datos);
			} catch (err) {
				setError("Error al cargar las estadísticas");
				console.error(err);
			} finally {
				setCargando(false);
			}
		};

		cargarEstadisticas();
	}, []);

	if (cargando) return <p>Cargando estadísticas...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div>
			<h2>Estadísticas Personales</h2>
			{estadisticas ? (
				<div className="estadisticas-container">
					<div className="stat-card">
						<h3>Total de Juegos</h3>
						<p className="stat-number">{estadisticas.totalJuegos}</p>
					</div>
					<div className="stat-card">
						<h3>Juegos Completados</h3>
						<p className="stat-number">{estadisticas.juegosCompletados}</p>
					</div>
					<div className="stat-card">
						<h3>Juegos en Progreso</h3>
						<p className="stat-number">{estadisticas.juegosEnProgreso}</p>
					</div>
					<div className="stat-card">
						<h3>Horas Totales Jugadas</h3>
						<p className="stat-number">{estadisticas.horasTotales}</p>
					</div>
					<div className="stat-card">
						<h3>Puntuación Promedio</h3>
						<p className="stat-number">{estadisticas.puntuacionPromedio}/5</p>
					</div>
				</div>
			) : (
				<p>No hay estadísticas disponibles.</p>
			)}
		</div>
	);
}