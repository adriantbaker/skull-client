import formatCardType from './formatCardType';

const { actionTypes, blockActionTypes, respondTypes } = require('../propTypes/gameActionPropTypes');

const formatActionTypeChosen = (actionType, claimedCardType, targetName) => {
    switch (actionType) {
        case actionTypes.INCOME:
            return 'to take Income';
        case actionTypes.FOREIGN_AID:
            return 'to take Foreign Aid';
        case actionTypes.COUP:
            return `to launch a Coup against ${targetName}`;
        case actionTypes.TAX:
            return 'to take a Tax';
        case actionTypes.ASSASSINATE:
            return `to Assassinate ${targetName}`;
        case actionTypes.STEAL:
            return `to Steal from ${targetName}`;
        case actionTypes.EXCHANGE:
            return 'to Exchange';
        case blockActionTypes.BLOCK_ASSASSINATE:
        case blockActionTypes.BLOCK_FOREIGN_AID:
        case blockActionTypes.BLOCK_STEAL:
            return `to Block with the power of the ${formatCardType(claimedCardType)}`;
        case respondTypes.ALLOW:
            return 'to Allow';
        case respondTypes.CHALLENGE:
            return 'to Challenge';
        default:
            return '?';
    }
};

export default formatActionTypeChosen;
