import React from 'react';
import GameViewActionChoose from '../GameViewActionChoose/GameViewActionChoose';
import GameViewActionStatus from '../GameViewActionStatus/GameViewActionStatus';
import GameViewActionOutcome from '../GameViewActionOutcome/GameViewActionOutcome';
import GameViewActionWait from '../GameViewActionWait/GameViewActionWait';

const views = {
    CHOOSE: 'choose',
    WAIT: 'wait',
    OUTCOME: 'outcome',
};

const getMostRecentAction = (currentAction, currentBlock) => {
    if (currentBlock) return currentBlock;
    if (currentAction) return currentAction;
    return undefined;
};

const getView = (mostRecentAction, playerId, isPlayerTurn) => {
    if (!mostRecentAction) {
        // The player has not made an initial move yet
        if (isPlayerTurn) {
            console.log(1);
            return views.CHOOSE;
        }
        // wait for some opponent to make initial move
        console.log(2);
        return views.WAIT;
    }

    const {
        actingPlayerId, canChallenge, canBlock, acceptedBy,
    } = mostRecentAction;

    const isPlayerAction = actingPlayerId === playerId;

    if (canChallenge || canBlock) {
        if (isPlayerAction) {
            console.log(3);
            // we are waiting for all opponents toaccept / challenge / block our move
            return views.WAIT;
        }
        if (acceptedBy[playerId]) {
            console.log(4);
            // we already accepted the action, waiting for others
            return views.WAIT;
        }
        console.log(5);
        return views.CHOOSE;
    }
    console.log('@@@@@@@');
    console.log(6);
    return views.DONE;
};

const GameViewAction = (props) => {
    const {
        playerId, isPlayerTurn, currentAction, currentBlock,
    } = props;

    // Determine the most recent action in this turn
    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);

    console.log(currentAction);
    console.log(currentBlock);

    const getViewComponent = () => {
        const view = getView(mostRecentAction, playerId, isPlayerTurn);
        switch (view) {
            case views.CHOOSE:
                return (
                    <GameViewActionChoose
                        mostRecentAction={mostRecentAction}
                    />
                );
            case views.WAIT:
                return (
                    <GameViewActionWait
                        action={currentAction}
                        block={currentBlock}
                    />
                );
            case views.OUTCOME:
            default:
                return (
                    <GameViewActionOutcome
                        action={currentAction}
                        block={currentBlock}
                    />
                );
        }
    };

    return (
        <div>
            <GameViewActionStatus
                action={currentAction}
                block={currentBlock}
            />
            {getViewComponent()}
        </div>
    );
};

export default GameViewAction;
