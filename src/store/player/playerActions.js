import { SET_PLAYER_ID } from './playerTypes';

// eslint-disable-next-line import/prefer-default-export
export function setPlayerId(playerId) {
    return {
        type: SET_PLAYER_ID,
        payload: playerId,
    };
}
