const getMostRecentAction = (currentAction, currentBlock) => {
    if (currentBlock) return currentBlock;
    if (currentAction) return currentAction;
    return undefined;
};

export default getMostRecentAction;
