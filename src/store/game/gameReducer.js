import {
    CREATE_GAME, JOIN_GAME, LEAVE_GAME, UPDATE_GAME,
} from './gameTypes';

const initialState = {
    inGame: false,
    ownGame: false,
    started: false,
    id: '',
    name: '',
    players: [],
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GAME: {
            const { id, name, players } = action.payload;
            return {
                // ...state,
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
                // ...state,
                inGame: true,
                ownGame: false,
                id,
                name,
                players,
            };
        }
        case LEAVE_GAME:
            return {
                // ...state,
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
        default:
            return state;
    }
}
