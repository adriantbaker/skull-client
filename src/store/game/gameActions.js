import { CREATE_GAME, JOIN_GAME, LEAVE_GAME } from './gameTypes';
import socket from '../../utils/api/socket';

export function createGame(gameName, ownerName) {
    return (dispatch) => {
        socket.emit('createGame', { gameName, ownerName });
        socket.on('createGameResponse', (game) => {
            console.log('On create game response!');
            dispatch({
                type: CREATE_GAME,
                payload: game.id,
            });
        });
        console.log('End of fn');
    };
}

export function joinGame(gameId, username) {
    socket.emit('joinGame', { gameId, playerName: username });
    return {
        type: JOIN_GAME,
        payload: gameId,
    };
}

export function leaveGame() {
    return {
        type: LEAVE_GAME,
    };
}
