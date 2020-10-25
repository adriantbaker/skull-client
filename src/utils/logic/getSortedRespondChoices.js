import allowChoice from '../consts/allowChoice';
import blockChoices from '../consts/blockChoices';
import challengeChoice from '../consts/challengeChoice';
import { actionTypes } from '../propTypes/gameActionPropTypes';

const playerCanBlock = (actionType, targetPlayerId, playerId) => {
    switch (actionType) {
        case actionTypes.FOREIGN_AID:
            // Anyone can block foreign aid
            return true;
        case actionTypes.ASSASSINATE:
        case actionTypes.STEAL:
            // Only the target can block these actions
            return playerId === targetPlayerId;
        default:
            return false;
    }
};

const getSortedRespondChoices = (previousAction, playerCards, playerId) => {
    const {
        canChallenge, canBlock, actionType, targetPlayerId,
    } = previousAction;

    const playerCardTypes = playerCards.map((card) => card.type);

    const honestChoices = [];
    const bluffChoices = [];

    if (canChallenge || canBlock) {
        honestChoices.push(allowChoice);
    }

    if (canChallenge) {
        honestChoices.push(challengeChoice);
    }

    if (canBlock && playerCanBlock(actionType, targetPlayerId, playerId)) {
        blockChoices.forEach((blockChoice) => {
            const { after, claimedCard } = blockChoice;
            if (after === actionType) {
                if (playerCardTypes.includes(claimedCard)) {
                    honestChoices.push(blockChoice);
                } else {
                    bluffChoices.push(blockChoice);
                }
            }
        });
    }

    return { honestChoices, bluffChoices };
};

export default getSortedRespondChoices;
