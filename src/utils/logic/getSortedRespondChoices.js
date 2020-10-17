import allowChoice from '../consts/allowChoice';
import blockChoices from '../consts/blockChoices';
import challengeChoice from '../consts/challengeChoice';

const getSortedRespondChoices = (previousAction, playerCards) => {
    const { canChallenge, canBlock, actionType } = previousAction;

    const playerCardTypes = playerCards.map((card) => card.type);

    const honestChoices = [];
    const bluffChoices = [];

    if (canChallenge || canBlock) {
        honestChoices.push(allowChoice);
    }

    if (canChallenge) {
        honestChoices.push(challengeChoice);
    }

    if (canBlock) {
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
