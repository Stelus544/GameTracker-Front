import React, { useState, useEffect } from "react";
import { crearResena, actualizarResena, obtenerJuegos } from "../services/api";

export default function FormularioResena({ resena = null, onGuardar, onCancelar }) {
  const [juegos, setJuegos] = useState([]);
  const [formData, setFormData] = useState(
    resena || {
      juegoId: "",
      titulo: "",
      contenido: "",
      puntuacion: 5,
      aspectosPositivos: [],
      aspectosNegativos: [],
      recomendado: true,
    }
  );

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [nuevoAspecto, setNuevoAspecto] = useState("");
  const [aspecto, setAspecto] = useState("positivo");

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const datos = await obtenerJuegos();
        setJuegos(datos);
      } catch (err) {
        console.error("Error al cargar juegos:", err);
      }
    };

    cargarJuegos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const agregarAspecto = () => {
    if (nuevoAspecto.trim()) {
      const campo = aspecto === "positivo" ? "aspectosPositivos" : "aspectosNegativos";
      setFormData({
        ...formData,
        [campo]: [...formData[campo], nuevoAspecto],
      });
      setNuevoAspecto("");
    }
  };

  const eliminarAspecto = (index, tipo) => {
    const campo = tipo === "positivo" ? "aspectosPositivos" : "aspectosNegativos";
    setFormData({
      ...formData,
      [campo]: formData[campo].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      if (resena && resena._id) {
        await actualizarResena(resena._id, formData);
      } else {
        await crearResena(formData);
      }
      onGuardar();
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar reseña");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{resena ? "Editar Reseña" : "Escribir Nueva Reseña"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="juegoId">Juego *</label>
            <select
              id="juegoId"
              name="juegoId"
              value={formData.juegoId}
              onChange={handleChange}
              required
              disabled={!!resena}
            >
              <option value="">Selecciona un juego</option>
              {juegos.map((juego) => (
                <option key={juego._id} value={juego._id}>
                  {juego.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="titulo">Título de la Reseña *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ej: Una experiencia increíble"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenido">Contenido *</label>
            <textarea
              id="contenido"
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              required
              placeholder="Escribe tu reseña detallada..."
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="puntuacion">Puntuación (1-5) *</label>
              <select
                id="puntuacion"
                name="puntuacion"
                value={formData.puntuacion}
                onChange={handleChange}
              >
                <option value="1">1 - Muy malo</option>
                <option value="2">2 - Malo</option>
                <option value="3">3 - Regular</option>
                <option value="4">4 - Bueno</option>
                <option value="5">5 - Excelente</option>
              </select>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="recomendado"
                name="recomendado"
                checked={formData.recomendado}
                onChange={handleChange}
              />
              <label htmlFor="recomendado">Recomendado</label>
            </div>
          </div>

          <div className="form-group">
            <label>Aspectos Positivos</label>
            <div className="aspectos-input">
              <input
                type="text"
                value={nuevoAspecto}
                onChange={(e) => setNuevoAspecto(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setAspecto("positivo");
                    agregarAspecto();
                  }
                }}
                placeholder="Ej: Gráficos espectaculares"
              />
              <button
                type="button"
                onClick={() => {
                  setAspecto("positivo");
                  agregarAspecto();
                }}
                className="btn-small"
              >
                +
              </button>
            </div>
            <div className="aspectos-list">
              {formData.aspectosPositivos.map((aspecto, index) => (
                <span key={index} className="aspecto-tag positivo">
                  {aspecto}
                  <button
                    type="button"
                    onClick={() => eliminarAspecto(index, "positivo")}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Aspectos Negativos</label>
            <div className="aspectos-input">
              <input
                type="text"
                value={nuevoAspecto}
                onChange={(e) => setNuevoAspecto(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setAspecto("negativo");
                    agregarAspecto();
                  }
                }}
                placeholder="Ej: Bugs ocasionales"
              />
              <button
                type="button"
                onClick={() => {
                  setAspecto("negativo");
                  agregarAspecto();
                }}
                className="btn-small"
              >
                +
              </button>
            </div>
            <div className="aspectos-list">
              {formData.aspectosNegativos.map((aspecto, index) => (
                <span key={index} className="aspecto-tag negativo">
                  {aspecto}
                  <button
                    type="button"
                    onClick={() => eliminarAspecto(index, "negativo")}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={cargando} className="btn-primary">
              {cargando ? "Guardando..." : "Guardar Reseña"}
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
