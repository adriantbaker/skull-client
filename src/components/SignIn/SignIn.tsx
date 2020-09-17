import React, { useState } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('');

    return (
        <div>
            <div>
                Username is
                {' '}
                {username}
            </div>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    );
};

export default SignIn;
