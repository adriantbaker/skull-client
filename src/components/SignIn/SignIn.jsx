import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../utils/history/history';
import Button from '../../basicComponents/Button/Button';
import Input from '../../basicComponents/Input/Input';
import { createUser } from '../../store/user/userActions';
import './SignIn.css';
import { joinGameRoom } from '../../store/game/gameActions';
import Header from '../../basicComponents/Header/Header';

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
                if (joiningFromLink && gameName) {
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

    //  className="bg-gradient-to-br from-orange-400 to-orange-200 h-screen">
    return (
        <div>
            <Header
                h="1"
                className="text-white py-12"
            >
                Skullduggery
            </Header>
            <div className="space-y-4">
                {getJoinMessage()}
                <div>
                    <Input
                        className="center-horiz"
                        // transparent
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                    />
                </div>
                <Button
                    label="JOIN"
                    onClick={handleSubmit}
                    disabled={username === ''}
                />
            </div>
            {/* </div> */}
            {/* </div> */}
        </div>
    );
};

export default SignIn;
