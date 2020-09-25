import React from 'react';
import { useSelector } from 'react-redux';
import { startGame } from '../../store/game/gameActions';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewHUD from '../GameViewHUD/GameViewHUD';

const GameView = () => {
    const { ownGame, gameId } = useSelector((state) => state.game);

    return (
        <div>
            {ownGame ? 'You own this game!' : 'You have joined this game!'}
            {ownGame ? (
                <div
                    onClick={() => startGame(gameId)}
                >
                    Start Game
                </div>
            ) : null}
            <GameViewBoard />
            <GameViewHUD />
        </div>
    );
};

export default GameView;
