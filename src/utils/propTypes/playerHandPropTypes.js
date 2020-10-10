import PropTypes from 'prop-types';
import { cardTypePropTypes } from './cardPropTypes';

export const cardsPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: cardTypePropTypes,
    }),
);

const playerHandShape = {
    cards: cardsPropTypes.isRequired,
    exchangeCards: cardsPropTypes.isRequired,
    deadCards: cardsPropTypes.isRequired,
    id: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    numCoins: PropTypes.number.isRequired,
    turnNumber: PropTypes.number.isRequired,
};

const playerHandPropTypes = PropTypes.shape(playerHandShape);

export default playerHandPropTypes;
