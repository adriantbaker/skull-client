import React, { useEffect } from 'react';
import Header from '../../basicComponents/Header/Header';
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
            <Header
                h="2"
                className="text-white py-6"
            >
                Game Lobby
            </Header>
            <Modal
                title="Create Game"
                trigger
                triggerLabel="CREATE GAME"
            >
                <CreateGame />
            </Modal>
            <GameLobbyGameCards games={games} />
        </div>
    );
};

export default GameLobby;
