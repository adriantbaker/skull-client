import React from 'react';
import cardPropTypes from '../../utils/propTypes/cardPropTypes';

const PlayerCard = ({ type }) => (
    <div className="py-1 border">
        { type }
    </div>
);

PlayerCard.propTypes = cardPropTypes;

export default PlayerCard;
