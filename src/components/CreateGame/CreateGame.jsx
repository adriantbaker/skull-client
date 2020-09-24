import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useGames from '../GameLobbyGameCards/useGames';

const CreateGame = () => {
    const [gameName, setGameName] = useState('');
    const username = useSelector((state) => state.user.username);
    const { createGame } = useGames();

    return (
        <div>
            <div>
                Game Name is
                {' '}
                {gameName}
            </div>
            <input
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <button
                type="button"
                onClick={() => createGame(gameName, username)}
            >
                Create Game
            </button>
        </div>
    );
};

export default CreateGame;
