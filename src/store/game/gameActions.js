import {
    CREATE_GAME, JOIN_GAME, LEAVE_GAME, UPDATE_GAME,
} from './gameTypes';
import socket from '../../utils/api/socket';

export function startGame(gameId) {
    socket.emit('startGame', { gameId });
}

export function createGame(gameName, ownerName) {
    return (dispatch) => {
        socket.emit('createGame', { gameName, ownerName });
        socket.on('createGameResponse', (game) => {
            const { id, name } = game;
            dispatch({
                type: CREATE_GAME,
                payload: {
                    id,
                    name,
                    players: [ownerName],
                },
            });
        });
        console.log('End of fn');
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
export function joinGame(game, username) {
    const { id, name, players } = game;
    socket.emit('joinGame', { gameId: id, playerName: username });
    return {
        type: JOIN_GAME,
        payload: {
            id,
            name,
            players: players.concat(username),
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
