import React, { useState, useEffect } from "react";
import { obtenerJuegos } from "../services/api";
import AgregarJuego from "./AgregarJuego";
import DetalleJuego from "./DetalleJuego";
import '../styles/BibliotecaJuegos.css'

export default function BibliotecaJuegos() {
	const [juegos, setJuegos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);
	const [mostrarFormulario, setMostrarFormulario] = useState(false);
	const [juegoEditar, setJuegoEditar] = useState(null);
	const [juegoDetalle, setJuegoDetalle] = useState(null);
	const [busqueda, setBusqueda] = useState("");
	const [filtroPlataforma, setFiltroPlataforma] = useState("");
	const [filtroEstado, setFiltroEstado] = useState("");

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

	useEffect(() => {
		cargarJuegos();
	}, []);

	const juegosFiltrados = juegos.filter((juego) => {
		const coincideBusqueda = juego.titulo
			.toLowerCase()
			.includes(busqueda.toLowerCase());
		const coincidePlataforma =
			!filtroPlataforma || juego.plataforma === filtroPlataforma;
		const coincideEstado =
			!filtroEstado ||
			(filtroEstado === "completado" && juego.completado) ||
			(filtroEstado === "en-progreso" && !juego.completado);

		return coincideBusqueda && coincidePlataforma && coincideEstado;
	});

	const handleAgregar = () => {
		setJuegoEditar(null);
		setMostrarFormulario(true);
	};

	const handleEditar = (juego) => {
		setJuegoEditar(juego);
		setMostrarFormulario(true);
		setJuegoDetalle(null);
	};

	const handleGuardar = () => {
		setMostrarFormulario(false);
		setJuegoEditar(null);
		cargarJuegos();
	};

	const handleEliminar = () => {
		setJuegoDetalle(null);
		cargarJuegos();
	};

	if (cargando) return <p>Cargando juegos...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div>
			<div className="filtros">
				<input
					type="text"
					placeholder="Buscar juegos..."
					className="input-buscar"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
				/>
				<select
					className="select"
					value={filtroPlataforma}
					onChange={(e) => setFiltroPlataforma(e.target.value)}
				>
					<option value="">Todas las plataformas</option>
					<option value="PC">PC</option>
					<option value="PlayStation">PlayStation</option>
					<option value="Xbox">Xbox</option>
					<option value="Nintendo Switch">Nintendo Switch</option>
					<option value="Mobile">Mobile</option>
				</select>
				<select
					className="select"
					value={filtroEstado}
					onChange={(e) => setFiltroEstado(e.target.value)}
				>
					<option value="">Todos los estados</option>
					<option value="completado">Completados</option>
					<option value="en-progreso">En progreso</option>
				</select>
				<button className="btn-agregar" onClick={handleAgregar}>
					+ Agregar Juego
				</button>
			</div>

			{juegosFiltrados.length === 0 ? (
				<div className="mensaje-container">
					<p className="mensaje-vacio">
						No hay juegos que coincidan con tu búsqueda.<br />
						Agrega tu primer juego para comenzar 🎮
					</p>
				</div>
			) : (
				<div className="grid-juegos">
					{juegosFiltrados.map((juego) => (
						<div
							key={juego._id}
							className="juego-card"
							onClick={() => setJuegoDetalle(juego)}
						>
							<div className="juego-card-image">
								<img src={juego.portada} alt={juego.titulo} />
								{juego.completado && (
									<div className="badge-completado">✓</div>
								)}
							</div>
							<div className="juego-card-info">
								<h3>{juego.titulo}</h3>
								<p className="juego-plataforma">{juego.plataforma}</p>
								<div className="juego-rating">
									<span className="stars">
										{"⭐".repeat(Math.round(juego.puntuacion))}
									</span>
									<span className="score">{juego.puntuacion}/5</span>
								</div>
								<p className="juego-horas">{juego.horasJugadas}h</p>
							</div>
						</div>
					))}
				</div>
			)}

			{mostrarFormulario && (
				<AgregarJuego
					juego={juegoEditar}
					onGuardar={handleGuardar}
					onCancelar={() => {
						setMostrarFormulario(false);
						setJuegoEditar(null);
					}}
				/>
			)}

			{juegoDetalle && (
				<DetalleJuego
					juego={juegoDetalle}
					onEditar={handleEditar}
					onEliminar={handleEliminar}
					onCerrar={() => setJuegoDetalle(null)}
				/>
			)}
		</div>
	);
}
