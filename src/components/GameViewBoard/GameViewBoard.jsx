import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';

const GameViewBoard = () => {
    const { id: gameId, players } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

    const [playerHand, setPlayerHand] = useState({
        cards: [],
        numCoins: 0,
    });

    const [opponentHands, setOpponentHands] = useState(
        players.map((player) => ({
            id: player.id,
            name: player.name,
            numCards: 0,
            numCoins: 0,
        })),
    );

    useEffect(() => {
        // On component mount, request initial game setup
        socket.emit('getFirstHands', { gameId, playerId });
        socket.on('getFirstHandsResponse', (value) => {
            console.log(value);
            setPlayerHand(value.playerHand);
            setOpponentHands(value.opponentHands);
        });
    }, []);

    return (
        <div>
            <div>Game is in progress!</div>
            <div>Your Cards:</div>
            {playerHand.cards.map((card) => (
                card.type
            ))}
            <div>Your Opponents:</div>
            {opponentHands.map((opponent) => (
                <div>
                    <div>{opponent.name}</div>
                    <div>
                        {opponent.numCards}
                        {' '}
                        Cards
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameViewBoard;
