import {
    CREATE_GAME, JOIN_GAME, REJOIN_GAME, LEAVE_GAME, UPDATE_GAME, UPDATE_GAME_CONFIG, REQUEST_JOIN_LINK_INFO, GET_JOIN_LINK_INFO,
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
    joiningFromLink: false,
    joinGameNotFound: false,
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
            console.log('players - reducer');
            console.log(players);
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
        case REQUEST_JOIN_LINK_INFO: {
            const { id } = action.payload;
            return {
                ...state,
                id,
                joiningFromLink: true,
            };
        }
        case GET_JOIN_LINK_INFO: {
            const { exists, started, name } = action.payload;
            return {
                ...state,
                joinGameNotFound: !exists,
                started,
                name,
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
