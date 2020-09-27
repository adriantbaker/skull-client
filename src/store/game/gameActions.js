import {
    CREATE_GAME, JOIN_GAME, LEAVE_GAME, UPDATE_GAME,
} from './gameTypes';
import socket from '../../utils/api/socket';
import { setPlayerId } from '../player/playerActions';

export function startGame(gameId) {
    return (dispatch) => {
        socket.emit('startGame', { gameId });
    };
}

export function createGame(gameName, ownerName) {
    return (dispatch) => {
        console.log('Emitting createGame...');
        socket.emit('createGame', { gameName, ownerName });
        socket.on('createGameResponse', (response) => {
            const { game, player } = response;
            const { id, name, players } = game;
            console.log(game);
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
export function joinGame(gameId, username) {
    return (dispatch) => {
        socket.emit('joinGame', { gameId, playerName: username });
        socket.on('joinGameResponse', (response) => {
            const { game, player } = response;
            const { id, name, players } = game;
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
