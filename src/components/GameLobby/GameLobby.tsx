import React from 'react';
import CreateGame from '../CreateGame/CreateGame';
import GameLobbyGameCards from '../GameLobbyGameCards/GameLobbyGameCards';
import useGames from '../GameLobbyGameCards/useGames';

const GameLobby = () => {
    const { games } = useGames();

    return (
        <div>
            <h3>Game Lobby</h3>
            <CreateGame />
            <GameLobbyGameCards games={games} />
        </div>
    );
};

export default GameLobby;
