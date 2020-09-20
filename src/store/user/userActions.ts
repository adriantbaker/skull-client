import { User, SET_USER, UserActionTypes } from './userTypes';

export function setUser(user: User): UserActionTypes {
    return {
        type: SET_USER,
        payload: user,
    };
}
