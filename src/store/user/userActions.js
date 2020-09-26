import { SET_USER } from './userTypes';

// eslint-disable-next-line import/prefer-default-export
export function setUser(username) {
    return {
        type: SET_USER,
        payload: username,
    };
}
