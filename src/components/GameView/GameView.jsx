import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame } from '../../store/game/gameActions';
import socket from '../../utils/api/socket';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewWaitingRoom from '../GameViewWaitingRoom/GameViewWaitingRoom';

const GameView = () => {
    const { started } = useSelector((state) => state.game);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('startGame', () => {
            console.log('Got startGame message');
            dispatch(updateGame({
                started: true,
            }));
        });
    }, []);

    if (!started) {
        return <GameViewWaitingRoom />;
    }

    return <GameViewBoard />;
};

export default GameView;
