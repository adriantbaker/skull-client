import { UserState, UserActionTypes, SET_USER } from './userTypes';

const initialState: UserState = {
    user: {
        username: '',
    },
};

export default function userReducer(
    state = initialState,
    action: UserActionTypes,
): UserState {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload,
            };
        default:
            return state;
    }
}
