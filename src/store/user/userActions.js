import { User, SET_USER, UserActionTypes } from './userTypes';

// eslint-disable-next-line import/prefer-default-export
export function setUser(user: User): UserActionTypes {
    return {
        type: SET_USER,
        payload: user,
    };
}
