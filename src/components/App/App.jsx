import React from 'react';
import {
    Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';
import useWindowWidth from './useWindowWidth';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => {
    useWindowWidth(50); // Hook that updates screenSize in Redux

    return (
        <div className="App">
            <Switch>
                <PrivateRoute path="/lobby">
                    <GameLobby />
                </PrivateRoute>
                <PrivateRoute path="/game/:gameId">
                    <GameView />
                </PrivateRoute>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="*">
                    <Redirect
                        to="/lobby"
                    />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(App);
