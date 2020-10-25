import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';

const initialPlayerHand = {
    cards: [],
    deadCards: [],
    id: '',
    isOwner: false,
    name: '',
    numCoins: 0,
    turnNumber: -99,
};

const getInitialOpponentHand = (player) => ({
    id: player.id,
    name: player.name,
    numCards: 0,
    numCoins: 0,
    deadCards: [],
});

const usePlayer = () => {
    const {
        // id: gameId,
        players,
    } = useSelector((state) => state.game);
    // const { id: playerId } = useSelector((state) => state.player);

    const [playerHand, setPlayerHand] = useState(initialPlayerHand);

    const [opponentHands, setOpponentHands] = useState(
        players.map((player) => getInitialOpponentHand(player)),
    );

    useEffect(() => {
        // Listen for all player updates
        socket.on('playerUpdate', (update) => {
            const {
                playerHand: updatedPlayerHand,
                opponentHands: updatedOpponentHands,
            } = update;
            if (updatedPlayerHand !== null) setPlayerHand(updatedPlayerHand);
            if (updatedOpponentHands !== null) setOpponentHands(updatedOpponentHands);
        });
    }, []);

    return { playerHand, opponentHands };
};

export default usePlayer;
