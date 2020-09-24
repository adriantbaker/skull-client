import { CREATE_GAME, JOIN_GAME, LEAVE_GAME } from './gameTypes';

const initialState = {
    inGame: false,
    ownGame: false,
    gameId: '',
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GAME:
            return {
                // ...state,
                inGame: true,
                ownGame: true,
                gameId: action.payload,
            };
        case JOIN_GAME:
            return {
                // ...state,
                inGame: true,
                ownGame: false,
                gameId: action.payload,
            };
        case LEAVE_GAME:
            return {
                // ...state,
                inGame: false,
                ownGame: false,
                gameId: '',
            };
        default:
            return state;
    }
}
