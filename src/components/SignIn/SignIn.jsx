import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/userActions';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    return (
        <div className="bg-gradient-to-br from-orange-400 to-orange-200 h-screen center-hv-parent">
            <div
                className="text-white text-4xl font-bold center-hv-child-top"
            >
                Skullduggery
            </div>
            <div className="bg-white rounded-lg w-1/2 center-hv-child h-64 shadow-lg">
                <div className="center-hv-parent h-full">
                    <div className="center-hv-child">

                        <div>
                            <label className="font-bold mb-2 text-sm">
                                Username
                            </label>
                            <input
                                className="border-b-2 focus:bg-orange-400 mb-8
                    border-orange-600 p-1 outline-none bg-gradient-to-r from-white to-gray-100"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="bg-orange-600 rounded-full px-4 py-2 text-white
                        hover:bg-orange-500 transition duration-100"
                                type="button"
                                onClick={() => { dispatch(setUser(username)); }}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
