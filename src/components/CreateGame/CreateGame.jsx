import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGameRoom } from '../../store/game/gameActions';

const CreateGame = () => {
    const [gameName, setGameName] = useState('');
    const dispatch = useDispatch();

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
                onClick={() => dispatch(createGameRoom(gameName))}
            >
                Create Game
            </button>
        </div>
    );
};

export default CreateGame;
