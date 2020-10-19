import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import GameLobby from '../GameLobby/GameLobby';
import SignIn from '../SignIn/SignIn';
import GameView from '../GameView/GameView';
import useWindowWidth from './useWindowWidth';

// import Header from '../Header/Header';

const App = () => {
    const { signedIn } = useSelector((state) => state.user);
    const { inGame } = useSelector((state) => state.game);

    useWindowWidth(50); // Hook that updates screenSize in Redux

    // const getHeader = () => {
    //     if (!signedIn) {
    //         return null;
    //     }
    //     return <Header />;
    // };

    // const getAppViewClassName = () => {
    //     if (!signedIn) {
    //         return null;
    //     }
    //     // Need a top margin to offset the fixed header
    //     return 'header-offset';
    // };

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
            {/* {getHeader()} */}
            {/* className={getAppViewClassName()} */}
            <div>
                {getAppView()}
            </div>
        </div>
    );
};

export default App;
