const playerMustDiscard = (playerId, mostRecentAction) => {
    if (!mostRecentAction) {
        return false;
    }

    const {
        actingPlayerId,
        challengingPlayerId,
        challengeSucceeded,
        targetPlayerId,
        pendingChallengeLoserDiscard,
        pendingTargetDiscard,
    } = mostRecentAction;

    if (pendingChallengeLoserDiscard) {
        if (challengeSucceeded) {
            return actingPlayerId === playerId;
        }
        return challengingPlayerId === playerId;
    }

    if (pendingTargetDiscard) {
        return targetPlayerId === playerId;
    }

    return false;
};

export default playerMustDiscard;
