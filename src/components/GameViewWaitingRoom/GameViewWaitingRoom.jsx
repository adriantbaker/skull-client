import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import Button from '../../basicComponents/Button/Button';
import { startGame } from '../../store/game/gameActions';
import useRoom from './useRoom';

const GameViewWaitingRoom = () => {
    const dispatch = useDispatch();

    const { game } = useRoom();
    const {
        name, players, ownGame, id: roomId,
    } = game;
    const numPlayers = players.length;

    const { id: playerId } = useSelector((state) => state.user);

    const [thisPlayer] = players.filter((player) => player.id === playerId);
    const { ready } = thisPlayer;

    const toggleReady = () => {
        socket.emit('toggleReady', { roomId, playerId });
    };

    const getStartGameButton = () => {
        if (!ownGame) {
            return (
                <Button
                    secondary
                    onClick={toggleReady}
                >
                    {ready ? "I'm Not Ready" : "I'm Ready"}
                </Button>
            );
        }

        const allReady = players
            .filter((player) => player.id !== playerId)
            .every((player) => player.ready);

        return (
            <Button
                disabled={numPlayers < 2 || !allReady}
                onClick={() => dispatch(startGame(roomId))}
            >
                START GAME
            </Button>
        );
    };

    const getPlayerIcon = (player) => {
        if (player.isOwner) {
            return 'Owner';
        }
        if (player.ready) {
            return 'Ready';
        }
        return 'Not Ready';
    };

    return (
        <div>
            <h1>{name}</h1>
            <h2>Waiting Room</h2>
            <div>{`${numPlayers} player${numPlayers === 1 ? '' : 's'}:`}</div>
            {players.map((player) => (
                <div>
                    {player.name}
                    {' '}
                    -
                    {' '}
                    {getPlayerIcon(player)}
                </div>
            ))}
            <div>
                {getStartGameButton()}
            </div>
        </div>
    );
};

export default GameViewWaitingRoom;
