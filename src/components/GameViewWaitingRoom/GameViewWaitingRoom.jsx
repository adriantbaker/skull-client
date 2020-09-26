import React from 'react';
import { useSelector } from 'react-redux';
import useGame from './useGame';

const GameViewWaitingRoom = () => {
    const { username } = useSelector((state) => state.user);

    const { game } = useGame();
    const { name, players, ownGame } = game;

    console.log(game);
    console.log(players);

    const getStartGameButton = () => {
        if (!ownGame) {
            return null;
        }
        return <button type="button">START GAME</button>;
    };

    return (
        <div>
            <div>
                Waiting Room -
                {' '}
                {name}
            </div>
            <div>
                {players.length}
                {' '}
                Players:
            </div>
            {players.map((player) => (
                <div>{player}</div>
            ))}
            {getStartGameButton()}
        </div>
    );
};

export default GameViewWaitingRoom;
