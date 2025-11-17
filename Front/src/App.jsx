import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import "./App.css";

// Componentes de la app
import BibliotecaJuegos from "./components/BibliotecaJuegos.jsx";
import ListaResenas from "./components/ListaResenas.jsx";
import EstadisticasPersonales from "./components/EstadisticasPersonales.jsx";

function App() {
  return (
    <div>
      <header className="navbar">
        <h1>🎮 Mi Biblioteca de Juegos</h1>
        <nav className="menu">
          <NavLink
            to="/biblioteca"
            className={({ isActive }) => `btn ${isActive ? "activo" : ""}`}
          >
            Biblioteca
          </NavLink>
          <NavLink
            to="/resenas"
            className={({ isActive }) => `btn ${isActive ? "activo" : ""}`}
          >
            Reseñas
          </NavLink>
          <NavLink
            to="/estadisticas"
            className={({ isActive }) => `btn ${isActive ? "activo" : ""}`}
          >
            Estadísticas
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/resenas" element={<ListaResenas />} />
          <Route path="/estadisticas" element={<EstadisticasPersonales />} />
          {/* Redirección por defecto a /biblioteca */}
          <Route path="/" element={<Navigate to="/biblioteca" replace />} />
          {/* Ruta catch-all por si se navega a una ruta inexistente */}
          <Route path="*" element={<Navigate to="/biblioteca" replace />} />
        </Routes>
      </main>

      <footer className="footer">© Elaborado por Salomé G. y Andrés</footer>
    </div>
  );
}

export default App;
