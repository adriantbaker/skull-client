import { SET_USER } from './userTypes';
import history from '../../utils/history/history';

// eslint-disable-next-line import/prefer-default-export
export function setUser(username) {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: username,
        });
        history.push('/lobby');
    };
}
