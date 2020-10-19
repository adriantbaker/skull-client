const { cardTypes } = require('../propTypes/cardPropTypes');

const formatCardTypeCompact = (cardType) => {
    switch (cardType) {
        case cardTypes.AMBASSADOR:
            return 'Amb.';
        case cardTypes.ASSASSIN:
            return 'Assn.';
        case cardTypes.CAPTAIN:
            return 'Cap.';
        case cardTypes.CONTESSA:
            return 'Cont.';
        case cardTypes.DUKE:
            return 'Duke';
        default:
            return '?';
    }
};

export default formatCardTypeCompact;
