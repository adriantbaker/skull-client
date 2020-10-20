import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';
import formatActionTypeChosen from '../../utils/formatting/formatActionTypeChosen';

const getOneActionStatus = (action, playerId) => {
    const {
        actingPlayerName, actingPlayerId, actionType, challenged, claimedCard, targetPlayerId, targetPlayerName,
    } = action;

    const actorNameDisplay = actingPlayerId === playerId ? 'You' : actingPlayerName;
    const targetNameDisplay = targetPlayerId === playerId ? 'you' : targetPlayerName;
    const actionTypeChosen = formatActionTypeChosen(actionType, claimedCard, targetNameDisplay);

    let str = `${actorNameDisplay} chose ${actionTypeChosen}.`;
    if (challenged) {
        const { challengeSucceeded, challengingPlayerId, challengingPlayerName } = action;

        const challengerNameDisplay = challengingPlayerId === playerId ? 'You' : challengingPlayerName;

        str += ` ${challengerNameDisplay} challenged the action`;
        if (challengeSucceeded) {
            str += ' and won!';
        } else {
            str += ' and lost.';
        }
    }
    return str;
};

const getAllActionStatuses = (action, block, playerId) => {
    if (!action) {
        return null;
    }

    const actionStr = getOneActionStatus(action, playerId);

    if (!block) {
        return actionStr;
    }

    const blockStr = getOneActionStatus(block, playerId);

    return `${actionStr} ${blockStr}`;
};

const GameViewActionStatus = (props) => {
    const {
        action, block, won, winnerId, playerIsEliminated,
    } = props;

    const { id: playerId } = useSelector((state) => state.player);

    const str = getAllActionStatuses(action, block, playerId);

    return (
        <div>
            {won ? `WON by ${winnerId}!` : null}
            {playerIsEliminated ? 'You have been eliminated.' : null}
            {str}
        </div>
    );
};

GameViewActionStatus.propTypes = {
    action: gameActionPropTypes,
    block: gameActionPropTypes,
    won: PropTypes.bool.isRequired,
    winnerId: PropTypes.bool.isRequired,
    playerIsEliminated: PropTypes.bool.isRequired,
};

GameViewActionStatus.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionStatus;
