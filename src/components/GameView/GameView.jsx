import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    joinGameRoom, leaveGame, rejoinGame, updateGame,
} from '../../store/game/gameActions';
import history from '../../utils/history/history';
import socket from '../../utils/api/socket';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewWaitingRoom from '../GameViewWaitingRoom/GameViewWaitingRoom';
import GameViewWon from '../GameViewWon/GameViewWon';

const GameView = () => {
    const { started, inGame } = useSelector((state) => state.game);
    const { id: userId } = useSelector((state) => state.user);
    const { gameId } = useParams();
    const dispatch = useDispatch();

    const [checkedExists, setCheckedExists] = useState(false);
    const mustCheckExists = !checkedExists && !inGame;
    const [exists, setExists] = useState(false);

    const [lastGameWinner, setLastGameWinner] = useState({ id: '', name: '' });
    const [winnerModalOpen, setWinnerModalOpen] = useState(false);

    const getGameWonModal = () => {
        if (winnerModalOpen) {
            const { id: winnerId, name: winnerName } = lastGameWinner;
            return (
                <GameViewWon
                    roomId={gameId}
                    playerId={userId}
                    winnerId={winnerId}
                    winnerName={winnerName}
                    closeModal={() => setWinnerModalOpen(false)}
                />
            );
        }

        return null;
    };

    useEffect(() => {
        if (mustCheckExists) {
            socket.emit('getGameExists', { gameId, playerId: userId });
        }

        socket.on('getGameExistsResponse', (response) => {
            const {
                exists: gameExists,
                inGame: userInGame,
                started: gameStarted,
                ownGame,
                name,
                players,
            } = response;
            setCheckedExists(true);
            setExists(gameExists);
            if (gameExists) {
                if (userInGame) {
                    dispatch(rejoinGame(gameId, name, ownGame, gameStarted, players));
                } else if (!started) {
                    dispatch(joinGameRoom(gameId));
                }
            }
        });

        socket.on('startGame', () => {
            dispatch(updateGame({
                started: true,
            }));
        });

        socket.on('endGame', (update) => {
            const { winnerId, winnerName } = update;
            dispatch(updateGame({
                started: false,
            }));
            setLastGameWinner({ id: winnerId, name: winnerName });
            setWinnerModalOpen(true);
        });

        socket.on('gameRoomDeleted', () => {
            history.push('/lobby');
            dispatch(leaveGame());
        });
    }, [dispatch]);

    if (mustCheckExists) {
        return <div>Checking...</div>;
    }

    if (checkedExists && !exists) {
        return <div>Game does not exist.</div>;
    }

    if (!inGame) {
        return <div>You are not part of this game.</div>;
    }

    if (inGame) {
        if (!started) {
            return (
                <div>
                    {getGameWonModal()}
                    <GameViewWaitingRoom />
                </div>
            );
        }

        return <GameViewBoard />;
    }

    return null;
};

export default GameView;
