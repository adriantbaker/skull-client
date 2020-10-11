import { useEffect, useState } from 'react';
import socket from '../../utils/api/socket';

const initialTurn = {
    number: -1,
    playerId: '',
    playerName: '',
};

const initialGame = {
    currentTurn: initialTurn,
    currentAction: undefined,
    currentBlock: undefined,
    won: false,
    winnerId: '',
};

const useGame = () => {
    const [game, setGame] = useState(initialGame);

    useEffect(() => {
        // Listen for all game updates
        socket.on('gameUpdate', (update) => {
            const {
                currentTurn,
                currentAction,
                currentBlock,
                won,
                winnerId,
            } = update;

            setGame({
                currentTurn,
                currentAction,
                currentBlock,
                won,
                winnerId,
            });
        });
    }, []);

    return {
        currentTurn: game.currentTurn,
        currentAction: game.currentAction,
        currentBlock: game.currentBlock,
        won: game.won,
        winnerId: game.winnerId,
    };
};

export default useGame;
