import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../../store/game/gameActions';
import useRoom from './useRoom';

const GameViewWaitingRoom = () => {
    const dispatch = useDispatch();

    const { game } = useRoom();
    const {
        name, players, ownGame, id,
    } = game;

    console.log(game);
    console.log(players);

    const getStartGameButton = () => {
        if (!ownGame) {
            return null;
        }
        return (
            <button
                type="button"
                onClick={() => dispatch(startGame(id))}
            >
                START GAME
            </button>
        );
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
                <div>{player.name}</div>
            ))}
            {getStartGameButton()}
        </div>
    );
};

export default GameViewWaitingRoom;
