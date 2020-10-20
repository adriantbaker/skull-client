import React from 'react';
import PropTypes from 'prop-types';
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

const GameViewActionWait = (props) => {
    const { action, block, currentPlayerName } = props;

    if (!action) {
        return (
            <div>
                {`Waiting for ${currentPlayerName} to make a move...`}
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
    currentPlayerName: PropTypes.string.isRequired,
};

GameViewActionWait.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionWait;
