import { useEffect, useRef, useState } from 'react';
import socket from '../../utils/api/socket';

const initialTurn = {
    id: -1,
    number: -1,
    playerId: '',
    playerName: '',
    action: undefined,
    block: undefined,
    pastBlocks: [],
};

const initialGame = {
    currentTurn: initialTurn,
    won: false,
    winnerId: '',
    winnerName: '',
};

const useGame = () => {
    const [game, setGame] = useState(initialGame);
    const [previousTurns, setPreviousTurns] = useState([]);

    const previousTurnsRef = useRef(previousTurns);

    const addPreviousTurn = (previousTurn) => {
        const newPreviousTurns = [previousTurn].concat(previousTurnsRef.current);
        setPreviousTurns(newPreviousTurns);
        previousTurnsRef.current = newPreviousTurns;
    };

    useEffect(() => {
        // Listen for all game updates
        socket.on('gameUpdate', (update) => {
            const {
                currentTurn,
                won,
                winnerId,
                winnerName,
                previousTurn,
            } = update;

            setGame({
                currentTurn,
                won,
                winnerId,
                winnerName,
            });

            if (previousTurn !== undefined) {
                addPreviousTurn(previousTurn);
            }
        });
    }, []);

    return {
        currentTurn: game.currentTurn,
        won: game.won,
        winnerId: game.winnerId,
        winnerName: game.winnerName,
        previousTurns,
    };
};

export default useGame;
