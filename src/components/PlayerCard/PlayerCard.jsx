import React from 'react';
import PropTypes from 'prop-types';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';
import Button from '../../basicComponents/Button/Button';
import useActions from '../GameViewBoard/useActions';

const PlayerCard = ({ card, canDiscard }) => {
    const { id, type } = card;
    const { discard } = useActions();

    const discardButton = () => {
        if (!canDiscard) {
            return null;
        }

        return (
            <Button
                label="Discard"
                onClick={() => discard([id])}
            />
        );
    };

    return (
        <div className="py-1 border">
            <div>{ type }</div>
            {discardButton()}
        </div>
    );
};

PlayerCard.propTypes = {
    card: cardPropTypes.isRequired,
    canDiscard: PropTypes.bool,
};

PlayerCard.defaultProps = {
    canDiscard: false,
};

export default PlayerCard;
