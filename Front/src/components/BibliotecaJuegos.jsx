import React from "react";


export default function BibliotecaJuegos() {
	return (
		<div>
			<div className="mensaje-container">
				<p className="mensaje-vacio">No hay juegos en tu biblioteca.<br />Agrega tu primer juego para comenzar 🎮</p>
			</div>

			<div className="grid-juegos">
				<div className="juego-card">
					<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg" alt="Cyberpunk 2077" />
					<h3>Cyberpunk 2077</h3>
				</div>
				<div className="juego-card">
					<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg" alt="Red Dead Redemption 2" />
					<h3>Red Dead Redemption 2</h3>
				</div>
				<div className="juego-card">
					<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg" alt="Counter-Strike 2" />
					<h3>Counter-Strike 2</h3>
				</div>
				<div className="juego-card">
					<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg" alt="GTA V" />
					<h3>Grand Theft Auto V</h3>
				</div>
			</div>
		</div>
	);
}
