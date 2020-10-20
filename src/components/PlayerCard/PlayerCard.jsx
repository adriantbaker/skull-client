import React from 'react';
import PropTypes from 'prop-types';
import { FaSkullCrossbones as Skull } from 'react-icons/fa';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';
import Button from '../../basicComponents/Button/Button';
import useActions from '../GameViewBoard/useActions';
import formatCardType from '../../utils/formatting/formatCardType';
import getCardColorClassName from '../../utils/styling/getCardColorClassName';

const PlayerCard = (props) => {
    const {
        card, canDiscard, isDead, isOpponentView,
    } = props;
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

    const icon = isDead ? <Skull className="inline mr-1" /> : null;
    const colorClassName = getCardColorClassName(type, isDead, isOpponentView);

    return (
        <div className={`py-1 rounded-md shadow-md ${colorClassName}`}>
            <div>
                <span>{icon}</span>
                <span>{formatCardType(type)}</span>
            </div>
            {discardButton()}
        </div>
    );
};

PlayerCard.propTypes = {
    card: cardPropTypes.isRequired,
    canDiscard: PropTypes.bool,
    isDead: PropTypes.bool,
    isOpponentView: PropTypes.bool,
};

PlayerCard.defaultProps = {
    canDiscard: false,
    isDead: false,
    isOpponentView: false,
};

export default PlayerCard;
