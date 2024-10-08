import PropTypes from 'prop-types';
import { cardTypePropTypes } from './cardPropTypes';

export const actionTypes = {
    INCOME: 'income',
    FOREIGN_AID: 'foreignAid',
    COUP: 'coup',
    TAX: 'tax',
    ASSASSINATE: 'assassinate',
    STEAL: 'steal',
    EXCHANGE: 'exchange',
};

export const actionTypesArray = [
    actionTypes.INCOME,
    actionTypes.FOREIGN_AID,
    actionTypes.COUP,
    actionTypes.TAX,
    actionTypes.ASSASSINATE,
    actionTypes.STEAL,
    actionTypes.EXCHANGE,
];

export const blockActionTypes = {
    BLOCK_FOREIGN_AID: 'blockForeignAid',
    BLOCK_ASSASSINATE: 'blockAssassinate',
    BLOCK_STEAL: 'blockSteal',
};

const blockActionTypesArray = [
    blockActionTypes.BLOCK_FOREIGN_AID,
    blockActionTypes.BLOCK_ASSASSINATE,
    blockActionTypes.BLOCK_STEAL,
];

export const actionTypePropTypes = PropTypes.oneOf([
    ...actionTypesArray,
    ...blockActionTypesArray,
]);

export const respondTypes = {
    ALLOW: 'allow',
    CHALLENGE: 'challenge',
};

const gameActionShape = {
    id: PropTypes.string.isRequired,
    isBlock: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    actionType: actionTypePropTypes.isRequired,
    claimedCard: cardTypePropTypes,
    actingPlayerId: PropTypes.string.isRequired,
    actingPlayerName: PropTypes.string.isRequired,
    targetPlayerId: PropTypes.string, // can be undefined
    targetPlayerName: PropTypes.string, // can be undefined
    acceptedBy: PropTypes.objectOf(PropTypes.bool).isRequired,
    canChallenge: PropTypes.bool.isRequired,
    canBlock: PropTypes.bool.isRequired,
    challenged: PropTypes.bool.isRequired,
    challengeSucceeded: PropTypes.bool.isRequired,
    challengingPlayerId: PropTypes.string, // can be undefined
    challengingPlayerName: PropTypes.string, // can be undefined
    pendingChallengeLoserDiscard: PropTypes.bool.isRequired,
    pendingTargetDiscard: PropTypes.bool.isRequired,
    pendingActorExchange: PropTypes.bool.isRequired,
};

const gameActionPropTypes = PropTypes.shape(gameActionShape);

export default gameActionPropTypes;
