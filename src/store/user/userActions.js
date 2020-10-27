// import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import socket from '../../utils/api/socket';
import { SET_USER } from './userTypes';

const cookies = new Cookies();
const cookieOptions = {
    path: '/',
};
const setCookies = (keyValueMap) => {
    Object.entries(keyValueMap).forEach((keyValuePair) => {
        const [key, value] = keyValuePair;
        cookies.set(key, value, cookieOptions);
    });
};

export function createUser(username) {
    return (dispatch) => new Promise((resolve) => {
        socket.emit('createUser', { username });
        socket.on('createUserResponse', (response) => {
            const { id } = response;
            dispatch({
                type: SET_USER,
                payload: { id, username },
            });
            setCookies({
                username,
                userId: id,
            });
            resolve();
        });
    });
}

export function setUser(username, userId) {
    return {
        type: SET_USER,
        payload: { id: userId, username },
    };
}
