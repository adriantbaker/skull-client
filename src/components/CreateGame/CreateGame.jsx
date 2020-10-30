import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../basicComponents/Button/Button';
import Input from '../../basicComponents/Input/Input';
import { createGameRoom } from '../../store/game/gameActions';

const CreateGame = () => {
    const [gameName, setGameName] = useState('');
    const dispatch = useDispatch();

    const canCreate = () => {
        if (gameName === '') {
            return false;
        }
        return true;
    };

    return (
        <div>
            <Input
                transparent
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <Button
                label="CREATE"
                disabled={!canCreate()}
                onClick={() => dispatch(createGameRoom(gameName))}
            />
        </div>
    );
};

export default CreateGame;
