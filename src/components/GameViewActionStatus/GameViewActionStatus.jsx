import React from 'react';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';

const getOneActionStatus = (action) => {
    const { actingPlayerName, actionType, challenged } = action;
    let str = `${actingPlayerName} did ${actionType}.`;
    if (challenged) {
        const { challengeSucceeded, challengingPlayerId } = action;
        str += ` ${challengingPlayerId} challenged the action`;
        if (challengeSucceeded) {
            str += ' and won!';
        } else {
            str += ' and lost.';
        }
    }
    return str;
};

const getAllActionStatuses = (action, block) => {
    if (!action) {
        return 'No move made yet.';
    }

    const actionStr = getOneActionStatus(action);

    if (!block) {
        return actionStr;
    }

    const blockStr = getOneActionStatus(block);

    return `${actionStr} ${blockStr}`;
};

const GameViewActionStatus = ({ action, block }) => {
    const str = getAllActionStatuses(action, block);

    return (
        <div>
            {str}
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
