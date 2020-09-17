import React from 'react';
import GameLobbyGameCard from '../GameLobbyGameCard/GameLobbyGameCard';

const GameLobbyGameCards = (props: any) => {
    const { games } = props;

    return (
        games.map((game: any) => (
            <GameLobbyGameCard
                key={game.ownerSocketID}
                game={game}
            />
        ))
    );
};

export default GameLobbyGameCards;
