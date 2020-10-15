import allowChoice from '../consts/allowChoice';
import blockChoices from '../consts/blockChoices';
import challengeChoice from '../consts/challengeChoice';
import { noRoleStarterChoices } from '../consts/starterChoices';
import getSortedStartingChoices from './getSortedStartingChoices';

const determineChoiceLists = (action, playerCards) => {
    if (!action) {
        const { honestChoices, bluffChoices } = getSortedStartingChoices(playerCards);
        return [
            {
                type: 'honest',
                choices: noRoleStarterChoices.concat(honestChoices),
            },
            {
                type: 'bluff',
                choices: bluffChoices,
            },
        ];
    }
    const choices = [];
    const { canChallenge, canBlock } = action;
    if (canChallenge || canBlock) {
        choices.push(allowChoice);
    }
    if (canChallenge) {
        choices.push(challengeChoice);
    }
    if (canBlock) {
        choices.push(...blockChoices
            .filter((blockChoice) => blockChoice.after === action.actionType));
    }
    return [
        {
            type: 'respond',
            choices,
        },
    ];
};

export default determineChoiceLists;
