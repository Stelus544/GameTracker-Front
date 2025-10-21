import React, { useState, useEffect, use } from 'react';
import GameCard from './GameCard';

function GameLibrary() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/games')
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.error(err));
    }, []);

    return(
        <div className='game-library'>
            <h2>Mi Biblioteca de juegos</h2>
            <div className='games-grid'>
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
    </div>
    );
}