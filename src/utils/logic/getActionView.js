export const actionViews = {
    CHOOSE: 'choose',
    WAIT: 'wait',
    EXCHANGE: 'exchange',
    DISCARD: 'discard',
    OUTCOME: 'outcome',
};

const getActionView = (mostRecentAction, playerId, isPlayerTurn, playerIsEliminated) => {
    if (!mostRecentAction) {
        // The player has not made an initial move yet
        if (isPlayerTurn) {
            return actionViews.CHOOSE;
        }
        // wait for some opponent to make initial move
        return actionViews.WAIT;
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

    if (pendingChallengeLoserDiscard) {
        const loserId = challengeSucceeded ? actingPlayerId : challengingPlayerId;
        const playerLost = playerId === loserId;

        if (playerLost) {
            // Player must discard due to losing a challenge
            return actionViews.DISCARD;
        }
        // Someone else must discard due to losing a challenge
        return actionViews.WAIT;
    }

    if (canChallenge || canBlock) {
        if (isPlayerAction) {
            // we are waiting for all opponents toaccept / challenge / block our move
            return actionViews.WAIT;
        }
        if (acceptedBy[playerId] || playerIsEliminated) {
            // we already accepted the action, waiting for others
            return actionViews.WAIT;
        }
        return actionViews.CHOOSE;
    }

    if (pendingTargetDiscard) {
        const playerWasTargeted = playerId === targetPlayerId;

        if (playerWasTargeted) {
            // Player must discard due to being effectively targeted
            return actionViews.DISCARD;
        }
        // Someone else must discard due to being effectively targeted
        return actionViews.WAIT;
    }

    if (pendingActorExchange) {
        const playerMustExchange = playerId === actingPlayerId;

        if (playerMustExchange) {
            // Player needs to choose cards to exchange
            return actionViews.EXCHANGE;
        }
        // Someone else needs to choose cards to exchange
        return actionViews.WAIT;
    }

    return actionViews.DONE;
};

export default getActionView;
