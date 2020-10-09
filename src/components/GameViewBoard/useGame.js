import { useEffect, useState } from 'react';
import socket from '../../utils/api/socket';

const initialTurn = {
    number: -1,
    playerId: '',
    playerName: '',
};

const useGame = () => {
    const [currentTurn, setCurrentTurn] = useState(initialTurn);
    const [currentAction, setCurrentAction] = useState();
    const [currentBlock, setCurrentBlock] = useState();

    useEffect(() => {
        // Listen for all game updates
        socket.on('gameUpdate', (update) => {
            const {
                currentTurn: updatedTurn,
                currentAction: updatedAction,
                currentBlock: updatedBlock,
            } = update;
            setCurrentTurn(updatedTurn);
            setCurrentAction(updatedAction);
            setCurrentBlock(updatedBlock);
        });
    }, []);

    return {
        currentTurn,
        currentAction,
        currentBlock,
    };
};

export default useGame;
