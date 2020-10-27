import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../utils/history/history';
import Button from '../../basicComponents/Button/Button';
import Input from '../../basicComponents/Input/Input';
import { createUser } from '../../store/user/userActions';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => setUsername(e.target.value);
    const handleSubmit = () => {
        dispatch(createUser(username))
            .then(() => {
                history.push('/lobby');
            });
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
                        <Input
                            value={username}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        <Button
                            label="SIGN IN"
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
