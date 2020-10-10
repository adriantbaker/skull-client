import React from 'react';
import PropTypes from 'prop-types';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';
import Button from '../../basicComponents/Button/Button';

const PlayerExchangeCard = (props) => {
    const {
        card, isChosen, canChooseMore, addCard, removeCard,
    } = props;
    const { type } = card;

    const toggleChoiceButton = () => {
        const label = isChosen ? 'Don\'t Keep' : 'Keep';
        const handleClick = () => (isChosen ? removeCard(card.id) : addCard(card.id));
        const disabled = !canChooseMore && !isChosen;
        return (
            <Button
                label={label}
                disabled={disabled}
                onClick={handleClick}
            />
        );
    };

    return (
        <div className="py-1 border">
            <div>{ type }</div>
            {toggleChoiceButton()}
        </div>
    );
};

PlayerExchangeCard.propTypes = {
    card: cardPropTypes.isRequired,
    isChosen: PropTypes.bool.isRequired,
    canChooseMore: PropTypes.bool.isRequired,
    addCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
};

export default PlayerExchangeCard;
