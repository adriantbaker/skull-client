import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user/userActions';

const PrivateRoute = (props) => {
    const { path, children } = props;
    const cookies = new Cookies();
    const { signedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();

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
