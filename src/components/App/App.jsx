import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';

const App = () => {
    const { inGame } = useSelector((state) => state.game);

    const getAppView = () => {
        if (!inGame) {
            return <GameLobby />;
        }
        return <GameView />;
    };

    return (
        <div className="App">
            <SignIn />
            {getAppView()}
        </div>
    );
};

export default App;
