import React, { useState } from 'react';
import useGames from '../GameLobbyGameCards/useGames';

const CreateGame = () => {
    const [gameName, setGameName] = useState('');

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
                onClick={() => createGame(gameName, 'Bob')}
            >
                Create Game
            </button>
        </div>
    );
};

export default CreateGame;
