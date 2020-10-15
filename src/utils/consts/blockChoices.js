import { cardTypes } from '../propTypes/cardPropTypes';
import { actionTypes, blockActionTypes } from '../propTypes/gameActionPropTypes';

const blockChoices = [
    {
        type: blockActionTypes.BLOCK_FOREIGN_AID,
        isBlock: true,
        after: actionTypes.FOREIGN_AID,
        claimedCard: cardTypes.DUKE,
    },
    {
        type: blockActionTypes.BLOCK_ASSASSINATE,
        isBlock: true,
        after: actionTypes.ASSASSINATE,
        claimedCard: cardTypes.CONTESSA,
    },
    {
        type: blockActionTypes.BLOCK_STEAL,
        isBlock: true,
        after: actionTypes.STEAL,
        claimedCard: cardTypes.CAPTAIN,
    },
    {
        type: blockActionTypes.BLOCK_STEAL,
        isBlock: true,
        after: actionTypes.STEAL,
        claimedCard: cardTypes.AMBASSADOR,
    },
];

export default blockChoices;
