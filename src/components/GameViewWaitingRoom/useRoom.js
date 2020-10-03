import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame } from '../../store/game/gameActions';
import socket from '../../utils/api/socket';

const useRoom = () => {
    const game = useSelector((state) => state.game);
    const dispatch = useDispatch();

    // Listen for updates to the game
    useEffect(() => {
        socket.on('updateRoom', (value) => {
            console.log('Got Game update:');
            console.log(value);
            dispatch(updateGame(value));
        });
    }, []);

    return { game };
};

export default useRoom;
