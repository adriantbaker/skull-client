import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user/userActions';
import { joinGameFromLink } from '../../store/game/gameActions';

const PrivateRoute = (props) => {
    const { path, children } = props;
    const cookies = new Cookies();
    const { signedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isSignedIn = () => {
        // User is signed in for this session (stored in Redux)
        if (signedIn) {
            return true;
        }

        // User has cookies for signing in; sign them in for this session
        const username = cookies.get('username');
        const userId = cookies.get('userId');

        if (username && userId) {
            dispatch(setUser(username, userId));
            return true;
        }

        return false;
    };

    if (isSignedIn()) {
        return (
            <Route path={path}>
                {children}
            </Route>
        );
    }

    if (pathname.indexOf('/game/') === 0) {
        const gameId = pathname.split('/game/')[1];
        dispatch(joinGameFromLink(gameId));
    }

    return (
        <Route path={path}>
            <Redirect to="/signin" />
        </Route>
    );
};

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
