import PropTypes from 'prop-types';

const gameTurnShape = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
};

const gameTurnPropTypes = PropTypes.shape(gameTurnShape);

export default gameTurnPropTypes;
