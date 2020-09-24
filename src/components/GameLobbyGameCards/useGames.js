import { useState, useEffect } from 'react';
import socket from '../../utils/api/socket';

const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        socket.on('games', (value) => {
            setGames(value);
        });
    }, []);

    const createGame = (name, owner) => {
        console.log(name);
        console.log(owner);
        socket.emit('createGame', { name, owner });
    };

    return { games, createGame };
};

export default useGames;
