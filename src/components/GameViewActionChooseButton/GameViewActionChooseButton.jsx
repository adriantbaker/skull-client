import React from 'react';
import PropTypes from 'prop-types';
import useGame from '../GameViewBoard/useGame';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';

const GameViewActionChooseButton = ({ choice, actionId, actionIsBlock }) => {
    const { type, isBlock: choiceIsBlock, claimedCard } = choice;
    const {
        tryAction, tryBlock, acceptAction, challengeAction,
    } = useGame();

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
        <button
            type="button"
            onClick={handleClick}
        >
            {type}
        </button>
    );
};

GameViewActionChooseButton.propTypes = {
    choice: PropTypes.shape(actionChoicePropTypes).isRequired,
    actionId: PropTypes.string,
    actionIsBlock: PropTypes.bool,
};

GameViewActionChooseButton.defaultProps = {
    actionId: undefined,
    actionIsBlock: false,
};

export default GameViewActionChooseButton;
