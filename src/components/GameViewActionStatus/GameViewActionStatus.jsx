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
    const statuses = [];

    if (!action) {
        return statuses;
    }

    statuses.push(getOneActionStatus(action, playerId));

    if (!block) {
        return statuses;
    }

    statuses.push(getOneActionStatus(block, playerId));

    return statuses;
};

const GameViewActionStatus = (props) => {
    const {
        action, block, won, winnerName, playerIsEliminated,
    } = props;

    const { id: playerId } = useSelector((state) => state.player);

    const statusStrings = getAllActionStatuses(action, block, playerId);

    return (
        <div>
            <div>{won ? `WON by ${winnerName}!` : null}</div>
            <div>{playerIsEliminated ? 'You have been eliminated.' : null}</div>
            {statusStrings.map((status) => (
                <div>{status}</div>
            ))}
        </div>
    );
};

GameViewActionStatus.propTypes = {
    action: gameActionPropTypes,
    block: gameActionPropTypes,
    won: PropTypes.bool.isRequired,
    // winnerId: PropTypes.bool.isRequired,
    winnerName: PropTypes.bool.isRequired,
    playerIsEliminated: PropTypes.bool.isRequired,
};

GameViewActionStatus.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionStatus;
