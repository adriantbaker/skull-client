import { roleStarterChoices } from '../consts/starterChoices';

const getSortedStartingChoices = (playerCards) => {
    const playerCardTypes = playerCards.map((card) => card.type);

    const honestChoices = [];
    const bluffChoices = [];

    roleStarterChoices.forEach((choice) => {
        const { claimedCard } = choice;
        if (playerCardTypes.includes(claimedCard)) {
            honestChoices.push(choice);
        } else {
            bluffChoices.push(choice);
        }
    });

    return { honestChoices, bluffChoices };
};

export default getSortedStartingChoices;
