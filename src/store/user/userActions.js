import { SET_USER } from './userTypes';

// eslint-disable-next-line import/prefer-default-export
export function setUser(username) {
    console.log(username);
    return {
        type: SET_USER,
        payload: username,
    };
}
