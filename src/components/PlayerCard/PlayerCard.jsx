import React from 'react';
import PropTypes from 'prop-types';
import { FaSkullCrossbones as Skull } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';
import Button from '../../basicComponents/Button/Button';
import useActions from '../GameViewBoard/useActions';
import formatCardType from '../../utils/formatting/formatCardType';
import getCardColorClassName from '../../utils/styling/getCardColorClassName';
import { screenIsAtMost } from '../../store/size/sizeActions';
import formatCardTypeCompact from '../../utils/formatting/formatCardTypeCompact';

const PlayerCard = (props) => {
    const {
        card, canDiscard, isDead, isOpponentView,
    } = props;

    const { id, type } = card;
    const { discard } = useActions();

    const { screenSize } = useSelector((state) => state.size);
    const isMedium = screenIsAtMost(screenSize, 'md');

    const discardButton = () => {
        if (!canDiscard) {
            return null;
        }

        return (
            <Button
                label="Discard"
                secondary
                onClick={() => discard([id])}
            />
        );
    };

    const icon = isDead ? <Skull className="inline mr-1" /> : null;
    const formattedType = isMedium && isOpponentView
        ? formatCardTypeCompact(type)
        : formatCardType(type);
    const colorClassName = getCardColorClassName(type, isDead, isOpponentView);

    return (
        <div className={`py-1 rounded-md shadow-md ${colorClassName}`}>
            <div>
                <span>{icon}</span>
                <span>{formattedType}</span>
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
