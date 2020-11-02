import { actionTypes } from '../propTypes/gameActionPropTypes';
import formatActionTypeChosen from './formatActionTypeChosen';

const getFinalDiscard = (actionType, targetName) => {
    switch (actionType) {
        case actionTypes.COUP:
        case actionTypes.ASSASSINATE:
            return `${targetName} discarded.`;
        default:
            return undefined;
    }
};

const actionOrBlockIsPending = (actionOrBlock) => {
    const {
        pendingChallengeLoserDiscard,
        pendingTargetDiscard,
        pendingActorExchange,
        canChallenge,
        canBlock,
    } = actionOrBlock;

    return pendingChallengeLoserDiscard || pendingTargetDiscard || pendingActorExchange || canChallenge || canBlock;
};

const actionOrBlockFailed = (actionOrBlock) => {
    const { challenged, challengeSucceeded } = actionOrBlock;
    if (!challenged) {
        return false;
    }
    if (challenged && !challengeSucceeded) {
        return false;
    }
    return true;
};

const formatTurnSummary = (action, allBlocks, playerId) => {
    if (!action) return [];

    const actionAndAllBlocks = [action].concat(allBlocks);

    const actionSummaries = [];

    let finalDiscard;

    actionAndAllBlocks.forEach((actionOrBlock) => {
        const {
            isBlock,
            actionType,
            claimedCard,
            actingPlayerId: actorId,
            actingPlayerName: actorName,
            targetPlayerId: targetId,
            targetPlayerName: targetName,
            challenged,
            challengingPlayerId: challengerId,
            challengingPlayerName: challengerName,
            challengeSucceeded,
            pendingChallengeLoserDiscard,

        } = actionOrBlock;

        const youAreActor = playerId === actorId;
        const youAreTarget = playerId === targetId;
        const youAreChallenger = playerId === challengerId;

        const actorDisplay = youAreActor ? 'You' : actorName;
        const [targetDisplay, targetDisplayLower] = youAreTarget ? ['You', 'you'] : [targetName, targetName];
        const [challengerDisplay, challengerDisplayLower] = youAreChallenger ? ['You', 'you'] : [challengerName, challengerName];

        const actionStr = `${actorDisplay} chose ${formatActionTypeChosen(actionType, claimedCard, targetDisplayLower)}.`;

        const summary = {
            actionStr,
            challengeStr: undefined,
        };

        if (challenged) {
            if (pendingChallengeLoserDiscard) {
                summary.challengeStr = `${challengerDisplay} challenged and ${challengeSucceeded ? `won${youAreActor ? '.' : '!'}` : 'lost.'}`;
            } else if (challengeSucceeded) {
                summary.challengeStr = `${actorDisplay} discarded after a challenge by ${challengerDisplayLower}.`;
            } else {
                summary.challengeStr = `${challengerDisplay} discarded after a failed challenge.`;
            }
        }

        if (!isBlock) {
            const actionPending = actionOrBlockIsPending(action);
            const actionFailed = actionOrBlockFailed(action);
            const allBlocksFailed = allBlocks.every((block) => actionOrBlockFailed(block));
            const blockPending = allBlocks.some((block) => actionOrBlockIsPending(block));
            const actionSucceeded = !actionPending && !blockPending && !actionFailed && allBlocksFailed;
            if (actionSucceeded) {
                finalDiscard = getFinalDiscard(actionType, targetDisplay);
            }
        }

        actionSummaries.push(summary);
    });

    if (finalDiscard) {
        actionSummaries.push({
            actionStr: finalDiscard,
            challengeStr: undefined,
        });
    }

    return actionSummaries;
};

export default formatTurnSummary;
