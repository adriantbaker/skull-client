const formatChoiceType = (choiceType) => {
    switch (choiceType) {
        case 'honest':
            return 'ACT TRUTHFULLY';
        case 'bluff':
            return 'ACT DECEPTIVELY';
        case 'honestRespond':
            return 'RESPOND TRUTHFULLY';
        case 'bluffRespond':
            return 'RESPOND DECEPTIVELY';
        case 'respond':
            return 'RESPOND';
        default:
            return choiceType;
    }
};

export default formatChoiceType;
