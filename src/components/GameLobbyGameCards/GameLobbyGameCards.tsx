import React from 'react';
import GameLobbyGameCard from '../GameLobbyGameCard/GameLobbyGameCard';

const GameLobbyGameCards = (props: any) => {
    const { games } = props;

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game: any) => (
                <GameLobbyGameCard
                    key={game.ownerSocketID}
                    game={game}
                />
            ))}
        </div>
    );
};

export default GameLobbyGameCards;
