import { actionTypes } from '../propTypes/gameActionPropTypes';
import isAcceptedByAll from './isAcceptedByAll';

const playerMustDiscard = (playerId, mostRecentAction) => {
    if (!mostRecentAction) {
        return false;
    }

    const { actionType, targetPlayerId } = mostRecentAction;

    if (actionType === actionTypes.COUP) {
        // No one can challenge / block a coup
        return playerId === targetPlayerId;
    }

    const { challenged, acceptedBy } = mostRecentAction;
    const acceptedByAll = isAcceptedByAll(acceptedBy);

    if (!acceptedByAll && !challenged) {
        // Still waiting for other players to decide (accept or challenge)
        // Unless it's an action that require a decision (coup)
        return false;
    }

    const {
        actingPlayerId,
        challengingPlayerId,
        challengeSucceeded,
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
