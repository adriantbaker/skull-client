import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../basicComponents/Button/Button';
import Input from '../../basicComponents/Input/Input';
import { setUser } from '../../store/user/userActions';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => setUsername(e.target.value);
    const handleSubmit = () => dispatch(setUser(username));

    return (
        <div className="bg-gradient-to-br from-orange-400 to-orange-200 h-screen">
            <div
                className="text-white text-4xl font-bold py-12"
            >
                Skullduggery
            </div>
            <div className="bg-white rounded-lg w-1/2 h-64 shadow-lg center-horiz">
                <div className="center-hv-parent h-full">
                    <div className="center-hv-child">
                        <Input
                            label="Username"
                            value={username}
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
