import React from 'react';
import PropTypes from 'prop-types';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import Button from '../../basicComponents/Button/Button';
import useActions from '../GameViewBoard/useActions';

const GameViewActionChooseTarget = (props) => {
    const { pendingChoice, opponentsInGame } = props;
    const { type, claimedCard } = pendingChoice;
    const { tryAction } = useActions();

    const handleClick = (targetId) => {
        tryAction(type, claimedCard, targetId);
    };

    return (
        <div>
            Choose Your Target:
            {opponentsInGame.map((opponent) => {
                const { name, id } = opponent;

                return (
                    <Button
                        label={name}
                        onClick={() => handleClick(id)}
                    />
                );
            })}
        </div>
    );
};

GameViewActionChooseTarget.propTypes = {
    pendingChoice: PropTypes.shape(actionChoicePropTypes).isRequired,
    opponentsInGame: opponentHandsPropTypes.isRequired,
};

export default GameViewActionChooseTarget;
