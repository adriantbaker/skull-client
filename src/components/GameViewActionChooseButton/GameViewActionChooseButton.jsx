import React from 'react';
import PropTypes from 'prop-types';
import useGame from '../GameViewBoard/useGame';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';

const GameViewActionChooseButton = ({ choice }) => {
    const { type, claimedCard } = choice;
    const { tryAction } = useGame();
    return (
        <button
            type="button"
            onClick={() => tryAction(type, claimedCard)}
        >
            {type}
        </button>
    );
};

GameViewActionChooseButton.propTypes = {
    choice: PropTypes.shape(actionChoicePropTypes).isRequired,
};

export default GameViewActionChooseButton;
