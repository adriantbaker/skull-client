import React from 'react';
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
        return 'Waiting for the challenge loser to discard...';
    }
    if (pendingTargetDiscard) {
        return 'Waiting for the targeted player to discard...';
    }
    if (pendingActorExchange) {
        return 'Waiting for the player to exchange cards...';
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
