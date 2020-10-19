import React from 'react';
import getChallengeLoserName from '../../utils/logic/getChallengeLoserName';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';

const getWaitReason = (action) => {
    const {
        canChallenge,
        canBlock,
        pendingChallengeLoserDiscard,
        pendingActorExchange,
        pendingTargetDiscard,
    } = action;

    if (canChallenge && canBlock) {
        return 'Waiting for everyone to allow, challenge, or block...';
    }
    if (canChallenge) {
        return 'Waiting for everyone to allow or challenge...';
    }
    if (canBlock) {
        return 'Waiting for everyone to allow or block...';
    }
    if (pendingChallengeLoserDiscard) {
        const challengeLoserName = getChallengeLoserName(action);
        return `Waiting for ${challengeLoserName} to discard...`;
    }
    if (pendingTargetDiscard) {
        const { targetPlayerName } = action;
        return `Waiting for ${targetPlayerName} to discard...`;
    }
    if (pendingActorExchange) {
        const { actingPlayerName } = action;
        return `Waiting for ${actingPlayerName} to exchange cards...`;
    }
    return 'Not sure why we are waiting...';
};

const GameViewActionWait = ({ action, block }) => {
    if (!action) {
        return (
            <div>
                Waiting for
                {' '}
                Player
                {' '}
                to make the first move of the turn...
            </div>
        );
    }

    if (!block) {
        const waitReason = getWaitReason(action);
        return (
            <div>
                {waitReason}
            </div>
        );
    }

    const waitReason = getWaitReason(block);
    return (
        <div>
            {waitReason}
        </div>
    );
};

GameViewActionWait.propTypes = {
    action: gameActionPropTypes,
    block: gameActionPropTypes,
};

GameViewActionWait.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionWait;
