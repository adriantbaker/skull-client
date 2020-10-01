import PropTypes from 'prop-types';

const cardTypes = {
    AMBASSADOR: 'ambassador',
    ASSASSIN: 'assassin',
    CAPTAIN: 'captain',
    CONTESSA: 'contessa',
    DUKE: 'duke',
};

const cardTypePropTypes = PropTypes.oneOf([
    cardTypes.AMBASSADOR,
    cardTypes.ASSASSIN,
    cardTypes.CAPTAIN,
    cardTypes.CONTESSA,
    cardTypes.DUKE,
]).isRequired;

const cardPropTypes = {
    id: PropTypes.string.isRequired,
    type: cardTypePropTypes,
};

export default cardPropTypes;
