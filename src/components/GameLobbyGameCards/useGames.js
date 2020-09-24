import { useState, useEffect } from 'react';
import socket from '../../utils/api/socket';

const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        socket.on('games', (value) => {
            setGames(value);
        });
    }, []);

    const createGame = (gameName, ownerName) => {
        socket.emit('createGame', { gameName, ownerName });
    };

    return { games, createGame };
};

export default useGames;
