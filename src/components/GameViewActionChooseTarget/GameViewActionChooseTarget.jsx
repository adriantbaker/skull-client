import React from 'react';
import PropTypes from 'prop-types';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import Button from '../../basicComponents/Button/Button';
import useActions from '../GameViewBoard/useActions';

const opponentIsInGame = (opponent) => opponent.numCards > 0;

const GameViewActionChooseTarget = (props) => {
    const { pendingChoice, opponentHands } = props;
    const { type, claimedCard } = pendingChoice;
    const { tryAction } = useActions();

    const validOpponents = opponentHands.filter((opponent) => opponentIsInGame(opponent));

    const handleClick = (targetId) => () => {
        tryAction(type, claimedCard, targetId);
    };

    return (
        <div>
            Choose Your Target:
            {validOpponents.map((opponent) => {
                const { name, id } = opponent;

                return (
                    <Button
                        label={name}
                        onClick={handleClick(id)}
                    />
                );
            })}
        </div>
    );
};

GameViewActionChooseTarget.propTypes = {
    pendingChoice: PropTypes.shape(actionChoicePropTypes).isRequired,
    opponentHands: opponentHandsPropTypes.isRequired,
};

export default GameViewActionChooseTarget;
