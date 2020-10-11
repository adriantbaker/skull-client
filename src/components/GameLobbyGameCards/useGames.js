import { useState, useEffect } from 'react';
import socket from '../../utils/api/socket';

const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        socket.on('rooms', (value) => {
            setGames(value);
        });
    }, []);

    return { games };
};

export default useGames;
