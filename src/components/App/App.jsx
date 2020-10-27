import React from 'react';
import {
    Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';
import useWindowWidth from './useWindowWidth';

const App = () => {
    const { signedIn } = useSelector((state) => state.user);

    useWindowWidth(50); // Hook that updates screenSize in Redux

    return (
        <div className="App">
            <Switch>
                <Route path="/lobby">
                    <GameLobby />
                </Route>
                <Route path="/game/:gameID">
                    <GameView />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="*">
                    <Redirect
                        to={signedIn ? '/lobby' : '/signin'}
                    />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(App);
