import { SET_PLAYER_ID } from './playerTypes';

const initialState = {
    id: '',
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYER_ID:
            return {
                // ...state,
                id: action.payload,
            };
        default:
            return state;
    }
}
