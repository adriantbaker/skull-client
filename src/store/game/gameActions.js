import {
    CREATE_GAME, JOIN_GAME, LEAVE_GAME, REJOIN_GAME, UPDATE_GAME, UPDATE_GAME_CONFIG,
} from './gameTypes';
import history from '../../utils/history/history';
import socket from '../../utils/api/socket';
import { setPlayerId } from '../player/playerActions';

export function startGame(roomId) {
    return (dispatch) => {
        socket.emit('startGame', { roomId });
    };
}

export function createGameRoom(roomName) {
    return (dispatch, getState) => {
        const { username, id: userId } = getState().user;
        socket.emit('createGameRoom', { roomName, ownerName: username, ownerId: userId });
        socket.on('createGameRoomResponse', (response) => {
            const { room, player } = response;
            const { id, name, players } = room;
            dispatch({
                type: CREATE_GAME,
                payload: {
                    id,
                    name,
                    players,
                },
            });
            dispatch(setPlayerId(player.id));
            history.push(`/game/${id}`);
        });
    };
}

export function joinGameRoom(roomId) {
    return (dispatch, getState) => {
        const { username, id: userId } = getState().user;
        socket.emit('joinGameRoom', { roomId, playerName: username, playerId: userId });
        socket.on('joinGameRoomResponse', (response) => {
            const { room, player } = response;
            const { id, name, players } = room;
            dispatch({
                type: JOIN_GAME,
                payload: {
                    id,
                    name,
                    players,
                },
            });
            dispatch(setPlayerId(player.id));
            history.push(`/game/${id}`);
        });
    };
}

export function rejoinGame(gameId, gameName, ownGame, gameStarted) {
    return {
        type: REJOIN_GAME,
        payload: {
            id: gameId,
            name: gameName,
            players: [],
            ownGame,
            started: gameStarted,
        },
    };
}

export function leaveGame() {
    return {
        type: LEAVE_GAME,
    };
}

export function updateGame(game) {
    return {
        type: UPDATE_GAME,
        payload: game,
    };
}

export function updateGameConfig(gameConfig) {
    return {
        type: UPDATE_GAME_CONFIG,
        payload: gameConfig,
    };
}
