import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { joinGameRoom, rejoinGame, updateGame } from '../../store/game/gameActions';
import socket from '../../utils/api/socket';
import GameViewBoard from '../GameViewBoard/GameViewBoard';
import GameViewWaitingRoom from '../GameViewWaitingRoom/GameViewWaitingRoom';

const GameView = () => {
    const { started, inGame } = useSelector((state) => state.game);
    const { id: userId } = useSelector((state) => state.user);
    const { gameId } = useParams();
    const dispatch = useDispatch();

    const [checkedExists, setCheckedExists] = useState(false);
    const mustCheckExists = !checkedExists && !inGame;
    const [exists, setExists] = useState(false);

    useEffect(() => {
        console.log('Must check exists?');
        console.log(mustCheckExists);
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
            } = response;
            setCheckedExists(true);
            setExists(gameExists);
            if (gameExists && userInGame) {
                dispatch(rejoinGame(gameId, name, ownGame, gameStarted));
            }
        });

        socket.on('startGame', () => {
            dispatch(updateGame({
                started: true,
            }));
        });
    }, [dispatch]);

    if (mustCheckExists) {
        return <div>Checking...</div>;
    }

    if (checkedExists && !exists) {
        return <div>Game does not exist.</div>;
    }

    if (!inGame) {
        dispatch(joinGameRoom(gameId));
        return <div>You are not part of this game.</div>;
    }

    if (inGame) {
        if (!started) {
            return <GameViewWaitingRoom />;
        }

        return <GameViewBoard />;
    }

    return null;
};

export default GameView;
