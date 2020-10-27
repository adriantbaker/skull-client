const getChallengeLoserName = (action) => {
    const { actingPlayerName, challengingPlayerName, challengeSucceeded } = action;
    return challengeSucceeded ? actingPlayerName : challengingPlayerName;
};

export default getChallengeLoserName;
