import PropTypes from 'prop-types';
import { cardsPropTypes } from './playerHandPropTypes';

const opponentHandShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
    numCards: PropTypes.number.isRequired,
    numCoins: PropTypes.number.isRequired,
    deadCards: cardsPropTypes.isRequired,
    turnNumber: PropTypes.number.isRequired,
};

const opponentHandPropTypes = PropTypes.shape(opponentHandShape);

const opponentHandsPropTypes = PropTypes.arrayOf(opponentHandPropTypes);

export default opponentHandsPropTypes;
