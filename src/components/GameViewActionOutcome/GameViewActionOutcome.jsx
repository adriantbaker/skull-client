import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';

const GameViewActionOutcome = ({ action, block }) => {
    let str = '';

    const {
        // actingPlayerName,
        // actionType,
        challenged: actionChallenged,
        challengeSucceeded: actionChallengeSucceeded,
    } = action;

    if (actionChallenged) {
        str += `Action was challenged and ${actionChallengeSucceeded ? 'succeeded. ' : 'failed. '}`;
    }

    if (block) {
        const {
            // actingPlayerName: blockingPlayerName,
            // actionType: blockType,
            challenged: blockChallenged,
            challengeSucceeded: blockChallengeSucceeded,
        } = block;

        if (blockChallenged) {
            str += `Block was challenged and ${blockChallengeSucceeded ? 'succeeded. ' : 'failed. '}`;
        }
    }

    str += 'Turn Over.';

    return str;
};

GameViewActionOutcome.propTypes = {
    action: gameActionPropTypes,
    block: gameActionPropTypes,
};

GameViewActionOutcome.defaultProps = {
    action: undefined,
    block: undefined,
};

export default GameViewActionOutcome;
