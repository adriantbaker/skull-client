import React from 'react';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';

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
        return (
            <div>
                Waiting for action to be blocked / challenged / accepted...
            </div>
        );
    }

    return (
        <div>
            Waiting for block to be challenged / accepted...
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
