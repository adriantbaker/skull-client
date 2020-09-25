import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';

const App = () => {
    const { signedIn } = useSelector((state) => state.user);
    const { inGame } = useSelector((state) => state.game);

    const getAppView = () => {
        if (!signedIn) {
            return <SignIn />;
        }

        if (!inGame) {
            return <GameLobby />;
        }

        return <GameView />;
    };

    return (
        <div className="App">
            {getAppView()}
        </div>
    );
};

export default App;
