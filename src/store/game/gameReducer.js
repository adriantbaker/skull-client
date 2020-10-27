import {
    CREATE_GAME, JOIN_GAME, REJOIN_GAME, LEAVE_GAME, UPDATE_GAME, UPDATE_GAME_CONFIG,
} from './gameTypes';

const initialState = {
    inGame: false,
    ownGame: false,
    started: false,
    id: '',
    name: '',
    players: [],
    actionTimeLimit: 45,
    respondTimeLimit: 30,
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GAME: {
            const { id, name, players } = action.payload;
            return {
                ...state,
                inGame: true,
                ownGame: true,
                id,
                name,
                players,
            };
        }
        case JOIN_GAME: {
            const { id, name, players } = action.payload;
            return {
                ...state,
                inGame: true,
                ownGame: false,
                id,
                name,
                players,
            };
        }
        case REJOIN_GAME: {
            const {
                id, name, players, ownGame, started,
            } = action.payload;
            return {
                ...state,
                inGame: true,
                ownGame,
                id,
                name,
                players,
                started,
            };
        }
        case LEAVE_GAME:
            return {
                ...state,
                inGame: false,
                ownGame: false,
                id: '',
            };
        case UPDATE_GAME: {
            const {
                id, name, players, started,
            } = action.payload;
            return {
                ...state,
                id: id || state.id,
                name: name || state.name,
                players: players || state.players,
                started: started || state.started,
            };
        }
        case UPDATE_GAME_CONFIG: {
            const {
                actionTimeLimit,
                respondTimeLimit,
            } = action.payload;
            return {
                ...state,
                actionTimeLimit: actionTimeLimit || state.actionTimeLimit,
                respondTimeLimit: respondTimeLimit || state.respondTimeLimit,
            };
        }
        default:
            return state;
    }
}
