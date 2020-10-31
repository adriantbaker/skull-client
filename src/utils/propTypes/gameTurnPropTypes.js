import PropTypes from 'prop-types';
import gameActionPropTypes from './gameActionPropTypes';

const gameTurnShape = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    action: gameActionPropTypes,
    block: gameActionPropTypes,
    pastBlocks: PropTypes.arrayOf(gameActionPropTypes),
};

const gameTurnPropTypes = PropTypes.shape(gameTurnShape);

export default gameTurnPropTypes;
