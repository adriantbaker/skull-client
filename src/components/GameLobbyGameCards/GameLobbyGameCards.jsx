import React from 'react';
import GameLobbyGameCard from '../GameLobbyGameCard/GameLobbyGameCard';

const GameLobbyGameCards = (props) => {
    const { games } = props;
    console.log(games);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
                <GameLobbyGameCard
                    key={game.id}
                    game={game}
                />
            ))}
        </div>
    );
};

export default GameLobbyGameCards;
