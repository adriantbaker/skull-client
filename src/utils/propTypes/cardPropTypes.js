import PropTypes from 'prop-types';

export const cardTypes = {
    AMBASSADOR: 'ambassador',
    ASSASSIN: 'assassin',
    CAPTAIN: 'captain',
    CONTESSA: 'contessa',
    DUKE: 'duke',
};

export const cardTypePropTypes = PropTypes.oneOf([
    cardTypes.AMBASSADOR,
    cardTypes.ASSASSIN,
    cardTypes.CAPTAIN,
    cardTypes.CONTESSA,
    cardTypes.DUKE,
]);

const cardPropTypes = {
    id: PropTypes.string.isRequired,
    type: cardTypePropTypes.isRequired,
};

export default cardPropTypes;
