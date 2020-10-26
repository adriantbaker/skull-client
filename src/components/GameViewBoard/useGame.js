import { useEffect, useState } from 'react';
import socket from '../../utils/api/socket';

const initialTurn = {
    id: -1,
    number: -1,
    playerId: '',
    playerName: '',
};

const initialGame = {
    currentTurn: initialTurn,
    currentAction: undefined,
    currentBlock: undefined,
    pastBlocks: [],
    won: false,
    winnerId: '',
    winnerName: '',
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
                pastBlocks,
                won,
                winnerId,
                winnerName,
            } = update;

            setGame({
                currentTurn,
                currentAction,
                currentBlock,
                pastBlocks,
                won,
                winnerId,
                winnerName,
            });
        });
    }, []);

    return {
        currentTurn: game.currentTurn,
        currentAction: game.currentAction,
        currentBlock: game.currentBlock,
        pastBlocks: game.pastBlocks,
        won: game.won,
        winnerId: game.winnerId,
        winnerName: game.winnerName,
    };
};

export default useGame;
