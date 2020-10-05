import React from 'react';
import gameActionPropTypes, { actionTypes, blockActionTypes } from '../../utils/propTypes/gameActionPropTypes';
import { cardTypes } from '../../utils/propTypes/cardPropTypes';
import GameViewActionChooseButton from '../GameViewActionChooseButton/GameViewActionChooseButton';
// import useGame from '../GameViewBoard/useGame';

const starterChoices = [
    {
        type: actionTypes.INCOME,
    },
    {
        type: actionTypes.FOREIGN_AID,
    },
    {
        type: actionTypes.COUP,
    },
    {
        type: actionTypes.TAX,
        claimedCard: cardTypes.DUKE,
    },
    {
        type: actionTypes.ASSASSINATE,
        claimedCard: cardTypes.ASSASSIN,
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

const blockChoices = [
    {
        type: blockActionTypes.BLOCK_FOREIGN_AID,
        after: actionTypes.FOREIGN_AID,
        claimedCard: cardTypes.DUKE,
    },
    {
        type: blockActionTypes.BLOCK_ASSASSINATE,
        after: actionTypes.ASSASSINATE,
        claimedCard: cardTypes.CONTESSA,
    },
    {
        type: blockActionTypes.BLOCK_STEAL,
        after: actionTypes.STEAL,
        claimedCard: cardTypes.CAPTAIN,
    },
    {
        type: blockActionTypes.BLOCK_STEAL,
        after: actionTypes.STEAL,
        claimedCard: cardTypes.AMBASSADOR,
    },
];

const challengeChoices = [
    {
        type: 'challenge',
    },
    {
        type: 'allow',
    },
];

const determineChoices = (action) => {
    if (!action) {
        return starterChoices;
    }
    const choices = [];
    const { canChallenge, canBlock } = action;
    if (canChallenge) {
        choices.push(...challengeChoices);
    }
    if (canBlock) {
        choices.push(...blockChoices);
    }
    return choices;
};

const GameViewActionChoose = ({ mostRecentAction }) => {
    // const { tryAction } = useGame();

    const choices = determineChoices(mostRecentAction);

    return choices.map((choice) => (
        <GameViewActionChooseButton choice={choice} />
    ));
};

GameViewActionChoose.propTypes = {
    mostRecentAction: gameActionPropTypes,
};

GameViewActionChoose.defaultProps = {
    mostRecentAction: undefined,
};

export default GameViewActionChoose;
