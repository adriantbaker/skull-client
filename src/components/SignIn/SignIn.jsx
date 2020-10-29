import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../utils/history/history';
import Button from '../../basicComponents/Button/Button';
import Input from '../../basicComponents/Input/Input';
import { createUser } from '../../store/user/userActions';
import './SignIn.css';
import { joinGameRoom } from '../../store/game/gameActions';

const SignIn = () => {
    const {
        id: gameId, name: gameName, joiningFromLink, joinGameNotFound,
    } = useSelector((state) => state.game);

    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => setUsername(e.target.value);
    const handleSubmit = () => {
        dispatch(createUser(username))
            .then(() => {
                if (joiningFromLink) {
                    dispatch(joinGameRoom(gameId));
                } else {
                    history.push('/lobby');
                }
            });
    };

    const getJoinMessage = () => {
        if (!joiningFromLink) {
            return null;
        }
        let joinMessage = '';
        if (joinGameNotFound) {
            joinMessage = 'Sorry, the game you are trying to join no longer exists.';
        } else if (gameName) {
            joinMessage = `You are joining ${gameName}`;
        } else {
            joinMessage = 'You are joining...';
        }
        return <div>{joinMessage}</div>;
    };

    return (
        <div className="bg-gradient-to-br from-orange-400 to-orange-200 h-screen">
            <h1
                className="text-white text-4xl font-bold py-12"
            >
                Skullduggery
            </h1>
            <div className="bg-white rounded-lg w-1/2 h-64 shadow-lg center-horiz">
                <div className="center-hv-parent h-full">
                    <div className="center-hv-child">
                        {getJoinMessage()}
                        <Input
                            value={username}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        <Button
                            label="JOIN"
                            onClick={handleSubmit}
                            disabled={username === ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
