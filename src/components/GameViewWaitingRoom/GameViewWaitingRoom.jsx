import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../basicComponents/Button/Button';
import { startGame } from '../../store/game/gameActions';
import useRoom from './useRoom';

const GameViewWaitingRoom = () => {
    const dispatch = useDispatch();

    const { game } = useRoom();
    const {
        name, players, ownGame, id,
    } = game;
    const numPlayers = players.length;

    const getStartGameButton = () => {
        if (!ownGame) {
            return null;
        }
        return (
            <Button
                disabled={numPlayers < 2}
                onClick={() => dispatch(startGame(id))}
            >
                START GAME
            </Button>
        );
    };

    return (
        <div>
            <h1>{name}</h1>
            <h2>Waiting Room</h2>
            <div>{`${numPlayers} player${numPlayers === 1 ? '' : 's'}:`}</div>
            {players.map((player) => (
                <div>{player.name}</div>
            ))}
            {getStartGameButton()}
        </div>
    );
};

export default GameViewWaitingRoom;
