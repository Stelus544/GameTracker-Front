import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

import "./App.css";

import Biblioteca from "./pages/Biblioteca";
import Lista from "./pages/Lista";
import Estadisticas from "./pages/Estadisticas";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <h1>🎮 Mi Biblioteca de Juegos</h1>
        <nav className="menu">
          <NavLink to="/biblioteca" className={({ isActive }) => (isActive ? "btn activo" : "btn")}>
            Biblioteca
          </NavLink>
          <NavLink to="/resenas" className={({ isActive }) => (isActive ? "btn activo" : "btn")}>
            Reseñas
          </NavLink>
          <NavLink to="/estadisticas" className={({ isActive }) => (isActive ? "btn activo" : "btn")}>
            Estadísticas
          </NavLink>
        </nav>
      </header>

      <section className="filtros">
        <input type="text" placeholder="Buscar juegos..." className="input-buscar" />
        <select className="select">
          <option>Todas las plataformas</option>
          <option>PC</option>
          <option>PlayStation</option>
          <option>Xbox</option>
          <option>Nintendo</option>
        </select>
        <select className="select">
          <option>Más recientes</option>
          <option>Más antiguos</option>
          <option>Alfabéticamente</option>
        </select>
        <button className="btn-agregar">+ Agregar Juego</button>
      </section>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/biblioteca" replace />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/resenas" element={<Lista />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </main>

      <footer className="footer">© Elaborado por Salomé G. y Andrés M.</footer>
    </BrowserRouter>
  );
}

export default App;
