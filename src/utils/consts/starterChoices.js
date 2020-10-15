import { cardTypes } from '../propTypes/cardPropTypes';
import { actionTypes } from '../propTypes/gameActionPropTypes';

export const noRoleStarterChoices = [
    {
        type: actionTypes.INCOME,
    },
    {
        type: actionTypes.FOREIGN_AID,
    },
    {
        type: actionTypes.COUP,
        cost: 7,
        chooseTarget: true,
    },
];

export const roleStarterChoices = [
    {
        type: actionTypes.TAX,
        claimedCard: cardTypes.DUKE,
    },
    {
        type: actionTypes.ASSASSINATE,
        claimedCard: cardTypes.ASSASSIN,
        chooseTarget: true,
        cost: 3,
    },
    {
        type: actionTypes.STEAL,
        claimedCard: cardTypes.CAPTAIN,
        chooseTarget: true,
    },
    {
        type: actionTypes.EXCHANGE,
        claimedCard: cardTypes.AMBASSADOR,
    },
];
