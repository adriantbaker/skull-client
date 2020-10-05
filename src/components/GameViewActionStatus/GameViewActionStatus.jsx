import React from 'react';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';

const GameViewActionStatus = ({ action, block }) => {
    if (!action) {
        return (
            <div>
                No move made yet
            </div>
        );
    }

    const { actingPlayerName, actionType } = action;

    if (!block) {
        return (
            <div>
                {actingPlayerName}
                {' '}
                did
                {' '}
                {actionType}
            </div>
        );
    }

    const {
        actingPlayerName: blockingPlayerName,
        actionType: blockActionType,
    } = block;

    return (
        <div>
            {actingPlayerName}
            {' '}
            did
            {' '}
            {actionType}
            , but
            {' '}
            {blockingPlayerName}
            {' '}
            did
            {' '}
            {blockActionType}
        </div>
    );
};

GameViewActionStatus.propTypes = {
    action: gameActionPropTypes,
    block: gameActionPropTypes,
};

GameViewActionStatus.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionStatus;
