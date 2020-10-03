import React from 'react';
import useGame from '../GameViewBoard/useGame';

const getMostRecentAction = (currentAction, currentBlock) => {
    if (currentBlock) return currentBlock;
    if (currentAction) return currentAction;
};

const GameViewAction = (props) => {
    const {
        playerId, isYourTurn, currentAction, currentBlock,
    } = props;
    const { tryAction, challengeAction, tryBlock } = useGame();

    // Determine the most recent action in this turn
    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);

    if (!mostRecentAction) {
        // The player has not made an initial move yet
        if (isYourTurn) {
            return (
                <div>
                    <div>Your Options:</div>
                    <button type="button">Take Income</button>
                    <button
                        type="button"
                        onClick={() => tryAction('foreignAid')}
                    >
                        Take Foreign Aid
                    </button>
                </div>
            );
        }
        // Else, is opponent's turn
        return (
            <div>Waiting for Player to make the first move of the turn...</div>
        );
    }

    const {
        id: actionId,
        isBlock,
        actionType,
        canChallenge,
        canBlock,
        isComplete,
        challenged,
        // actingPlayerId,
        actingPlayerName,
        challengeSucceeded,
        // targetPlayerId,
        targetPlayerName,
    } = mostRecentAction;

    const getView = () => {
        if (canChallenge || canBlock) {
            if (isYourTurn) {
                if (!isBlock) {
                    return (
                        <div>
                            Waiting for opponents to challenge / accept / block your move...
                        </div>
                    );
                }
                return (
                    <div>
                        <div>Someone is trying to block you! Your Options:</div>
                        <button
                            type="button"
                            onClick={() => challengeAction(actionId, isBlock)}
                        >
                            Challenge
                        </button>
                        <button
                            type="button"
                        >
                            Surrender
                        </button>
                    </div>
                );
            }
            // else is not your turn
            return (
                <div>
                    <div>
                        {actingPlayerName}
                        {' '}
                        is attempting to
                        {' '}
                        {actionType}
                        {targetPlayerName ? ` against ${targetPlayerName}` : null}
                    </div>
                    {targetPlayerName ? <div>Waiting for Target to respond...</div> : null}
                    <div>Your Options:</div>
                    {!canChallenge ? null : (
                        <button
                            type="button"
                            onClick={() => challengeAction(actionId, isBlock)}
                        >
                            Challenge
                        </button>
                    )}
                    {!canBlock ? null : (
                        <button
                            type="button"
                            onClick={() => tryBlock(actionId, 'blockForeignAid', 'captain')}
                        >
                            Block
                        </button>
                    )}
                    <button type="button">Allow</button>
                </div>
            );
        }
        if (challenged) {
            return (
                <div>
                    <div>
                        {isBlock ? 'Block' : 'Move'}
                        {' '}
                        was challenged.
                    </div>
                    <div>
                        {challengeSucceeded ? (
                            <div>
                                {actingPlayerName}
                                {' '}
                                lost &
                                {' '}
                                {targetPlayerName}
                                {' '}
                                won!
                            </div>
                        ) : (
                            <div>
                                {actingPlayerName}
                                {' '}
                                won &
                                {' '}
                                {targetPlayerName}
                                {' '}
                                lost!
                            </div>
                        )}

                    </div>
                </div>
            );
        }

        if (isComplete) {
            return (
                <div>Turn is complete</div>
            );
        }

        return (
            <div>
                Waiting for TurnPlayer to make a move...
            </div>
        );
    };

    return (
        <div>
            {getView()}
        </div>
    );
};

export default GameViewAction;
