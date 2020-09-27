import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';

const GameViewBoard = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);
    useEffect(() => {
        // On component mount, request initial game setup
        console.log('Getting first hand...');
        console.log(playerId);
        socket.emit('getFirstHand', { gameId, playerId });
        socket.on('getFirstHandResponse', (value) => {
            console.log(value);
        });
    }, []);

    return (<div>Game is in progress!</div>);
};

export default GameViewBoard;
