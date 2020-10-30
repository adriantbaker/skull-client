import React, { useEffect } from 'react';
import Modal from '../../basicComponents/Modal/Modal';
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
            <Modal
                title="Create Game"
                triggerLabel="CREATE GAME"
            >
                <CreateGame />
            </Modal>
            <GameLobbyGameCards games={games} />
        </div>
    );
};

export default GameLobby;
