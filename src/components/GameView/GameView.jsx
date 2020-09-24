import React from 'react';
import { useSelector } from 'react-redux';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewHUD from '../GameViewHUD/GameViewHUD';

const GameView = () => {
    const { ownGame } = useSelector((state) => state.game);

    return (
        <div>
            {ownGame ? 'You own this game!' : 'You have joined this game!'}
            <GameViewBoard />
            <GameViewHUD />
        </div>
    );
};

export default GameView;
