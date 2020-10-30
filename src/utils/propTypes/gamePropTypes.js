import PropTypes from 'prop-types';
import opponentHandsPropTypes from './opponentHandsPropTypes';

const gameShape = {
    id: PropTypes.string.isRequired,
    maxPlayers: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    players: opponentHandsPropTypes.isRequired,
};

const gamePropTypes = PropTypes.shape(gameShape);

export default gamePropTypes;
