import { useState, useEffect } from 'react';
import socket from '../../utils/api/socket';

const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        socket.on('games', (value: any) => {
            setGames(value);
        });
    }, []);

    const createGame = (name: any, owner: any) => {
        socket.emit('createGame', { name, owner });
    };

    return { games, createGame };
};

export default useGames;
