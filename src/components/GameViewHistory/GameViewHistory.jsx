import React from 'react';
import PropTypes from 'prop-types';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';

const GameViewHistory = (props) => {
    const { previousTurns } = props;

    if (previousTurns.length === 0) {
        return null;
    }

    const mostRecentTurn = previousTurns[0];

    return (
        <div>
            Last Turn was Turn
            {' '}
            {mostRecentTurn.id}
        </div>
    );
};

GameViewHistory.propTypes = {
    previousTurns: PropTypes.arrayOf(gameTurnPropTypes).isRequired,
};

export default GameViewHistory;
