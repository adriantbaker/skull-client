import React from 'react';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';

const App = () => (
    <div className="App">
        <SignIn />
        <GameLobby />
    </div>
);

export default App;
