const { cardTypes } = require('../propTypes/cardPropTypes');

const formatCardType = (cardType) => {
    switch (cardType) {
        case cardTypes.AMBASSADOR:
            return 'Ambassador';
        case cardTypes.ASSASSIN:
            return 'Assassin';
        case cardTypes.CAPTAIN:
            return 'Captain';
        case cardTypes.CONTESSA:
            return 'Contessa';
        case cardTypes.DUKE:
            return 'Duke';
        default:
            return '?';
    }
};

export default formatCardType;
