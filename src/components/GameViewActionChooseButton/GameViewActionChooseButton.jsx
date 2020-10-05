import React from 'react';
import PropTypes from 'prop-types';
import useGame from '../GameViewBoard/useGame';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';
import Button from '../../basicComponents/Button/Button';
import formatActionType from '../../utils/formatting/formatActionType';

const GameViewActionChooseButton = (props) => {
    const {
        choice, actionId, actionIsBlock, numCoins,
    } = props;
    const {
        type, isBlock: choiceIsBlock, claimedCard, cost = 0,
    } = choice;

    const {
        tryAction, tryBlock, acceptAction, challengeAction,
    } = useGame();

    const canAfford = numCoins >= cost;

    const handleClick = () => {
        if (type === 'accept') {
            acceptAction(actionId, actionIsBlock);
        } else if (type === 'challenge') {
            challengeAction(actionId, actionIsBlock);
        } else if (choiceIsBlock) {
            tryBlock(actionId, type, claimedCard);
        } else {
            tryAction(type, claimedCard);
        }
    };

    return (
        <div>
            <Button
                label={formatActionType(type)}
                onClick={handleClick}
                disabled={!canAfford}
            />
        </div>
    );
};

GameViewActionChooseButton.propTypes = {
    choice: PropTypes.shape(actionChoicePropTypes).isRequired,
    actionId: PropTypes.string,
    actionIsBlock: PropTypes.bool,
    numCoins: PropTypes.number.isRequired,
};

GameViewActionChooseButton.defaultProps = {
    actionId: undefined,
    actionIsBlock: false,
};

export default GameViewActionChooseButton;
