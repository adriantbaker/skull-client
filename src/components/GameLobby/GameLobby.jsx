import React, { useEffect } from 'react';
import socket from '../../utils/api/socket';
import CreateGame from '../CreateGame/CreateGame';
import GameLobbyGameCards from '../GameLobbyGameCards/GameLobbyGameCards';
import useGames from '../GameLobbyGameCards/useGames';

const GameLobby = () => {
    const { games } = useGames();

    useEffect(() => {
        socket.emit('joinLobby');

        return () => {
            socket.emit('leaveLobby');
        };
    }, []);

    return (
        <div>
            <h3>Game Lobby</h3>
            <CreateGame />
            <GameLobbyGameCards games={games} />
        </div>
    );
};

export default GameLobby;
