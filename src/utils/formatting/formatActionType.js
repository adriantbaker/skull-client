const { actionTypes, blockActionTypes } = require('../propTypes/gameActionPropTypes');

const formatActionType = (actionType) => {
    switch (actionType) {
        case actionTypes.INCOME:
            return 'Income';
        case actionTypes.FOREIGN_AID:
            return 'Foreign Aid';
        case actionTypes.COUP:
            return 'Coup';
        case actionTypes.TAX:
            return 'Tax';
        case actionTypes.ASSASSINATE:
            return 'Assassinate';
        case actionTypes.STEAL:
            return 'Steal';
        case actionTypes.EXCHANGE:
            return 'Exchange';
        case blockActionTypes.BLOCK_ASSASSINATE:
        case blockActionTypes.BLOCK_FOREIGN_AID:
        case blockActionTypes.BLOCK_STEAL:
            return 'Block';
        case 'allow':
            return 'Allow';
        case 'challenge':
            return 'Challenge';
        default:
            return '?';
    }
};

export default formatActionType;
