import { SET_USER } from './userTypes';

const initialState = {
    signedIn: false,
    username: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                // ...state,
                signedIn: true,
                username: action.payload,
            };
        default:
            return state;
    }
}
