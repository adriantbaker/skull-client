import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/userActions';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                Username
            </div>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button
                type="button"
                onClick={() => { dispatch(setUser({ username })); }}
            >
                Set Username
            </button>
        </div>
    );
};

export default SignIn;
