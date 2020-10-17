import { noRoleStarterChoices } from '../consts/starterChoices';
import getSortedRespondChoices from './getSortedRespondChoices';
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
    const { honestChoices, bluffChoices } = getSortedRespondChoices(action, playerCards);
    if (bluffChoices.length === 0) {
        return [
            {
                type: 'respond',
                choices: honestChoices,
            },
        ];
    }
    return [
        {
            type: 'honestRespond',
            choices: honestChoices,
        },
        {
            type: 'bluffRespond',
            choices: bluffChoices,
        },
    ];
};

export default determineChoiceLists;
