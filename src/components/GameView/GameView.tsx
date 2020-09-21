import React from 'react';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewHUD from '../GameViewHUD/GameViewHUD';

const GameView = () => (
    <div>
        <GameViewBoard />
        <GameViewHUD />
    </div>
);

export default GameView;
