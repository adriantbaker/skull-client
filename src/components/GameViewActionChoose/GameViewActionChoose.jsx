import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gameActionPropTypes, { actionTypes, blockActionTypes } from '../../utils/propTypes/gameActionPropTypes';
import { cardTypes } from '../../utils/propTypes/cardPropTypes';
import GameViewActionChooseButton from '../GameViewActionChooseButton/GameViewActionChooseButton';
import GameViewActionChooseTarget from '../GameViewActionChooseTarget/GameViewActionChooseTarget';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';

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
        cost: 7,
        chooseTarget: true,
    },
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

const challengeChoice = {
    type: 'challenge',
};

const acceptChoice = {
    type: 'allow',
};

const determineChoices = (action) => {
    if (!action) {
        return starterChoices;
    }
    const choices = [];
    const { canChallenge, canBlock } = action;
    if (canChallenge || canBlock) {
        choices.push(acceptChoice);
    }
    if (canChallenge) {
        choices.push(challengeChoice);
    }
    if (canBlock) {
        choices.push(...blockChoices
            .filter((blockChoice) => blockChoice.after === action.actionType));
    }
    return choices;
};

const GameViewActionChoose = (props) => {
    const { mostRecentAction, numCoins, opponentHands } = props;

    const { id: actionId, isBlock } = mostRecentAction || {};

    const choices = determineChoices(mostRecentAction);

    const [mustChooseTarget, setMustChooseTarget] = useState(false);
    const [pendingChoice, setPendingChoice] = useState();

    if (mustChooseTarget) {
        return (
            <div>
                <GameViewActionChooseTarget
                    pendingChoice={pendingChoice}
                    opponentHands={opponentHands}
                />
            </div>
        );
    }

    return (
        <div>
            {choices.map((choice) => (
                <GameViewActionChooseButton
                    choice={choice}
                    actionId={actionId}
                    actionIsBlock={isBlock}
                    numCoins={numCoins}
                    setMustChooseTarget={setMustChooseTarget}
                    setPendingChoice={setPendingChoice}
                />
            ))}
        </div>
    );
};

GameViewActionChoose.propTypes = {
    mostRecentAction: gameActionPropTypes,
    numCoins: PropTypes.number.isRequired,
    opponentHands: opponentHandsPropTypes.isRequired,
};

GameViewActionChoose.defaultProps = {
    mostRecentAction: undefined,
};

export default GameViewActionChoose;
