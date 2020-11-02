import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import GameViewAction from '../GameViewAction/GameViewAction';
import GameViewOpponentsHUD from '../GameViewOpponentsHUD/GameViewOpponentsHUD';
import GameViewPlayerHUD from '../GameViewPlayerHUD/GameViewPlayerHUD';
import GameViewTurnSummary from '../GameViewTurnSummary/GameViewTurnSummary';
import useGame from './useGame';
import usePlayer from './usePlayer';

const GameViewBoard = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: userId } = useSelector((state) => state.user);

    const {
        currentTurn, won, winnerName, previousTurns,
    } = useGame();
    const { playerHand, opponentHands } = usePlayer();

    const { number: currentTurnNumber } = currentTurn;

    useEffect(() => {
        // On component mount, signal that we need the initial game setup
        socket.emit('getGameSetup', { gameId, playerId: userId });
        // The responses will be intercepted by useGame and usePlayer
    }, [gameId, userId]);

    return (
        <div className="flex flex-col justify-between h-screen bg-gradient-to-br from-orange-400 to-orange-200">
            <GameViewOpponentsHUD
                currentTurnNumber={currentTurnNumber}
                playerHand={playerHand}
                opponentHands={opponentHands}
            />
            <GameViewTurnSummary
                playerId={userId}
                turn={previousTurns[0]}
            />
            <GameViewAction
                opponentHands={opponentHands}
                currentTurn={currentTurn}
                playerHand={playerHand}
                won={won}
                winnerName={winnerName}
            />
            <GameViewPlayerHUD
                playerHand={playerHand}
            />
        </div>
    );
};

export default GameViewBoard;
