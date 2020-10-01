import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import GameViewOpponentsHUD from '../GameViewOpponentsHUD/GameViewOpponentsHUD';
import GameViewPlayerHUD from '../GameViewPlayerHUD/GameViewPlayerHUD';
import './GameViewBoard.css';

const GameViewBoard = () => {
    const { id: gameId, players } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

    const [currentTurn, setCurrentTurn] = useState(-1);

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
            setPlayerHand(value.playerHand);
            setOpponentHands(value.opponentHands);
            setCurrentTurn(value.currentTurn);
        });
    }, []);

    const playerTurn = playerHand.turnNumber;
    console.log(playerHand);
    console.log(opponentHands);

    return (
        <div className="GameViewBoard h-screen">
            <GameViewOpponentsHUD
                playerTurn={playerTurn}
                currentTurn={currentTurn}
                opponentHands={opponentHands}
            />
            <div>Center</div>
            <GameViewPlayerHUD
                currentTurn={currentTurn}
                playerHand={playerHand}
            />
        </div>
    );
};

export default GameViewBoard;
