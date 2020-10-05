import PropTypes from 'prop-types';

const opponentHandShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
    numCards: PropTypes.number.isRequired,
    numCoins: PropTypes.number.isRequired,
    turnNumber: PropTypes.number.isRequired,
};

const opponentHandPropTypes = PropTypes.shape(opponentHandShape);

const opponentHandsPropTypes = PropTypes.arrayOf(opponentHandPropTypes);

export default opponentHandsPropTypes;
