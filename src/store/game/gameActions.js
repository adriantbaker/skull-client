import {
    CREATE_GAME, JOIN_GAME, LEAVE_GAME, UPDATE_GAME,
} from './gameTypes';
import socket from '../../utils/api/socket';
import { setPlayerId } from '../player/playerActions';

export function startGame(roomId) {
    return (dispatch) => {
        socket.emit('startGame', { roomId });
    };
}

export function createGameRoom(roomName, ownerName) {
    return (dispatch) => {
        socket.emit('createGameRoom', { roomName, ownerName });
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
        });
    };
}
/**
 *
 * @param {object} game Game
 * @param {string} game.id Game ID
 * @param {string} game.name Game Name
 * @param {Array<string>} game.players Game Players list
 * @param {string} username Username
 */
export function joinGameRoom(roomId, username) {
    return (dispatch) => {
        socket.emit('joinGameRoom', { roomId, playerName: username });
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
        });
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
