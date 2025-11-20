import React, { useState } from "react";
import { eliminarJuego } from "../services/api";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i}>⭐</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i}>⭐</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }
  return stars;
};

export default function DetalleJuego({ juego, onEditar, onEliminar, onCerrar }) {
  const [eliminando, setEliminando] = useState(false);

  const handleEliminar = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${juego.titulo}"?`)) {
      try {
        setEliminando(true);
        await eliminarJuego(juego._id);
        onEliminar();
      } catch (error) {
        console.error("Error al eliminar juego:", error);
        alert("Error al eliminar el juego");
      } finally {
        setEliminando(false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content detalle-juego">
        <button className="btn-close" onClick={onCerrar}>×</button>
        
        <div className="detalle-header">
          <img src={juego.portada} alt={juego.titulo} className="detalle-portada" />
          <div className="detalle-info">
            <h2>{juego.titulo}</h2>
            <p className="detalle-plataforma">{juego.plataforma}</p>
            
            <div className="detalle-rating">
              <div className="stars">{renderStars(juego.puntuacion)}</div>
              <span className="rating-text">{juego.puntuacion}/5</span>
            </div>

            <div className="detalle-stats">
              <div className="stat">
                <strong>Género:</strong> {juego.genero || "N/A"}
              </div>
              <div className="stat">
                <strong>Desarrollador:</strong> {juego.desarrollador || "N/A"}
              </div>
              <div className="stat">
                <strong>Horas jugadas:</strong> {juego.horasJugadas}h
              </div>
              <div className="stat">
                <strong>Estado:</strong>{" "}
                {juego.completado ? (
                  <span className="badge completado">✓ Completado</span>
                ) : (
                  <span className="badge en-progreso">En progreso</span>
                )}
              </div>
            </div>

            {juego.notas && (
              <div className="detalle-notas">
                <strong>Notas:</strong>
                <p>{juego.notas}</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button
            onClick={() => onEditar(juego)}
            className="btn-primary"
          >
            Editar
          </button>
          <button
            onClick={handleEliminar}
            disabled={eliminando}
            className="btn-danger"
          >
            {eliminando ? "Eliminando..." : "Eliminar"}
          </button>
          <button onClick={onCerrar} className="btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
