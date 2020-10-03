import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import GameViewAction from '../GameViewAction/GameViewAction';
import GameViewOpponentsHUD from '../GameViewOpponentsHUD/GameViewOpponentsHUD';
import GameViewPlayerHUD from '../GameViewPlayerHUD/GameViewPlayerHUD';
import './GameViewBoard.css';
import useGame from './useGame';
import usePlayer from './usePlayer';

const GameViewBoard = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

    const { currentTurn, currentAction, currentBlock } = useGame();
    const { playerHand, opponentHands } = usePlayer();

    console.log(playerHand);
    console.log(opponentHands);
    console.log(currentTurn);
    console.log(currentAction);
    console.log(currentBlock);

    const playerTurn = playerHand.turnNumber;
    const isYourTurn = playerTurn === currentTurn;

    console.log(isYourTurn);

    useEffect(() => {
        // On component mount, signal that we need the initial game setup
        socket.emit('getGameSetup', { gameId, playerId });
        // The responses will be intercepted by useGame and usePlayer
    }, []);

    return (
        <div className="GameViewBoard h-screen">
            <GameViewOpponentsHUD
                playerTurn={playerTurn}
                currentTurn={currentTurn}
                opponentHands={opponentHands}
            />
            <GameViewAction
                playerId={playerId}
                isYourTurn={isYourTurn}
                currentAction={currentAction}
                currentBlock={currentBlock}
            />
            <GameViewPlayerHUD
                currentTurn={currentTurn}
                playerHand={playerHand}
            />
        </div>
    );
};

export default GameViewBoard;
