import React from 'react';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';

const App = () => (
    <div className="App">
        {/* <SignIn /> */}
        {/* <GameLobby /> */}
        <GameView />
    </div>
);

export default App;
