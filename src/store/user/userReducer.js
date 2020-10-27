import { SET_USER } from './userTypes';

const initialState = {
    signedIn: false,
    id: '',
    username: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            const { id, username } = action.payload;
            return {
                // ...state,
                signedIn: true,
                id,
                username,
            };
        }
        default:
            return state;
    }
}
