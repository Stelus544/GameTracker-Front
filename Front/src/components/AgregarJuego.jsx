import React, { useState } from "react";
import { crearJuego, actualizarJuego } from "../services/api";

export default function AgregarJuego({ juego = null, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState(
    juego || {
      titulo: "",
      portada: "",
      plataforma: "PC",
      genero: "",
      desarrollador: "",
      fechaLanzamiento: "",
      completado: false,
      puntuacion: 0,
      horasJugadas: 0,
      notas: "",
    }
  );

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      if (juego && juego._id) {
        await actualizarJuego(juego._id, formData);
      } else {
        await crearJuego(formData);
      }
      onGuardar();
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar juego");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{juego ? "Editar Juego" : "Agregar Nuevo Juego"}</h2>
        
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Nombre del juego"
            />
          </div>

          <div className="form-group">
            <label htmlFor="portada">URL Portada</label>
            <input
              type="url"
              id="portada"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/portada.jpg"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="plataforma">Plataforma</label>
              <select
                id="plataforma"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
              >
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Mobile">Mobile</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="genero">Género</label>
              <input
                type="text"
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                placeholder="RPG, FPS, etc."
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="desarrollador">Desarrollador</label>
            <input
              type="text"
              id="desarrollador"
              name="desarrollador"
              value={formData.desarrollador}
              onChange={handleChange}
              placeholder="Nombre del desarrollador"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento</label>
              <input
                type="date"
                id="fechaLanzamiento"
                name="fechaLanzamiento"
                value={formData.fechaLanzamiento.substring(0, 10) || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="horasJugadas">Horas Jugadas</label>
              <input
                type="number"
                id="horasJugadas"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="puntuacion">Puntuación (0-5)</label>
              <input
                type="number"
                id="puntuacion"
                name="puntuacion"
                value={formData.puntuacion}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.5"
              />
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="completado"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
              />
              <label htmlFor="completado">Completado</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Anotaciones personales..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={cargando} className="btn-primary">
              {cargando ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={onCancelar} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
