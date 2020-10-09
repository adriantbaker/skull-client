import React from 'react';
import GameViewActionChoose from '../GameViewActionChoose/GameViewActionChoose';
import GameViewActionStatus from '../GameViewActionStatus/GameViewActionStatus';
import GameViewActionOutcome from '../GameViewActionOutcome/GameViewActionOutcome';
import GameViewActionWait from '../GameViewActionWait/GameViewActionWait';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import getMostRecentAction from '../../utils/logic/getMostRecentAction';

const views = {
    CHOOSE: 'choose',
    WAIT: 'wait',
    EXCHANGE: 'exchange',
    DISCARD: 'discard',
    OUTCOME: 'outcome',
};

const getView = (mostRecentAction, playerId, isPlayerTurn) => {
    if (!mostRecentAction) {
        // The player has not made an initial move yet
        if (isPlayerTurn) {
            return views.CHOOSE;
        }
        // wait for some opponent to make initial move
        return views.WAIT;
    }

    const {
        actingPlayerId,
        targetPlayerId,
        challengingPlayerId,
        canChallenge,
        challengeSucceeded,
        canBlock,
        acceptedBy,
        pendingChallengeLoserDiscard,
        pendingActorExchange,
        pendingTargetDiscard,
    } = mostRecentAction;

    const isPlayerAction = actingPlayerId === playerId;

    if (canChallenge || canBlock) {
        if (isPlayerAction) {
            // we are waiting for all opponents toaccept / challenge / block our move
            return views.WAIT;
        }
        if (acceptedBy[playerId]) {
            // we already accepted the action, waiting for others
            return views.WAIT;
        }
        return views.CHOOSE;
    }

    if (pendingChallengeLoserDiscard) {
        const loserId = challengeSucceeded ? actingPlayerId : challengingPlayerId;
        const playerLost = playerId === loserId;

        if (playerLost) {
            // Player must discard due to losing a challenge
            return views.DISCARD;
        }
        // Someone else must discard due to losing a challenge
        return views.WAIT;
    }

    if (pendingTargetDiscard) {
        const playerWasTargeted = playerId === targetPlayerId;

        if (playerWasTargeted) {
            // Player must discard due to being effectively targeted
            return views.DISCARD;
        }
        // Someone else must discard due to being effectively targeted
        return views.WAIT;
    }

    if (pendingActorExchange) {
        const playerMustExchange = playerId === actingPlayerId;

        if (playerMustExchange) {
            // Player needs to choose cards to exchange
            return views.EXCHANGE;
        }
        // Someone else needs to choose cards to exchange
        return views.WAIT;
    }

    return views.DONE;
};

const GameViewAction = (props) => {
    const {
        playerHand, currentTurn, currentAction, currentBlock,
    } = props;

    console.log(playerHand);

    const { id: playerId, numCoins } = playerHand;
    const { playerId: currentPlayerId } = currentTurn;

    const isPlayerTurn = playerId === currentPlayerId;

    // Determine the most recent action in this turn
    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);

    const getViewComponent = () => {
        const view = getView(mostRecentAction, playerId, isPlayerTurn);
        switch (view) {
            case views.CHOOSE:
                return (
                    <GameViewActionChoose
                        mostRecentAction={mostRecentAction}
                        numCoins={numCoins}
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
                return (
                    <GameViewActionOutcome
                        action={currentAction}
                        block={currentBlock}
                    />
                );
            case views.DISCARD:
                return <div>You must discard!</div>;
            case views.EXCHANGE:
                return <div>You must exchange!</div>;
            default:
                return <div>?????</div>;
        }
    };

    return (
        <div className="flex-grow">
            <GameViewActionStatus
                action={currentAction}
                block={currentBlock}
            />
            {getViewComponent()}
        </div>
    );
};

GameViewAction.propTypes = {
    playerHand: playerHandPropTypes.isRequired,
    currentTurn: gameTurnPropTypes.isRequired,
    currentAction: gameActionPropTypes,
    currentBlock: gameActionPropTypes,
};

GameViewAction.defaultProps = {
    currentAction: undefined,
    currentBlock: undefined,
};

export default GameViewAction;
