import { SET_USER } from './userTypes';

const initialState = {
    username: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;
    }
}
