import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.cover} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Completado: {game.completed ? 'Sí' : 'No'}</p>
      <p>Puntuación: {game.rating} ⭐</p>
      <p>Horas: {game.hoursPlayed}</p>
      <Link to={`/reviews/${game._id}`}>Ver Reseñas</Link>
      {/* Agrega botones para editar/eliminar */}
    </div>
  );
}

export default GameCard;