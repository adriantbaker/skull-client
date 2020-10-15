const formatChoiceType = (choiceType) => {
    switch (choiceType) {
        case 'honest':
            return 'ACT IN GOOD FAITH';
        case 'bluff':
            return 'DECEIVE YOUR RIVALS';
        case 'respond':
            return 'RESPOND';
        default:
            return choiceType;
    }
};

export default formatChoiceType;
