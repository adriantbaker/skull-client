import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import getMostRecentAction from '../../utils/logic/getMostRecentAction';
import playerMustDiscard from '../../utils/logic/playerMustDiscard';
import GameViewAction from '../GameViewAction/GameViewAction';
import GameViewOpponentsHUD from '../GameViewOpponentsHUD/GameViewOpponentsHUD';
import GameViewPlayerHUD from '../GameViewPlayerHUD/GameViewPlayerHUD';
import useGame from './useGame';
import usePlayer from './usePlayer';

const GameViewBoard = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

    const {
        currentTurn, currentAction, currentBlock,
    } = useGame();
    const { playerHand, opponentHands } = usePlayer();

    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);
    const mustDiscard = playerMustDiscard(playerId, mostRecentAction);

    useEffect(() => {
        // On component mount, signal that we need the initial game setup
        socket.emit('getGameSetup', { gameId, playerId });
        // The responses will be intercepted by useGame and usePlayer
    }, []);

    return (
        <div className="flex flex-col justify-between h-screen">
            <GameViewOpponentsHUD
                currentTurn={currentTurn}
                playerHand={playerHand}
                opponentHands={opponentHands}
            />
            <GameViewAction
                opponentHands={opponentHands}
                currentTurn={currentTurn}
                playerHand={playerHand}
                currentAction={currentAction}
                currentBlock={currentBlock}
            />
            <GameViewPlayerHUD
                currentTurn={currentTurn}
                playerHand={playerHand}
                mustDiscard={mustDiscard}
            />
        </div>
    );
};

export default GameViewBoard;
