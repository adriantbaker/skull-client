import React from 'react';
import GameViewActionChoose from '../GameViewActionChoose/GameViewActionChoose';
import GameViewActionStatus from '../GameViewActionStatus/GameViewActionStatus';
import GameViewActionWait from '../GameViewActionWait/GameViewActionWait';
import useGame from '../GameViewBoard/useGame';

const getMostRecentAction = (currentAction, currentBlock) => {
    if (currentBlock) return currentBlock;
    if (currentAction) return currentAction;
    return undefined;
};

const GameViewAction = (props) => {
    const {
        playerId, isPlayerTurn, currentAction, currentBlock,
    } = props;
    const {
        challengeAction, acceptAction, tryBlock,
    } = useGame();

    // Determine the most recent action in this turn
    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);

    if (!mostRecentAction) {
        // The player has not made an initial move yet
        if (isPlayerTurn) {
            return <GameViewActionChoose />;
        }
        // Else, is opponent's turn
        return <GameViewActionWait />;
    }

    const {
        canChallenge,
        canBlock,
        actingPlayerId,
    } = mostRecentAction;

    const getView = () => {
        if (canChallenge || canBlock) {
            // The action / block is waiting on other players before resolution
            if (actingPlayerId === playerId) {
                // The action / block was done by the current player; we need to wait
                return (
                    <GameViewActionWait
                        action={currentAction}
                        block={currentBlock}
                    />
                );
            }

            console.log('Can challenge / block and not my turn');

            return (
                <GameViewActionChoose
                    mostRecentAction={mostRecentAction}
                />
            );
        }
        // It's no longer able to challenge / block the action
    };

    return (
        <div>
            <GameViewActionStatus
                action={currentAction}
                block={currentBlock}
            />
            {getView()}
        </div>
    );
};

export default GameViewAction;
