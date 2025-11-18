import React, { useState, useEffect } from "react";
import { obtenerJuegos } from "../services/api";
import '../styles/BibliotecaJuegos.css'

export default function BibliotecaJuegos() {
	const [juegos, setJuegos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const cargarJuegos = async () => {
			try {
				setCargando(true);
				const datos = await obtenerJuegos();
				setJuegos(datos);
			} catch (err) {
				setError("Error al cargar los juegos");
				console.error(err);
			} finally {
				setCargando(false);
			}
		};

		cargarJuegos();
	}, []);

	if (cargando) return <p>Cargando juegos...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div>
			{juegos.length === 0 ? (
				<div className="mensaje-container">
					<p className="mensaje-vacio">No hay juegos en tu biblioteca.<br />Agrega tu primer juego para comenzar 🎮</p>
				</div>
			) : (
				<div className="grid-juegos">
					{juegos.map((juego) => (
						<div key={juego._id} className="juego-card">
							<img src={juego.portada} alt={juego.titulo} />
							<h3>{juego.titulo}</h3>
							<p>{juego.plataforma}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
