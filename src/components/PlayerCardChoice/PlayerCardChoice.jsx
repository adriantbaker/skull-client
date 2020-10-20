import React from 'react';
import PropTypes from 'prop-types';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';
import Button from '../../basicComponents/Button/Button';
import PlayerCard from '../PlayerCard/PlayerCard';
import '../SignIn/SignIn.css';

const PlayerCardChoice = (props) => {
    const {
        card,
        isChosen,
        canChooseMore,
        addCard,
        removeCard,
        chosenLabel,
        notChosenLabel,
    } = props;

    const toggleChoiceButton = () => {
        const label = isChosen ? chosenLabel : notChosenLabel;
        const handleClick = () => (isChosen ? removeCard(card.id) : addCard(card.id));
        const disabled = !canChooseMore && !isChosen;
        return (
            <Button
                size="small"
                className="center-hv-child"
                secondary
                label={label}
                disabled={disabled}
                onClick={handleClick}
            />
        );
    };

    return (
        <div className="flex space-x-1 py-1">
            <span className="w-1/2">
                <PlayerCard card={card} />
            </span>
            <span className="w-1/2 center-hv-parent">
                {toggleChoiceButton()}
            </span>
        </div>
    );
};

PlayerCardChoice.propTypes = {
    card: cardPropTypes.isRequired,
    isChosen: PropTypes.bool.isRequired,
    chosenLabel: PropTypes.string.isRequired,
    notChosenLabel: PropTypes.string.isRequired,
    canChooseMore: PropTypes.bool.isRequired,
    addCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
};

export default PlayerCardChoice;
